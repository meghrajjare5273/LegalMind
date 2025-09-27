// src/app/api/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Use Promise.all for concurrent queries
    const [todos, chatSessions, totalTodos, completedTodos, totalChatSessions] =
      await Promise.all([
        prisma.todo.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          take: 20, // Limit results
        }),
        prisma.chatSession.findMany({
          where: { userId },
          orderBy: { updatedAt: "desc" },
          take: 10, // Limit results
          include: {
            messages: {
              take: 1,
              orderBy: { createdAt: "desc" },
            },
          },
        }),
        prisma.todo.count({ where: { userId } }),
        prisma.todo.count({ where: { userId, completed: true } }),
        prisma.chatSession.count({ where: { userId } }),
      ]);

    const stats = {
      totalTasks: totalTodos,
      completedTasks: completedTodos,
      pendingTasks: totalTodos - completedTodos,
      totalChatSessions,
      completionRate:
        totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0,
    };

    return NextResponse.json({
      Tasks: todos,
      chatSessions,
      stats,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
