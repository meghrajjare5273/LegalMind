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

    // Fetch user's todos
    const todos = await prisma.todo.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 10, // Recent 10 todos
    });

    // Fetch user's chat sessions
    const chatSessions = await prisma.chatSession.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    // Fetch user activities
    const activities = await prisma.userActivity.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // Calculate stats
    const totalTodos = await prisma.todo.count({
      where: { userId: session.user.id },
    });

    const completedTodos = await prisma.todo.count({
      where: {
        userId: session.user.id,
        completed: true,
      },
    });

    const totalChatSessions = await prisma.chatSession.count({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      todos,
      chatSessions,
      activities,
      stats: {
        totalTodos,
        completedTodos,
        pendingTodos: totalTodos - completedTodos,
        totalChatSessions,
        completionRate:
          totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
