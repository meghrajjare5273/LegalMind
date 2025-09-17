"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AIChatInput } from "@/components/protected/chat/ai-chat-input";
import { useSession } from "@/contexts/session-context";
import { useToast } from "@/hooks/use-toast";
import TextType from "@/components/react-bits/TextType";

export default function ChatHomePage() {
  const router = useRouter();
  const { user, loading } = useSession();
  const { toast } = useToast();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get first name from user session
  const firstName = user?.name?.split(" ")[0] || "there";

  const onSubmit = async () => {
    if (!value.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: value.trim(),
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
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to start chat session. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to start chat session. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative h-full w-full flex flex-col items-center px-4 md:px-8">
        <div className="max-w-5xl w-full mx-auto mt-16 md:mt-24">
          <div className="animate-pulse space-y-2 mb-8">
            <div className="h-10 md:h-12 w-64 bg-muted rounded mb-4" />
            <div className="h-6 md:h-8 w-96 bg-muted rounded mb-36" />
          </div>
          <div className="w-full max-w-5xl mx-auto mt-10 md:mt-14 mb-6">
            <div className="h-12 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Authentication check
  if (!user) {
    return (
      <div className="relative h-full w-full flex flex-col items-center justify-center px-4 md:px-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-4" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full flex flex-col items-center px-4 md:px-8">
      {/* Centered hero */}
      <div className="max-w-5xl w-full mx-auto mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-left space-y-2 mb-8"
        >
          <TextType
            text={`Hi there, ${firstName}`}
            className="text-3xl md:text-5xl font-semibold tracking-tight"
            typingSpeed={75}
            pauseDuration={0}
            startOnVisible={true}
            showCursor={true}
            cursorCharacter="|"
          />

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.2 }}
            className="text-xl md:text-3xl mb-36 text-neutral-300"
          >
            What would you like to know?
          </motion.h2>
        </motion.div>
      </div>

      {/* Bottom input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.2 }}
        className="w-full max-w-5xl mx-auto mt-10 md:mt-14 mb-6 px-0"
      >
        <AIChatInput
          value={value}
          onChange={setValue}
          onSubmit={onSubmit}
          isLoading={isLoading}
          placeholder="Ask me anything about Indian law..."
        />
      </motion.div>
    </div>
  );
}
