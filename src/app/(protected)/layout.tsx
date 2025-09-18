// app/(protected)/layout.tsx (Dashboard Layout)
import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/contexts/session-context";
import { FloatingNavigation } from "@/components/protected/floating-navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | LegalMind",
    default: "Dashboard | LegalMind",
  },
  description:
    "AI-powered legal assistance dashboard for modern legal professionals",
  keywords: ["legal", "AI", "dashboard", "contract review", "legal research"],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <div className="flex h-screen w-full">
          {/* <div className="overflow-hidden"> */}
          {children}
          <FloatingNavigation />
          {/* </div> */}
        </div>
        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
}
