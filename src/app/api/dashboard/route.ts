// src/app/api/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

// Individual cached functions with user-specific keys
const getCachedTodos = unstable_cache(
  async (userId: string) => {
    return prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  },
  ["dashboard-todos"],
  {
    tags: ["dashboard-todos", "dashboard-data"],
    revalidate: 300, // 5 minutes
  }
);

const getCachedChatSessions = unstable_cache(
  async (userId: string) => {
    return prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 10,
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });
  },
  ["dashboard-chat-sessions"],
  {
    tags: ["dashboard-chat-sessions", "dashboard-data"],
    revalidate: 180, // 3 minutes
  }
);

const getCachedTodoStats = unstable_cache(
  async (userId: string) => {
    const [totalTodos, completedTodos] = await Promise.all([
      prisma.todo.count({ where: { userId } }),
      prisma.todo.count({ where: { userId, completed: true } }),
    ]);
    return { totalTodos, completedTodos };
  },
  ["dashboard-todo-stats"],
  {
    tags: ["dashboard-todo-stats", "dashboard-data"],
    revalidate: 300, // 5 minutes
  }
);

const getCachedChatStats = unstable_cache(
  async (userId: string) => {
    return prisma.chatSession.count({ where: { userId } });
  },
  ["dashboard-chat-stats"],
  {
    tags: ["dashboard-chat-stats", "dashboard-data"],
    revalidate: 600, // 10 minutes
  }
);

// Main cached dashboard function
const getCachedDashboardData = unstable_cache(
  async (userId: string) => {
    const [todos, chatSessions, todoStats, totalChatSessions] =
      await Promise.all([
        getCachedTodos(userId),
        getCachedChatSessions(userId),
        getCachedTodoStats(userId),
        getCachedChatStats(userId),
      ]);

    const { totalTodos, completedTodos } = todoStats;

    const stats = {
      totalTasks: totalTodos,
      completedTasks: completedTodos,
      pendingTasks: totalTodos - completedTodos,
      totalChatSessions,
      completionRate:
        totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0,
    };

    return {
      Tasks: todos,
      chatSessions,
      stats,
    };
  },
  ["dashboard-complete"],
  {
    tags: ["dashboard-complete", "dashboard-data"],
    revalidate: 180, // 3 minutes
  }
);

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get cached dashboard data with user-specific key
    const dashboardData = await getCachedDashboardData(userId);

    // Add cache headers for client-side caching
    const response = NextResponse.json(dashboardData);
    response.headers.set(
      "Cache-Control",
      "s-maxage=180, stale-while-revalidate=300"
    );

    return response;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
