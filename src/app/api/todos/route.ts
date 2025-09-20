// src/app/api/todos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const todos = await prisma.todo.findMany({
      where: { userId: session.user.id },
      orderBy: [
        { completed: "asc" },
        { priority: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, priority, dueDate, reminderTime } = body;

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        reminderTime: reminderTime ? new Date(reminderTime) : null,
        userId: session.user.id,
      },
    });

    // Log activity
    await prisma.userActivity.create({
      data: {
        userId: session.user.id,
        action: "created_todo",
        metadata: { todoId: todo.id, title: todo.title },
      },
    });

    return NextResponse.json({ todo });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
