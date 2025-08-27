import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/contexts/session-context";
import { FloatingNavigation } from "@/components/protected/floating-navigation";
// import { AnimatedThemeToggler } from "@/components/ui/magicui/animated-theme-toggler";

export const metadata: Metadata = {
  title: {
    template: "%s | LegalMind Dashboard",
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
        <div className="min-h-screen bg-background">
          <main
            className="container mx-auto px-4 py-8 pb-24"
            suppressHydrationWarning
          >
            {/* <AnimatedThemeToggler /> */}
            {children}
          </main>
          <FloatingNavigation />
        </div>
        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
}
