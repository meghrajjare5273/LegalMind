"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
<<<<<<< HEAD
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AIChatInput } from "@/components/protected/chat/ai-chat-input";
=======
import { TextRoll } from "@/components/ui/motion-primitives/text-roll";
import { AIChatInput } from "@/components/ui/ai-chat-input";
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
import { useSession } from "@/contexts/session-context";
import { useToast } from "@/hooks/use-toast";

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
<<<<<<< HEAD
          query: value.trim(),
=======
          query: message,
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
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
<<<<<<< HEAD
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
=======
      <div className="min-h-dvh flex items-center justify-center">
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-4" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="relative h-full w-full flex flex-col items-center px-4 md:px-8">
      {/* Centered hero */}
      <div className="max-w-5xl w-full mx-auto mt-16 md:mt-24">
=======
    <div className="min-h-dvh flex flex-col items-center justify-center px-4">
      {/* Header Section */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full py-8 md:py-12">
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
<<<<<<< HEAD
          className="text-left space-y-2 mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Hi there, {firstName}
          </h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.2 }}
            className="text-xl md:text-3xl mb-36 text-neutral-300"
          >
            What would you like to know?
          </motion.h2>
=======
          className="text-center mb-8 md:mb-12 px-2"
        >
          <div className="mb-6">
            <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 text-pretty">
              <TextRoll duration={0.15} getEnterDelay={(i: any) => i * 0.05}>
                {`Welcome back, ${firstName}`}
              </TextRoll>
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.2 }}
            >
              Your intelligent legal assistant powered by AI. Ask questions
              about Indian law, contracts, compliance, and get expert guidance
              instantly.
            </motion.div>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.2 }}
          className="w-full max-w-xl md:max-w-2xl"
        >
          <AIChatInput
            value={message}
            onChange={setMessage}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="Ask me anything about Indian law..."
          />
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
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
