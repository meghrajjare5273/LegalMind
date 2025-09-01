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
<<<<<<< HEAD
  <div
    className={`max-w-3xl mb-4 ${align === "end" ? "ml-auto text-right" : ""}`}
  >
    <Skeleton
      className={`inline-block rounded-2xl px-4 py-2 ${
        align === "end" ? "h-9 max-w-[70%]" : "h-20 w-11/12"
      }`}
    />
=======
  <div className={`chat ${align === "end" ? "chat-end" : "chat-start"} mb-4`}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <Skeleton className="w-full h-full rounded-full" />
      </div>
    </div>
    <div className="chat-header flex items-center gap-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-3 w-12" />
    </div>
    <div className="chat-bubble bg-transparent p-0 shadow-none ring-0">
      {align === "end" ? (
        <Skeleton className="h-9 max-w-[70%] rounded-full" />
      ) : (
        <div className="max-w-none space-y-2">
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-9/12" />
          <Skeleton className="h-4 w-6/12" />
        </div>
      )}
    </div>
    <div className="chat-footer">
      <Skeleton className="h-3 w-16" />
    </div>
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
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
<<<<<<< HEAD
  const [streamingMessage, setStreamingMessage] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
=======
  const [streamingMessage, setStreamingMessage] = useState(""); // NEW: For streaming content

  const messagesEndRef = useRef<HTMLDivElement>(null);
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
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

<<<<<<< HEAD
  const onSubmit = async () => {
    if (!value.trim() || isLoading || !currentSession) return;

    const userMessage = value.trim();
    setValue("");
    setIsLoading(true);
    setStreamingMessage("");

=======
  // NEW: Streaming message handler
  const handleSubmit = async () => {
    if (!message.trim() || isLoading || !currentSession) return;

    const userMessage = message;
    setMessage("");
    setIsLoading(true);
    setStreamingMessage(""); // Reset streaming message

>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
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
<<<<<<< HEAD
=======

>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
<<<<<<< HEAD
=======

>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
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
<<<<<<< HEAD
                setStreamingMessage("");
=======

                setStreamingMessage(""); // Clear streaming message
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
              } else if (data.type === "error") {
                throw new Error(data.error);
              }
            } catch (parseError) {
              console.warn("Failed to parse SSE data:", parseError);
            }
          }
        }
      }
<<<<<<< HEAD
=======
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
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
<<<<<<< HEAD
      setStreamingMessage("");
=======

      setStreamingMessage(""); // Clear streaming message
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364

      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to send message. Please try again.",
      });
<<<<<<< HEAD
=======

>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
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

<<<<<<< HEAD
  // Authentication check
=======
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
  if (!user) {
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
    <div className="flex flex-col h-dvh md:h-screen min-h-0">
      {/* Header */}
      <div className="flex-shrink-0 p-4 bg-transparent backdrop-blur-md z-20 sticky top-0">
<<<<<<< HEAD
        <div className="flex items-center justify-between max-w-3xl mx-auto">
=======
        <div className="flex items-center justify-between max-w-4xl mx-auto">
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-base md:text-lg font-semibold truncate">
              {currentSession?.title || "Legal Assistant"}
            </h1>
          </div>
        </div>
      </div>

<<<<<<< HEAD
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
=======
      {/* Messages Area */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-behavior-contain">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {isLoadingMessages ? (
            Array.from({ length: 3 }).map((_, i) => (
              <MessageSkeleton key={i} align={i % 2 ? "end" : "start"} />
            ))
          ) : (
            <>
              {currentSession?.messages?.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`chat ${isUser ? "chat-end" : "chat-start"}`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        {isUser ? (
                          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-muted-foreground"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="chat-header">
                      {isUser ? "You" : "Legal Assistant"}
                      <time className="text-xs opacity-50 ml-2">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </time>
                    </div>

                    <div
                      className={[
                        "chat-bubble max-w-[70%] md:max-w-[60%]",
                        isUser
                          ? "pill bg-muted text-foreground rounded-full px-4 py-2 shadow-sm ring-1 ring-border"
                          : "bg-transparent p-0 shadow-none ring-0",
                      ].join(" ")}
                    >
                      <div className="prose prose-sm max-w-none dark:prose-invert text-foreground">
                        <p className="whitespace-pre-wrap break-words m-0">
                          {msg.content}
                        </p>
                      </div>
                    </div>

                    <div className="chat-footer opacity-50">
                      {msg.tokenCount && `${msg.tokenCount} tokens`}
                    </div>
                  </motion.div>
                );
              })}

              {/* NEW: Show streaming message while it's being generated */}
              {streamingMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="chat chat-start"
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-muted-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="chat-header">
                    Legal Assistant
                    <time className="text-xs opacity-50 ml-2">
                      {new Date().toLocaleTimeString()}
                    </time>
                  </div>

                  <div className="chat-bubble bg-transparent p-0 shadow-none ring-0 max-w-[70%] md:max-w-[60%]">
                    <div className="prose prose-sm max-w-none dark:prose-invert text-foreground">
                      <p className="whitespace-pre-wrap break-words m-0">
                        {streamingMessage}
                        <span className="animate-pulse">|</span>{" "}
                        {/* Typing cursor */}
                      </p>
                    </div>
                  </div>

                  <div className="chat-footer opacity-50">Generating...</div>
                </motion.div>
              )}

              {/* Assistant typing indicator when starting */}
              {isLoading && !streamingMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="chat chat-start"
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
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

<<<<<<< HEAD
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
=======
                  <div className="chat-bubble bg-transparent p-0 shadow-none ring-0">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                      <span className="text-sm text-foreground">
                        Assistant is thinking...
                      </span>
                    </div>
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
                  </div>
                </div>
                <div className="text-xs opacity-50 mt-1">Generating...</div>
              </motion.div>
            )}

<<<<<<< HEAD
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
=======
                  <div className="chat-footer opacity-50">Starting...</div>
                </motion.div>
              )}
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364

            <div ref={endRef} />
          </>
        )}
      </div>

<<<<<<< HEAD
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
=======
      <div className="flex-shrink-0 p-3 md:p-4 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-t border-border sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <div className="chat-input-shell bg-transparent border-0 shadow-none p-0">
            <AIChatInput
              value={message}
              onChange={setMessage}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              placeholder="Ask your legal question..."
            />
          </div>
        </div>
      </div>

      {/* Global overrides */}
      <style jsx global>{`
        .chat-end .chat-bubble.pill::before {
          display: none !important;
        }
        .chat-input-shell input,
        .chat-input-shell textarea {
          background-color: transparent !important;
          color: inherit;
          box-shadow: none !important;
        }
      `}</style>
>>>>>>> b0746eaf1d5123e949f0b265733b95d79a189364
    </div>
  );
}
