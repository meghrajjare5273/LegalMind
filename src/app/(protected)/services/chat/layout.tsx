<<<<<<< HEAD
=======
// src/app/(protected)/chat/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
import { ChatSidebar } from "@/components/protected/chat/chat-sidebar";
import { Spotlight } from "@/components/ui/spotlight";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const Spotlight = dynamic(
  () => import("@/components/ui/spotlight").then((m) => m.Spotlight),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "Chat | LegalMind",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <div
      className={`${inter.variable} font-sans text-neutral-100 bg-neutral-950 h-dvh w-dvw flex`}
    >
      <ChatSidebar />
      <main className="flex-1 min-w-0 h-dvh overflow-scroll scr md:ml-0 pt-12 md:pt-0">
        <Spotlight
        height={1000}
        gradientFirst="radial-gradient(58.43% 44.44% at 49.26% 40.84%, hsla(0, 100%, 81%, .08) 0, hsla(0, 100%, 54%, .02) 50%, hsla(0, 100%, 40%, 0) 80%)"
        gradientSecond="radial-gradient(52.8% 65.2% at 45.5% 32.1%, hsla(0, 100%, 85%, .06) 0, hsla(0, 100%, 55%, .02) 50%, hsla(0, 100%, 45%, 0) 80%)"
        gradientThird="radial-gradient(61.3% 58.4% at 53.8% 38.9%, hsla(0, 100%, 88%, .04) 0, hsla(0, 100%, 52%, .01) 50%, hsla(0, 100%, 42%, 0) 80%)"
        />
        {children}
=======
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
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
      </main>
    </div>
  );
}
