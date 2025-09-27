// app/(protected)/layout.tsx (Dashboard Layout)
import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { FloatingNavigation } from "@/components/protected/floating-navigation";
// import { GLSLHills } from "@/components/protected/glsl-hills";

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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen w-full">
        {children}
        <FloatingNavigation />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
