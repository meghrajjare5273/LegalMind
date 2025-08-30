// src/app/(protected)/chat/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ChatSidebar } from "@/components/protected/chat/chat-sidebar";

const Spotlight = dynamic(
  () => import("@/components/ui/spotlight").then((m) => m.Spotlight),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "AI Legal Assistant - Chat",
  description:
    "Get expert legal guidance with our AI-powered legal assistant. Ask questions about contracts, compliance, litigation, and more.",
  keywords: [
    "AI legal assistant",
    "legal advice",
    "law consultation",
    "legal guidance",
    "contract review",
  ],
  openGraph: {
    title: "AI Legal Assistant - Chat",
    description:
      "Get expert legal guidance with our AI-powered legal assistant",
    type: "website",
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-svh w-full bg-background overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none fixed bg-transparent inset-0">
        <Spotlight />
      </div>

      {/* Sidebar */}
      <div className="relative flex lg:flex-shrink-0" aria-label="Chat history">
        <ChatSidebar />
      </div>

      {/* Main content area */}
      <main className="relative z-10 flex min-w-0 flex-1 flex-col min-h-0 p-0.5">
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
