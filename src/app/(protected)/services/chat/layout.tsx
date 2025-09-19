// src/app/(protected)/chat/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ChatSidebar } from "@/components/protected/chat/chat-sidebar";
import { Inter } from "next/font/google";
import ShadersBackground from "@/components/ui/liquid-metal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const RotatingEarth = dynamic(
  () => import("@/components/ui/rotating-earth").then((m) => m.RotatingEarth),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "Chat",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.variable} font-sans  text-neutral-950 dark:text-neutral-100 dark:bg-neutral-950 h-dvh w-dvw flex relative`}
    >
      <div className="absolute inset-0 flex items-center justify-center z-0 backdrop-blur-3xl filter">
        <ShadersBackground />
      </div>

      <div className="relative z-10 flex w-full  text-neutral-950 dark:text-neutral-200">
        <ChatSidebar />
        <main className="flex-1 min-w-0 max-h-lvh overflow-hidden  text-neutral-950 dark:text-neutral-200">
          {children}
        </main>
      </div>
    </div>
  );
}
