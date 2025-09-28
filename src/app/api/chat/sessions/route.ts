import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  createCachedFunction,
  invalidateUserChatSessions,
} from "@/lib/cache-utils";
import { CACHE_STRATEGIES } from "@/lib/cache-headers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CACHE_DURATIONS, CACHE_TAGS } from "@/lib/cache-constants";

// Type definitions
interface ChatSessionResponse {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount?: number;
}

interface CreateChatSessionRequest {
  title: string;
}

// Cached function for fetching user chat sessions
const getUserChatSessionsCached = createCachedFunction(
  async (userId: string): Promise<ChatSessionResponse[]> => {
    const sessions = await prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { messages: true },
        },
      },
      take: 50, // Limit to recent sessions for performance
    });

    return sessions.map((session) => ({
      id: session.id,
      title: session.title as string,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      messageCount: session._count.messages,
    }));
  },
  {
    tags: [
      CACHE_TAGS.USER_CHAT_SESSIONS("PLACEHOLDER"),
      CACHE_TAGS.CHAT_SESSIONS_GLOBAL,
    ],
    revalidate: CACHE_DURATIONS.MEDIUM,
  }
);

// GET: Fetch user's chat sessions
export async function GET(): Promise<NextResponse> {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch cached chat sessions
    const chatSessions = await (
      await getUserChatSessionsCached
    )(session.user.id);

    return NextResponse.json(
      {
        sessions: chatSessions,
        total: chatSessions.length,
        cached: true,
      },
      {
        headers: CACHE_STRATEGIES.MEDIUM_LIVED,
      }
    );
  } catch (error) {
    console.error("Failed to fetch chat sessions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Create new chat session
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate request body
    const body = (await request.json()) as CreateChatSessionRequest;
    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { error: "Title is required and must be a string" },
        { status: 400 }
      );
    }

    // Create new chat session
    const newSession = await prisma.chatSession.create({
      data: {
        title: body.title.trim(),
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Invalidate relevant caches
    await invalidateUserChatSessions(session.user.id);

    return NextResponse.json(
      {
        session: newSession,
        message: "Chat session created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
