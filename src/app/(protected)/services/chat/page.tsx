/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TextRoll } from "@/components/ui/motion-primitives/text-roll";
import { TextEffect } from "@/components/ui/motion-primitives/text-effect";
import { AIChatInput } from "@/components/ui/ai-chat-input";
import { useSession } from "@/contexts/session-context";

export default function ChatPage() {
  const router = useRouter();
  const { user, loading } = useSession();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const firstName = user?.name?.split(" ")[0] || "Counsel";

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: message,
          sessionId: null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.sessionId) {
          router.push(`/services/chat/${data.sessionId}`);
        }
      } else {
        console.error("Failed to create chat session");
      }
    } catch (error) {
      console.error("Error starting chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-4" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4">
      {/* Header Section */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12 px-2"
        >
          <div className="mb-6">
            <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 text-pretty">
              <TextRoll duration={0.8} getEnterDelay={(i: any) => i * 0.05}>
                {`Welcome back, ${firstName}`}
              </TextRoll>
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <TextEffect
                preset="fade-in-blur"
                per="word"
                speedReveal={0.3}
                delay={1.5}
                className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto"
              >
                Your intelligent legal assistant powered by AI. Ask questions
                about Indian law, contracts, compliance, and get expert guidance
                instantly.
              </TextEffect>
            </motion.div>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="w-full max-w-xl md:max-w-2xl"
        >
          <AIChatInput
            value={message}
            onChange={setMessage}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="Ask me anything about Indian law..."
          />
        </motion.div>
      </div>
    </div>
  );
}
