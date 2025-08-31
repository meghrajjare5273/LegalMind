"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AIChatInput } from "@/components/protected/chat/ai-chat-input";

export default function ChatHomePage() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (!value.trim()) return;
    setIsLoading(true);
    const id = crypto.randomUUID();
    // Navigate to a new session with the query as a param
    router.push(`/chat/${id}?q=${encodeURIComponent(value.trim())}`);
    setIsLoading(false);
  };

  return (
    <div className="relative h-full w-full flex flex-col items-center px-4 md:px-8">
      {/* Centered hero */}
      <div className="max-w-5xl w-full mx-auto mt-16 md:mt-24">
        <div className="text-left space-y-2 mb-8">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Hi there, Ui Mahadi
          </h1>
          <h2 className="text-xl md:text-3xl mb-36 text-neutral-300">
            What would you like to know?
          </h2>
        </div>

        {/* 2x2 suggestion cards */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {[
            "Write a to-do list for a personal project or task",
            "Generate an email to reply to a job offer",
            "Summarize this article or text for me in one paragraph",
            "How does AI work in a technical capacity",
          ].map((text, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              <Card className="bg-neutral-900/70 border-neutral-800 hover:border-neutral-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-neutral-300">
                    Prompt
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-neutral-100 text-sm">
                  {text}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div> */}
      </div>

      {/* Bottom input */}
      <div className="w-full max-w-5xl mx-auto mt-10 md:mt-14 mb-6 px-0">
        <AIChatInput
          value={value}
          onChange={setValue}
          onSubmit={onSubmit}
          isLoading={isLoading}
          placeholder="Ask whatever you want..."
        />
      </div>
    </div>
  );
}
