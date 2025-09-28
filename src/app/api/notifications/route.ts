// src/app/api/notifications/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { invalidateUserNotifications } from "@/lib/cache-utils";

const getCachedNotifications = unstable_cache(
  async (userId: string) => {
    const now = new Date();

    return prisma.todo.findMany({
      where: {
        userId,
        reminderTime: { lte: now },
        notified: false,
        completed: false,
      },
    });
  },
  ["user-notifications"],
  {
    tags: [`user-notifications`], // Remove the function, use static tags
    revalidate: 120, // 2 minutes
  }
);

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const pendingNotifications = await getCachedNotifications(userId);

    // Mark todos as notified if there are any
    if (pendingNotifications.length > 0) {
      await prisma.todo.updateMany({
        where: {
          id: { in: pendingNotifications.map((todo) => todo.id) },
        },
        data: { notified: true },
      });

      // Invalidate notifications cache after updating
      invalidateUserNotifications(userId);
    }

    const response = NextResponse.json({ notifications: pendingNotifications });
    response.headers.set(
      "Cache-Control",
      "s-maxage=120, stale-while-revalidate=240"
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
