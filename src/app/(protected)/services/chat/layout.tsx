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
      <div className="fixed flex flex-wrap justify-center inset-0 overflow-hidden">
        {/* Spotlight effect - fixed positioning to cover entire viewport */}
        <div className="absolute inset-0 pointer-events-none">
          <Spotlight />
        </div>

        {/* Chat content container */}
        <div className="fixed z-10 h-full flex flex-wrap overflow-y-hidden">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
