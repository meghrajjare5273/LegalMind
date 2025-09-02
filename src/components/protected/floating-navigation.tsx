"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import {
  Home,
  MessageSquare,
  FileText,
  BookOpen,
  BarChart3,
  Settings,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
// import { useTheme } from "next-themes";

export function FloatingNavigation() {
  const pathname = usePathname();
  // const { theme } = useTheme();

  if (pathname?.startsWith("/services/chat")) return null;

  const navigationItems = [
    {
      title: "Dashboard",
      icon: (
        <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard",
    },
    {
      title: "AI Chat",
      icon: (
        <MessageSquare className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/services/chat",
    },
    {
      title: "Contract Review",
      icon: (
        <FileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/services/contract-review",
    },
    {
      title: "Legal Research",
      icon: (
        <BookOpen className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/services/research",
    },
    {
      title: "Analytics",
      icon: (
        <BarChart3 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/analytics",
    },
    {
      title: "Profile",
      icon: (
        <User className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/profile",
    },
    {
      title: "Settings",
      icon: (
        <Settings className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/settings",
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 opacity-20 hover:opacity-100 transition-opacity duration-300">
      <FloatingDock
        items={navigationItems}
        desktopClassName="bg-background/80 backdrop-blur-md border border-border shadow-lg"
        mobileClassName="bg-background/80 backdrop-blur-md border border-border shadow-lg"
      />
    </div>
  );
}
