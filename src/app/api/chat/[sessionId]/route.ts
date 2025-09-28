import { NextRequest, NextResponse } from "next/server";
// import { getCurrentSession } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { createCachedFunction, invalidateChatSession } from "@/lib/cache-utils";
import { CACHE_STRATEGIES } from "@/lib/cache-headers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CACHE_DURATIONS, CACHE_TAGS } from "@/lib/cache-constants";

interface ChatSessionWithMessages {
  id: string;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
  messages: {
    id: string;
    content: string;
    role: "user" | "assistant" | "system";
    createdAt: Date;
  }[];
}

// Cached function for fetching individual chat session
const getChatSessionCached = createCachedFunction(
  async (
    sessionId: string,
    userId: string
  ): Promise<ChatSessionWithMessages | null> => {
    const session = await prisma.chatSession.findFirst({
      where: {
        id: sessionId,
        userId: userId,
      },
      include: {
        messages: {
          select: {
            id: true,
            content: true,
            role: true,
            createdAt: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return session;
  },
  {
    tags: [
      CACHE_TAGS.CHAT_SESSION("PLACEHOLDER"),
      CACHE_TAGS.CHAT_SESSION_MESSAGES("PLACEHOLDER"),
    ],
    revalidate: CACHE_DURATIONS.MEDIUM,
  }
);

// GET: Fetch individual chat session
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse> {
  try {
    const { sessionId } = await params;

    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch cached chat session
    const chatSession = (await getChatSessionCached)(
      sessionId,
      session.user.id
    );

    if (!chatSession) {
      return NextResponse.json(
        { error: "Chat session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        session: chatSession,
        cached: true,
      },
      {
        headers: CACHE_STRATEGIES.MEDIUM_LIVED,
      }
    );
  } catch (error) {
    console.error("Failed to fetch chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Delete chat session
export async function DELETE(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
): Promise<NextResponse> {
  try {
    const { sessionId } = params;

    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership and delete
    const deletedSession = await prisma.chatSession.deleteMany({
      where: {
        id: sessionId,
        userId: session.user.id,
      },
    });

    if (deletedSession.count === 0) {
      return NextResponse.json(
        { error: "Chat session not found" },
        { status: 404 }
      );
    }

    // Invalidate relevant caches
    await invalidateChatSession(session.user.id, sessionId);

    return NextResponse.json(
      { message: "Chat session deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
