import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const pendingNotifications = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
        reminderTime: { lte: now },
        notified: false,
        completed: false,
      },
    });

    // Mark todos as notified if there are any
    if (pendingNotifications.length > 0) {
      await prisma.todo.updateMany({
        where: {
          id: { in: pendingNotifications.map((todo) => todo.id) },
        },
        data: { notified: true },
      });
    }

    const response = NextResponse.json({ notifications: pendingNotifications });

    // Short cache for notifications since they're time-sensitive
    response.headers.set(
      "Cache-Control",
      "private, s-maxage=30, stale-while-revalidate=60"
    );

    return response;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
