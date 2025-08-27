import type React from "react";
import type { Metadata } from "next";
import { Spotlight } from "@/components/ui/spotlight";
import { SessionProvider } from "@/contexts/session-context";

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
    <SessionProvider>
      <div className="relative min-h-screen overflow-hidden bg-background">
        {/* Subtle background effect */}
        <div className="fixed inset-0 z-0 opacity-30">
          <Spotlight />
        </div>

        {/* Chat content */}
        <div className="relative z-10 min-h-screen">{children}</div>
      </div>
    </SessionProvider>
  );
}
