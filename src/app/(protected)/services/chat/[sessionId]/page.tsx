/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AIChatInput } from "@/components/protected/chat/ai-chat-input";
import { MessageBubble } from "@/components/protected/chat/message-bubble";
import { useSession } from "@/contexts/session-context";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";

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
    className={`w-full mb-6 ${
      align === "end" ? "flex justify-end" : "flex justify-start"
    }`}
  >
    <div className="max-w-[85%] md:max-w-[75%]">
      <Skeleton
        className={`rounded-2xl ${
          align === "end" ? "h-12 w-48 bg-muted/50" : "h-20 w-64 bg-card/50"
        }`}
      />
    </div>
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
      const response = await fetch(`/api/chat/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentSession(data.session);
      } else if (response.status === 404) {
        // Session not found, create a new one with this ID
        setCurrentSession({
          id: sessionId,
          title: "New Chat",
          messages: [],
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
      <div className="h-full flex items-center justify-center bg-background">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-muted rounded-lg mb-4 mx-auto" />
          <div className="h-4 w-96 bg-muted rounded-lg mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-transparent overflow-y-hidden">
      {/* Subtle title bar - non-sticky */}
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
        <h1 className="text-base font-medium text-muted-foreground/80 text-center">
          {currentSession?.title || "Legal Assistant"}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {isLoadingMessages ? (
            Array.from({ length: 3 }).map((_, i) => (
              <MessageSkeleton key={i} align={i % 2 ? "end" : "start"} />
            ))
          ) : (
            <>
              {currentSession?.messages?.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}

              {streamingMessage && (
                <MessageBubble
                  message={{
                    id: "streaming",
                    role: "assistant",
                    content: streamingMessage,
                    createdAt: new Date().toISOString(),
                  }}
                  isStreaming={true}
                />
              )}

              {/* Empty state */}
              {currentSession?.messages?.length === 0 && !streamingMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Start a conversation
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Ask me anything about Indian law, legal procedures, or get
                    help with contract analysis.
                  </p>
                </motion.div>
              )}
            </>
          )}
          <div ref={endRef} />
        </div>
      </div>

      <div className="max-w-full px-4 py-4">
        <AIChatInput
          value={value}
          onChange={setValue}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
