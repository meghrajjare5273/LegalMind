/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { unstable_cache, revalidateTag } from "next/cache";

// Get all chat sessions for a user
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Create a per-request cached reader with user-scoped key and tags
    const getUserSessionsCached = unstable_cache(
      async () => {
        return prisma.chatSession.findMany({
          where: { userId },
          orderBy: { updatedAt: "desc" }, // use asc/desc as desired
          include: {
            messages: { orderBy: { createdAt: "asc" }, take: 1 },
            _count: { select: { messages: true } },
          },
        });
      },
      // keyParts can include the user to ensure separation across users
      [`chat-sessions:by-user:${userId}`],
      {
        revalidate: 180, // 3 minutes
        tags: ["chat-sessions", `chat-sessions:${userId}`],
      }
    );

    const chatSessions = await getUserSessionsCached();
    return NextResponse.json({ sessions: chatSessions });
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { title, firstMessage } = await request.json();

    const chatSession = await prisma.chatSession.create({
      data: {
        title: title || "New Chat",
        userId,
      },
    });

    if (firstMessage) {
      await prisma.chatMessage.create({
        data: {
          sessionId: chatSession.id,
          role: "user",
          content: firstMessage,
          tokenCount: Math.ceil(firstMessage.length / 4),
        },
      });
    }

    // Invalidate list caches so next GET sees the new session
    revalidateTag("chat-sessions");
    revalidateTag(`chat-sessions:${userId}`);

    return NextResponse.json({ sessionId: chatSession.id, success: true });
  } catch (error) {
    console.error("Error creating chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
