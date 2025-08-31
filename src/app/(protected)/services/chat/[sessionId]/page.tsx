/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AIChatInput } from "@/components/protected/chat/ai-chat-input";
import { useSession } from "@/contexts/session-context";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  tokenCount?: number;
};

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};

const MessageSkeleton = ({ align = "start" }: { align?: "start" | "end" }) => (
  <div
    className={`max-w-3xl mb-4 ${align === "end" ? "ml-auto text-right" : ""}`}
  >
    <Skeleton
      className={`inline-block rounded-2xl px-4 py-2 ${
        align === "end" ? "h-9 max-w-[70%]" : "h-20 w-11/12"
      }`}
    />
  </div>
);

export default function ChatSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
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
  const router = useRouter();
  const search = useSearchParams();
  const initial = search.get("q") || "";
  const { user } = useSession();
  const { toast } = useToast();

  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null
  );
  const [value, setValue] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [streamingMessage, setStreamingMessage] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages, streamingMessage]);

  useEffect(() => {
    if (sessionId) {
      fetchCurrentSession();
    }
  }, [sessionId]);

  // Handle initial query if present
  useEffect(() => {
    if (initial && currentSession && currentSession.messages.length <= 1) {
      setValue(initial);
      // Auto-submit the initial query
      setTimeout(() => {
        if (initial.trim()) {
          onSubmit();
        }
      }, 500);
    }
  }, [initial, currentSession]);

  const fetchCurrentSession = async () => {
    try {
      setIsLoadingMessages(true);
      const response = await fetch(`/api/chat/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentSession(data.session);
      } else {
        // If session doesn't exist, create it with welcome message
        setCurrentSession({
          id: sessionId,
          title: "Legal Assistant",
          messages: [
            {
              id: "welcome",
              role: "assistant",
              content: "Welcome! Ask anything about Indian law to get started.",
              createdAt: new Date().toISOString(),
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to load chat session.",
      });
      router.push("/chat");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const onSubmit = async () => {
    if (!value.trim() || isLoading || !currentSession) return;

    const userMessage = value.trim();
    setValue("");
    setIsLoading(true);
    setStreamingMessage("");

    // Add user message to UI immediately
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userMessage,
      createdAt: new Date().toISOString(),
    };

    setCurrentSession((prev) => ({
      ...prev!,
      messages: [...prev!.messages, newUserMessage],
    }));

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage, sessionId }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body reader available");
      }

      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === "chunk") {
                accumulatedContent += data.content;
                setStreamingMessage(accumulatedContent);
              } else if (data.type === "complete") {
                // Streaming complete - add final message to session
                const finalMessage: Message = {
                  id: `assistant-${Date.now()}`,
                  role: "assistant",
                  content: accumulatedContent,
                  createdAt: new Date().toISOString(),
                  tokenCount: data.tokenUsage?.response,
                };

                setCurrentSession((prev) => ({
                  ...prev!,
                  messages: [...prev!.messages, finalMessage],
                  updatedAt: new Date().toISOString(),
                }));
                setStreamingMessage("");
              } else if (data.type === "error") {
                throw new Error(data.error);
              }
            } catch (parseError) {
              console.warn("Failed to parse SSE data:", parseError);
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Request was aborted");
        return;
      }

      // Remove the user message if there was an error
      setCurrentSession((prev) => ({
        ...prev!,
        messages: prev!.messages.filter((m) => m.id !== newUserMessage.id),
      }));
      setStreamingMessage("");

      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to send message. Please try again.",
      });
      console.error("Streaming error:", error);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Authentication check
  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-4" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-4 bg-transparent backdrop-blur-md z-20 sticky top-0">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-base md:text-lg font-semibold truncate">
              {currentSession?.title || "Legal Assistant"}
            </h1>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4 pb-10">
        {isLoadingMessages ? (
          Array.from({ length: 3 }).map((_, i) => (
            <MessageSkeleton key={i} align={i % 2 ? "end" : "start"} />
          ))
        ) : (
          <>
            {currentSession?.messages?.map((m) => (
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
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p className="whitespace-pre-wrap break-words m-0">
                      {m.content}
                    </p>
                  </div>
                </div>
                {m.tokenCount && (
                  <div className="text-xs opacity-50 mt-1">
                    {m.tokenCount} tokens
                  </div>
                )}
              </motion.div>
            ))}

            {/* Streaming message */}
            {streamingMessage && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                <div className="inline-block rounded-2xl px-4 py-2 text-sm bg-neutral-900/70 border border-neutral-800 text-neutral-100">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p className="whitespace-pre-wrap break-words m-0">
                      {streamingMessage}
                      <span className="animate-pulse">|</span>
                    </p>
                  </div>
                </div>
                <div className="text-xs opacity-50 mt-1">Generating...</div>
              </motion.div>
            )}

            {/* Loading indicator */}
            {isLoading && !streamingMessage && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                <div className="inline-block rounded-2xl px-4 py-2 text-sm bg-neutral-900/70 border border-neutral-800 text-neutral-100">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                    <span>Assistant is thinking...</span>
                  </div>
                </div>
                <div className="text-xs opacity-50 mt-1">Starting...</div>
              </motion.div>
            )}

            <div ref={endRef} />
          </>
        )}
      </div>

      {/* Sticky input */}
      <div className="flex-shrink-0 sticky bottom-4 px-4 md:px-8 bg-transparent">
        <div className="bg-transparent  rounded-xl p-3">
          <AIChatInput
            value={value}
            onChange={setValue}
            onSubmit={onSubmit}
            isLoading={isLoading}
            placeholder="Ask your legal question..."
          />
        </div>
      </div>
    </div>
  );
}
