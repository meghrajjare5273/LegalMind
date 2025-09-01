import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
<<<<<<< HEAD
import { unstable_cache, revalidateTag } from "next/cache";
=======
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364

// Get specific chat session with messages
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const sessionId = (await params).sessionId;

    const getSessionCached = unstable_cache(
      async () => {
        return prisma.chatSession.findFirst({
          where: { id: sessionId, userId },
          include: { messages: { orderBy: { createdAt: "asc" } } },
        });
      },
      [`chat-session:${sessionId}`],
      {
        revalidate: 180,
        tags: [
          "chat-sessions",
          `chat-sessions:${userId}`,
          `chat-session:${sessionId}`,
        ],
      }
    );

    const chatSession = await getSessionCached();

    if (!chatSession) {
      return NextResponse.json(
        { error: "Chat session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ session: chatSession });
  } catch (error) {
    console.error("Error fetching chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete chat session
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const sessionId = (await params).sessionId;

    await prisma.chatSession.deleteMany({
      where: { id: sessionId, userId },
    });

    // Invalidate list + detail caches
    revalidateTag("chat-sessions");
    revalidateTag(`chat-sessions:${userId}`);
    revalidateTag(`chat-session:${sessionId}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting chat session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
