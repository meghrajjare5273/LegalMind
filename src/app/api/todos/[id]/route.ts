// src/app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { invalidateUserTodos } from "@/lib/cache-utils";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, completed, priority, dueDate, reminderTime } =
      body;

    const todo = await prisma.todo.update({
      where: { id, userId: session.user.id },
      data: {
        title,
        description,
        completed,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        reminderTime: reminderTime ? new Date(reminderTime) : null,
      },
    });

    // Log activity if completed status changed
    if (body.hasOwnProperty("completed")) {
      await prisma.userActivity.create({
        data: {
          userId: session.user.id,
          action: completed ? "completed_todo" : "uncompleted_todo",
          metadata: { todoId: todo.id, title: todo.title },
        },
      });
    }

    // Invalidate relevant caches
    invalidateUserTodos(session.user.id);

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.todo.delete({
      where: { id, userId: session.user.id },
    });

    // Invalidate relevant caches
    invalidateUserTodos(session.user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
