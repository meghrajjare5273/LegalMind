// lib/cache-helpers.ts (Simplified helpers using Next.js builtins)
import { revalidatePath, revalidateTag } from "next/cache";

export async function invalidateUserData(userId: string, path: string) {
  revalidatePath(path); // Invalidate specific path
  revalidateTag(`user-${userId}`); // Tag-based invalidation
}

export const CACHE_HEADERS = {
  SHORT: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  MEDIUM: { "Cache-Control": "s-maxage=180, stale-while-revalidate=900" },
};
