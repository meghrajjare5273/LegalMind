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

const MessageSkeleton = () => (
  <div className="mb-8 flex justify-start">
    <div className="max-w-[85%] bg-muted/30 border border-border/30 rounded-2xl p-4 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <Skeleton className="w-2 h-2 rounded-full mt-2 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center gap-2 mt-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-1" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>
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

    // Create user message object
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userMessage,
      createdAt: new Date().toISOString(),
    };

    // Add user message immediately (optimistic update)
    setCurrentSession((prev) => ({
      ...prev!,
      messages: [...prev!.messages, newUserMessage],
    }));

    try {
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMessage,
          sessionId: sessionId,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Create assistant message object
        const newAssistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.response,
          createdAt: new Date().toISOString(),
          tokenCount: data.tokenUsage?.response,
        };

        // Add assistant message (optimistic update)
        setCurrentSession((prev) => ({
          ...prev!,
          messages: [...prev!.messages, newAssistantMessage],
          updatedAt: new Date().toISOString(),
        }));
      } else {
        // Remove the user message if the request failed
        setCurrentSession((prev) => ({
          ...prev!,
          messages: prev!.messages.filter(
            (msg) => msg.id !== newUserMessage.id
          ),
        }));

        console.error("Failed to send message");
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      // Remove the user message if the request failed
      setCurrentSession((prev) => ({
        ...prev!,
        messages: prev!.messages.filter((msg) => msg.id !== newUserMessage.id),
      }));

      console.error("Error sending message:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to send message. Please try again.",
      });
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
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {isLoadingMessages ? (
            Array.from({ length: 3 }).map((_, i) => <MessageSkeleton key={i} />)
          ) : (
            <>
              {currentSession?.messages?.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 backdrop-blur-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/30 border border-border/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          msg.role === "user"
                            ? "bg-primary-foreground/70"
                            : "bg-primary"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <p className="whitespace-pre-wrap break-words">
                            {msg.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-3 text-xs opacity-70">
                          <span>
                            {new Date(msg.createdAt).toLocaleTimeString()}
                          </span>
                          {msg.tokenCount && (
                            <>
                              <span>•</span>
                              <span>{msg.tokenCount} tokens</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator for assistant response */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] bg-muted/30 border border-border/30 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-primary" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          <span className="text-sm text-muted-foreground">
                            Assistant is typing...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 bg-background/95 backdrop-blur-md border-t border-border/50">
        <div className="max-w-4xl mx-auto">
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
  );
}
