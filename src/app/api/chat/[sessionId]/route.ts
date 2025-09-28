// src/app/api/chat/[sessionId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import {
  invalidateUserChatSessions,
  invalidateChatSession,
} from "@/lib/cache-utils";

const getSessionCached = unstable_cache(
  async (sessionId: string, userId: string) => {
    return prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });
  },
  ["chat-session"],
  {
    // tags must be a static string[] according to unstable_cache types;
    // dynamic per-call tagging isn't supported here, so keep a static tag.
    tags: [
      "chat-sessions",
    ],
    revalidate: 180,
  }
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = await params;
    const userId = session.user.id;

    const chatSession = await getSessionCached(sessionId, userId);

    if (!chatSession) {
      return NextResponse.json(
        { error: "Chat session not found" },
        { status: 404 }
      );
    }

    const response = NextResponse.json({ session: chatSession });
    response.headers.set(
      "Cache-Control",
      "s-maxage=180, stale-while-revalidate=360"
    );

    return response;
  } catch (error) {
    console.error("Error fetching chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = await params;
    const userId = session.user.id;

    await prisma.chatSession.deleteMany({
      where: { id: sessionId, userId },
    });

    // Invalidate relevant caches
    invalidateUserChatSessions(userId);
    invalidateChatSession(userId, sessionId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
