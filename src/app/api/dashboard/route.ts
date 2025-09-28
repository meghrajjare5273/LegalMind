import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createCachedFunction } from "@/lib/cache-utils";
import { CACHE_STRATEGIES } from "@/lib/cache-headers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CACHE_DURATIONS, CACHE_TAGS } from "@/lib/cache-constants";

interface DashboardStats {
  totalTodos: number;
  completedTodos: number;
  totalChatSessions: number;
  recentActivity: {
    type: "todo" | "chat";
    title: string | null;
    createdAt: Date;
  }[];
}

// Cached dashboard data function
const getUserDashboardDataCached = createCachedFunction(
  async (userId: string): Promise<DashboardStats> => {
    const [todoStats, completedTodoCount, chatSessionCount, recentActivity] =
      await Promise.all([
        // Todo statistics
        prisma.todo.aggregate({
          where: { userId },
          _count: { id: true },
        }),

        // Completed todos count
        prisma.todo.count({
          where: { userId, completed: true },
        }),

        // Chat sessions count
        prisma.chatSession.count({
          where: { userId },
        }),

        // Recent activity
        Promise.all([
          prisma.todo.findMany({
            where: { userId },
            select: { title: true, createdAt: true },
            orderBy: { createdAt: "desc" },
            take: 5,
          }),
          prisma.chatSession.findMany({
            where: { userId },
            select: { title: true, createdAt: true },
            orderBy: { createdAt: "desc" },
            take: 5,
          }),
        ]),
      ]);

    const [recentTodos, recentChats] = recentActivity;
    const combinedActivity = [
      ...recentTodos.map((todo) => ({
        type: "todo" as const,
        title: todo.title,
        createdAt: todo.createdAt,
      })),
      ...recentChats.map((chat) => ({
        type: "chat" as const,
        title: chat.title,
        createdAt: chat.createdAt,
      })),
    ]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);

    return {
      totalTodos: todoStats._count.id,
      completedTodos: completedTodoCount,
      totalChatSessions: chatSessionCount,
      recentActivity: combinedActivity,
    };
  },
  {
    tags: [CACHE_TAGS.USER_DASHBOARD("PLACEHOLDER"), CACHE_TAGS.DASHBOARD_DATA],
    revalidate: CACHE_DURATIONS.MEDIUM,
  }
);

export async function GET(): Promise<NextResponse> {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch cached dashboard data
    const dashboardData = (await getUserDashboardDataCached)(session.user.id);

    return NextResponse.json(
      {
        data: dashboardData,
        cached: true,
        timestamp: new Date().toISOString(),
      },
      {
        headers: CACHE_STRATEGIES.MEDIUM_LIVED,
      }
    );
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
