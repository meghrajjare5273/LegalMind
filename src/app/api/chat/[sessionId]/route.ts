import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { invalidateUserData } from "@/lib/cache-helpers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse> {
  try {
    const { sessionId } = await params;
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chatSession = await prisma.chatSession.findFirst({
      where: {
        id: sessionId,
        userId: session.user.id,
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

    if (!chatSession) {
      return NextResponse.json(
        { error: "Chat session not found" },
        { status: 404 }
      );
    }

    const response = NextResponse.json(
      { session: chatSession },
      { headers: { "Cache-Control": "no-store" } }
    );

    return response;
  } catch (error) {
    console.error("Failed to fetch chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse> {
  try {
    const { sessionId } = await params;
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    await invalidateUserData(session.user.id, `/api/chat/${sessionId}`);

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
