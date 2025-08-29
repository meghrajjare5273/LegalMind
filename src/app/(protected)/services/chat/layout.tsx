import type React from "react";
import type { Metadata } from "next";
import { ChatSidebar } from "@/components/protected/chat/chat-sidebar";
import dynamic from "next/dynamic";

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

export default function ChatLayoutAlternative({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-dvh md:h-screen flex flex-col md:flex-row bg-background overflow-y-hidden overflow-x-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <Spotlight />
      </div>

      {/* Mobile header shows MobileSidebar (full width) */}
      <div className="md:hidden sticky top-0 z-30">
        <ChatSidebar />
      </div>

      {/* Desktop sidebar only on md+ so it doesn't occupy mobile width */}
      <aside
        className="relative z-20 hidden md:block md:flex-shrink-0"
        aria-label="Chat history"
      >
        <ChatSidebar />
      </aside>

      {/* Main content area */}
      <main className=" z-10 flex-1 min-h-0 snap-align-none overflow-x-hidden overflow-y-hidden">
        {children}
      </main>
    </div>
  );
}
