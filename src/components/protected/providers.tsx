"use client";

import React from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/contexts/session-context";
import { Toaster } from "@/components/ui/sonner";

// // Create QueryClient outside component to avoid recreation on rerenders
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 60 * 1000, // 1 minute default
//       retry: 1,
//     },
//   },
// });

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        {/* <QueryClientProvider client={queryClient}> */}
          {children}
        {/* </QueryClientProvider> */}
        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
}
