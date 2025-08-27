import type React from "react";
import type { Metadata } from "next";
import { Spotlight } from "@/components/ui/spotlight";
import { ChatSidebar } from "@/components/protected/chat/chat-sidebar";

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

// This version gives you more control over the layout structure
export default function ChatLayoutAlternative({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <Spotlight />
      </div>

      {/* Sidebar container */}
      <aside className="relative z-10 flex-shrink-0">
        <ChatSidebar />
      </aside>

      {/* Main content area */}
      <main className="relative z-10 flex-1 overflow-auto">{children}</main>
    </div>
  );
}
