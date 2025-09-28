// src/lib/cache-utils.ts
import { revalidateTag } from "next/cache";

export function invalidateUserTodos(userId: string) {
  revalidateTag(`user-${userId}-todos`);
  revalidateTag(`user-${userId}-todo-stats`);
  revalidateTag(`user-${userId}-dashboard`);
  revalidateTag("dashboard-data");
}

export function invalidateUserChatSessions(userId: string) {
  revalidateTag(`user-${userId}-chat-sessions`);
  revalidateTag(`user-${userId}-chat-stats`);
  revalidateTag(`user-${userId}-dashboard`);
  revalidateTag("dashboard-data");
  revalidateTag("chat-sessions");
  revalidateTag(`chat-sessions-${userId}`);
}

export function invalidateUserDashboard(userId: string) {
  revalidateTag(`user-${userId}-todos`);
  revalidateTag(`user-${userId}-chat-sessions`);
  revalidateTag(`user-${userId}-todo-stats`);
  revalidateTag(`user-${userId}-chat-stats`);
  revalidateTag(`user-${userId}-dashboard`);
  revalidateTag("dashboard-data");
}

export function invalidateUserNotifications(userId: string) {
  revalidateTag(`user-${userId}-notifications`);
}

// For specific chat session invalidation
export function invalidateChatSession(userId: string, sessionId: string) {
  revalidateTag(`chat-session-${sessionId}`);
  revalidateTag(`user-${userId}-chat-sessions`);
  revalidateTag("chat-sessions");
  revalidateTag(`chat-sessions-${userId}`);
}
