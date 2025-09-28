import { CACHE_DURATIONS } from "./cache-constants";


export interface CacheHeaderOptions {
  maxAge: number;
  staleWhileRevalidate?: number;
  mustRevalidate?: boolean;
  public?: boolean;
  immutable?: boolean;
}

export function createCacheHeaders(options: CacheHeaderOptions): HeadersInit {
  const {
    maxAge,
    staleWhileRevalidate = maxAge * 2,
    mustRevalidate = true,
    public: isPublic = false,
    immutable = false,
  } = options;

  const directives = [
    isPublic ? "public" : "private",
    `s-maxage=${maxAge}`,
    `stale-while-revalidate=${staleWhileRevalidate}`,
  ];

  if (mustRevalidate) directives.push("must-revalidate");
  if (immutable) directives.push("immutable");

  return {
    "Cache-Control": directives.join(", "),
    "CDN-Cache-Control": `s-maxage=${maxAge}`,
    "Vercel-CDN-Cache-Control": `s-maxage=${maxAge}`,
  };
}

// Predefined cache strategies
export const CACHE_STRATEGIES = {
  SHORT_LIVED: createCacheHeaders({ maxAge: CACHE_DURATIONS.SHORT }),
  MEDIUM_LIVED: createCacheHeaders({ maxAge: CACHE_DURATIONS.MEDIUM }),
  LONG_LIVED: createCacheHeaders({ maxAge: CACHE_DURATIONS.LONG }),
  STATIC_CONTENT: createCacheHeaders({
    maxAge: CACHE_DURATIONS.STATIC,
    immutable: true,
    public: true,
  }),
} as const;
