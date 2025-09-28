import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(): Promise<NextResponse> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chatSessions = await prisma.chatSession.findMany({
      where: { userId: session.user.id },
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

    const sessions = chatSessions.map((session) => ({
      id: session.id,
      title: session.title || "Untitled Chat",
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      messageCount: session._count.messages,
    }));

    const response = NextResponse.json({
      sessions,
      total: sessions.length,
    });

    // Cache chat sessions for a moderate time
    response.headers.set(
      "Cache-Control",
      "private, s-maxage=120, stale-while-revalidate=240"
    );

    return response;
  } catch (error) {
    console.error("Failed to fetch chat sessions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { error: "Title is required and must be a string" },
        { status: 400 }
      );
    }

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
