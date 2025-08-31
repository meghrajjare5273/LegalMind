"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AIChatInput } from "@/components/protected/chat/ai-chat-input";

type Message = { id: string; role: "user" | "assistant"; content: string };

export default function ChatSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  // Next.js 15+ may provide params as a Promise; await for typed access
  // to avoid build-time type mismatches across edge/runtime targets.
  // See file-convention and dynamic-segment docs.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sessionId, setSessionId] = useState<string>("");

  React.useEffect(() => {
    (async () => {
      const p = await params;
      setSessionId(p.sessionId);
    })();
  }, [params]);

  return sessionId ? <SessionView sessionId={sessionId} /> : null;
}

function SessionView({ sessionId }: { sessionId: string }) {
  const search = useSearchParams();
  const initial = search.get("q") || "";
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      role: "assistant",
      content: "Welcome! Ask anything to get started.",
    },
  ]);
  const [value, setValue] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // async function fetchChatHistory(sessionId: string): Promise<Message[]> {
  //   // TODO: Implement server fetch for the given sessionId
  //   return [];
  // }

  const onSubmit = async () => {
    if (!value.trim()) return;
    setIsLoading(true);
    const prompt = value.trim();
    const next: Message[] = [
      ...messages,
      { id: crypto.randomUUID(), role: "user", content: prompt },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Here's a helpful answer based on the prompt.",
      },
    ];
    // Simulate a round-trip
    await new Promise((r) => setTimeout(r, 450));
    setMessages(next);
    setValue("");
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4 pb-10">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-3xl ${
              m.role === "user" ? "ml-auto text-right" : ""
            }`}
          >
            <div
              className={`inline-block rounded-2xl px-4 py-2 text-sm ${
                m.role === "user"
                  ? "bg-neutral-200 text-neutral-900"
                  : "bg-neutral-900/70 border border-neutral-800 text-neutral-100"
              }`}
            >
              {m.content}
            </div>
          </motion.div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Sticky input (shares UI with /chat) */}
      <div className="sticky bottom-4 px-4 md:px-8">
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
