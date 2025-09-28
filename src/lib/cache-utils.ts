// cache-utils.ts
"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { CACHE_DURATIONS, CACHE_TAGS } from "./cache-constants";

// Enhanced cache function wrapper with type safety
export async function createCachedFunction<
  TArgs extends readonly unknown[],
  TReturn
>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options: {
    tags: string[];
    revalidate?: number;
    keyGenerator?: (...args: TArgs) => string;
  }
) {
  const { tags, revalidate = CACHE_DURATIONS.MEDIUM, keyGenerator } = options;

  return unstable_cache(
    async (...args: TArgs) => {
      try {
        const result = await fn(...args);
        if (process.env.NODE_ENV === "development") {
          console.log(`Cache MISS for tags: ${tags.join(", ")}`);
        }
        return result;
      } catch (error) {
        console.error("Cached function error:", error);
        throw error;
      }
    },
    keyGenerator ? undefined : [`${fn.name}-${JSON.stringify(tags)}`],
    {
      tags,
      revalidate,
    }
  );
}

// Batch invalidation with error handling
export async function batchInvalidateTags(tags: string[]): Promise<void> {
  try {
    const uniqueTags = [...new Set(tags)]; // Remove duplicates
    await Promise.all(uniqueTags.map((tag) => revalidateTag(tag)));

    if (process.env.NODE_ENV === "development") {
      console.log(`Invalidated cache tags: ${uniqueTags.join(", ")}`);
    }
  } catch (error) {
    console.error("Cache invalidation error:", error);
    throw error;
  }
}

// Specific invalidation functions
export async function invalidateUserTodos(userId: string): Promise<void> {
  const tags = [
    CACHE_TAGS.USER_TODOS(userId),
    CACHE_TAGS.USER_TODO_STATS(userId),
    CACHE_TAGS.USER_DASHBOARD(userId),
    CACHE_TAGS.DASHBOARD_DATA,
  ];
  await batchInvalidateTags(tags);
}

export async function invalidateUserChatSessions(
  userId: string
): Promise<void> {
  const tags = [
    CACHE_TAGS.USER_CHAT_SESSIONS(userId),
    CACHE_TAGS.USER_CHAT_STATS(userId),
    CACHE_TAGS.USER_DASHBOARD(userId),
    CACHE_TAGS.DASHBOARD_DATA,
    CACHE_TAGS.CHAT_SESSIONS_GLOBAL,
  ];
  await batchInvalidateTags(tags);
}

export async function invalidateChatSession(
  userId: string,
  sessionId: string
): Promise<void> {
  const tags = [
    CACHE_TAGS.CHAT_SESSION(sessionId),
    CACHE_TAGS.CHAT_SESSION_MESSAGES(sessionId),
    CACHE_TAGS.USER_CHAT_SESSIONS(userId),
    CACHE_TAGS.CHAT_SESSIONS_GLOBAL,
  ];
  await batchInvalidateTags(tags);
}

export async function invalidateUserDashboard(userId: string): Promise<void> {
  const tags = [
    CACHE_TAGS.USER_TODOS(userId),
    CACHE_TAGS.USER_CHAT_SESSIONS(userId),
    CACHE_TAGS.USER_TODO_STATS(userId),
    CACHE_TAGS.USER_CHAT_STATS(userId),
    CACHE_TAGS.USER_DASHBOARD(userId),
    CACHE_TAGS.DASHBOARD_DATA,
  ];
  await batchInvalidateTags(tags);
}

export async function invalidateUserNotifications(
  userId: string
): Promise<void> {
  const tags = [CACHE_TAGS.USER_NOTIFICATIONS(userId)];
  await batchInvalidateTags(tags);
}

// Cache warming function
export async function warmUserCache(userId: string): Promise<void> {
  // Pre-populate frequently accessed data
  try {
    console.log(`Warming cache for user: ${userId}`);
  } catch (error) {
    console.error("Cache warming error:", error);
  }
}
