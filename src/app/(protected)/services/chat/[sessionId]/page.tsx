/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { AIChatInput } from "@/components/ui/ai-chat-input";
import { useSession } from "@/contexts/session-context";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  ChatSession,
  Message,
} from "@/components/protected/chat/chat-sidebar";

const MessageSkeleton = ({ align = "start" }: { align?: "start" | "end" }) => (
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

    {/* Mirror final shapes: pill for user, plain text lines for assistant */}
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
  </div>
);

export default function ChatSessionPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;
  const { user } = useSession();
  const { toast } = useToast();

  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null
  );
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  useEffect(() => {
    if (sessionId) {
      fetchCurrentSession();
    }
  }, [sessionId]);

  const fetchCurrentSession = async () => {
    try {
      setIsLoadingMessages(true);
      const response = await fetch(`/api/chat/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentSession(data.session);
      } else {
        router.push("/services/chat");
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      router.push("/services/chat");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSubmit = async () => {
    if (!message.trim() || isLoading || !currentSession) return;
    const userMessage = message;
    setMessage("");
    setIsLoading(true);

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

    try {
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage, sessionId }),
      });

      if (response.ok) {
        const data = await response.json();
        const newAssistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.response,
          createdAt: new Date().toISOString(),
          tokenCount: data.tokenUsage?.response,
        };

        setCurrentSession((prev) => ({
          ...prev!,
          messages: [...prev!.messages, newAssistantMessage],
          updatedAt: new Date().toISOString(),
        }));
      } else {
        setCurrentSession((prev) => ({
          ...prev!,
          messages: prev!.messages.filter((m) => m.id !== newUserMessage.id),
        }));
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setCurrentSession((prev) => ({
        ...prev!,
        messages: prev!.messages.filter((m) => m.id !== newUserMessage.id),
      }));
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to send message. Please try again.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="flex-shrink-0 p-4 bg-background/95 backdrop-blur-md border-b border-border/50 z-20">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold truncate">
              {currentSession?.title || "Legal Assistant"}
            </h1>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto overscroll-behavior-contain">
        <div
          className="max-w-4xl mx-auto p-4 space-y-4 min-h-[60vh]"
          style={{ containIntrinsicSize: "800px" }}
        >
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

                    {/* User = true pill (no tail); Assistant = invisible container */}
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

              {/* Assistant typing indicator (keeps container invisible) */}
              {isLoading && (
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

                  <div className="chat-bubble bg-transparent p-0 shadow-none ring-0">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                      <span className="text-sm text-foreground">
                        Assistant is typing...
                      </span>
                    </div>
                  </div>

                  <div className="chat-footer opacity-50">Thinking...</div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Area: sticky but invisible surface */}
      <div className="flex-shrink-0 p-4 bg-transparent border-t-0 backdrop-blur-0">
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

      {/* Global overrides: hide daisyUI tail for pills and ensure transparent inputs */}
      <style jsx global>{`
        /* True pill: remove daisyUI tail on user bubbles */
        .chat-end .chat-bubble.pill::before {
          display: none !important;
        }

        /* Input should inherit page surface */
        .chat-input-shell input,
        .chat-input-shell textarea {
          background-color: transparent !important;
          color: inherit;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
