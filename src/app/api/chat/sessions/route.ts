/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

// Get all chat sessions for a user
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chatSessions = await prisma.chatSession.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 1, // Just get the first message for preview
        },
        _count: {
          select: { messages: true },
        },
      },
    });

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
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, firstMessage } = await request.json();

    const chatSession = await prisma.chatSession.create({
      data: {
        title: title || "New Chat",
        userId: session.user.id,
      },
    });

    // Optionally save the first message
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

    return NextResponse.json({
      sessionId: chatSession.id,
      success: true,
    });
  } catch (error) {
    console.error("Error creating chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
