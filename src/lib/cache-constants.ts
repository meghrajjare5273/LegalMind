// cache-constants.ts
// This file contains constants and types that can be imported anywhere

// Type-safe cache tag definitions
export const CACHE_TAGS = {
  // User-specific tags
  USER_TODOS: (userId: string) => `user-${userId}-todos`,
  USER_TODO_STATS: (userId: string) => `user-${userId}-todo-stats`,
  USER_CHAT_SESSIONS: (userId: string) => `user-${userId}-chat-sessions`,
  USER_CHAT_STATS: (userId: string) => `user-${userId}-chat-stats`,
  USER_DASHBOARD: (userId: string) => `user-${userId}-dashboard`,
  USER_NOTIFICATIONS: (userId: string) => `user-${userId}-notifications`,

  // Session-specific tags
  CHAT_SESSION: (sessionId: string) => `chat-session-${sessionId}`,
  CHAT_SESSION_MESSAGES: (sessionId: string) =>
    `chat-session-${sessionId}-messages`,

  // Global tags
  DASHBOARD_DATA: "dashboard-data",
  CHAT_SESSIONS_GLOBAL: "chat-sessions",
  ANALYTICS_DATA: "analytics-data",
};

// Cache duration configurations
export const CACHE_DURATIONS = {
  SHORT: 60, // 1 minute
  MEDIUM: 180, // 3 minutes
  LONG: 600, // 10 minutes
  EXTRA_LONG: 1800, // 30 minutes
  STATIC: 86400, // 24 hours
} as const;

// Type definitions
export type CacheKey = keyof typeof CACHE_TAGS;
export type CacheDuration = keyof typeof CACHE_DURATIONS;
