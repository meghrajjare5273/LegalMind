// components/providers/query-provider.tsx
"use client";


import { CACHE_DURATIONS } from "@/lib/cache-constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create a client inside the component to ensure it's created on the client side
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: CACHE_DURATIONS.LONG * 1000, // Convert to milliseconds
            staleTime: CACHE_DURATIONS.MEDIUM * 1000,
            refetchOnWindowFocus: false,
            retry: 3,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Optional: Add React Query Devtools in development
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )} */}
    </QueryClientProvider>
  );
}
