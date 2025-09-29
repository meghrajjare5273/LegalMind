import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface DashboardData {
  Tasks: {
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    dueDate: Date | null;
    reminderTime: Date | null;
    createdAt: Date;
  }[];
  chatSessions: {
    id: string;
    title: string;
    updatedAt: Date;
    messages: { content: string }[];
  }[];
  stats: {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    totalChatSessions: number;
    completionRate: number;
  };
}

export async function GET(): Promise<
  NextResponse<DashboardData | { error: string }>
> {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch data in parallel for better performance
    const [tasks, chatSessions] = await Promise.all([
      prisma.todo.findMany({
        where: { userId: session.user.id },
        orderBy: [
          { completed: "asc" },
          { priority: "desc" },
          { createdAt: "desc" },
        ],
        take: 50, // Limit results for performance
      }),
      prisma.chatSession.findMany({
        where: { userId: session.user.id },
        include: {
          messages: {
            select: { content: true },
            take: 1,
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { updatedAt: "desc" },
        take: 10, // Limit recent sessions
      }),
    ]);

    // Calculate stats
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = tasks.length - completedTasks;

    const dashboardData: DashboardData = {
      Tasks: tasks,
      chatSessions: chatSessions.map((session) => ({
        id: session.id,
        title: session.title || "Untitled Chat",
        updatedAt: session.updatedAt,
        messages: session.messages,
      })),
      stats: {
        totalTasks: tasks.length,
        completedTasks,
        pendingTasks,
        totalChatSessions: chatSessions.length,
        completionRate:
          tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0,
      },
    };

    const response = NextResponse.json(dashboardData);

      // Simple cache headers for better performance [web:25]
      response.headers.set(
        "Cache-Control",
        "private, s-maxage=60, stale-while-revalidate=120"
      );

      return response;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
