// src/app/api/chat/sessions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { invalidateUserChatSessions } from "@/lib/cache-utils";

const getUserSessionsCached = unstable_cache(
  async (userId: string) => {
    return prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 1,
        },
        _count: { select: { messages: true } },
      },
    });
  },
  ["chat-sessions-by-user"],
  {
    tags: ((userId: string) => ["chat-sessions", `chat-sessions-${userId}`]) as unknown as string[],
    revalidate: 180, // 3 minutes
  }
);

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chatSessions = await getUserSessionsCached(session.user.id);

    const response = NextResponse.json({ sessions: chatSessions });
    response.headers.set(
      "Cache-Control",
      "s-maxage=180, stale-while-revalidate=360"
    );

    return response;
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

    // Invalidate chat session caches
    invalidateUserChatSessions(userId);

    return NextResponse.json({ sessionId: chatSession.id, success: true });
  } catch (error) {
    console.error("Error creating chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
