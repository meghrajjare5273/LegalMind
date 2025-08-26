/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, Plus, Trash2, Send, Loader2 } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
  tokenCount?: number;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export default function ChatSessionPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null
  );
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
  }, []);

  // Load specific session when sessionId changes
  useEffect(() => {
    if (sessionId) {
      loadSession(sessionId);
    }
  }, [sessionId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSession?.messages]);

  const loadSessions = async () => {
    try {
      const response = await fetch("/api/chat/sessions");
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions);
      }
    } catch (error) {
      console.error("Error loading sessions:", error);
    }
  };

  const loadSession = async (id: string) => {
    try {
      const response = await fetch(`/api/chat/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentSession(data.session);
      } else if (response.status === 404) {
        // Session not found, redirect to new chat
        router.push("/services/chat");
      }
    } catch (error) {
      console.error("Error loading session:", error);
    }
  };

  const createNewSession = async () => {
    try {
      const response = await fetch("/api/chat/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Chat" }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/services/chat/${data.session.id}`);
        await loadSessions();
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = message;
    setMessage("");

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

        // If new session was created, navigate to it
        if (data.sessionId && data.sessionId !== sessionId) {
          router.push(`/services/chat/${data.sessionId}`);
          return;
        }

        // Reload the current session to get updated messages
        await loadSession(sessionId);
        await loadSessions();

        // Force refresh the router to ensure UI updates
        router.refresh();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = async (id: string) => {
    try {
      const response = await fetch(`/api/chat/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSessions(sessions.filter((s) => s.id !== id));
        if (currentSession?.id === id) {
          router.push("/services/chat");
        }
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Spotlight />

      <div className="relative z-10 flex h-screen bg-transparent pb-24">
        {/* Sidebar */}
        <div
          className={`${
            showSessions ? "w-80" : "w-16"
          } transition-all duration-300 bg-background/80 backdrop-blur-sm border-r border-border/50 flex flex-col`}
        >
          <div className="p-4 border-b border-border/50">
            <Button
              onClick={() => setShowSessions(!showSessions)}
              variant="ghost"
              size="icon"
            >
              <Menu className="h-4 w-4" />
            </Button>

            {showSessions && (
              <Button
                onClick={createNewSession}
                className="w-full mt-2 bg-transparent"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            )}
          </div>

          {showSessions && (
            <ScrollArea className="flex-1 p-2">
              {sessions.map((session) => (
                <Card
                  key={session.id}
                  className={`p-3 mb-2 cursor-pointer hover:bg-accent/50 transition-colors bg-background/60 backdrop-blur-sm border-border/50 ${
                    currentSession?.id === session.id ? "bg-accent/50" : ""
                  }`}
                  onClick={() => {
                    setCurrentSession(session);
                    router.push(`/services/chat/${session.id}`);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {session.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(session.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(session.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </ScrollArea>
          )}
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border/50 bg-background/80 backdrop-blur-sm">
            <h1 className="text-lg font-semibold">
              {currentSession?.title || "LegalMind AI Chat"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Ask questions about Indian law, contracts, and legal compliance
            </p>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {!currentSession?.messages?.length && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">
                    Welcome to LegalMind AI
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Start a conversation by asking a legal question
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl">
                    <Button
                      variant="outline"
                      className="text-left justify-start h-auto p-4 bg-background/60 backdrop-blur-sm border-border/50"
                      onClick={() =>
                        setMessage(
                          "What are the key provisions of the Indian Contract Act?"
                        )
                      }
                    >
                      <div>
                        <div className="font-medium">Contract Law</div>
                        <div className="text-sm text-muted-foreground">
                          Key provisions of Indian Contract Act
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="text-left justify-start h-auto p-4 bg-background/60 backdrop-blur-sm border-border/50"
                      onClick={() =>
                        setMessage(
                          "What are the fundamental rights under the Indian Constitution?"
                        )
                      }
                    >
                      <div>
                        <div className="font-medium">Constitutional Law</div>
                        <div className="text-sm text-muted-foreground">
                          Fundamental rights and duties
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentSession?.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 mb-6 ${
                  msg.role === "user" ? "justify-end" : ""
                }`}
              >
                {msg.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[70%] ${
                    msg.role === "user" ? "order-first" : ""
                  }`}
                >
                  <Card
                    className={`p-4 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-background/80 backdrop-blur-sm border-border/50"
                    }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {msg.content}
                    </div>
                    <div className="text-xs opacity-70 mt-2">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                      {msg.tokenCount && (
                        <span className="ml-2">• {msg.tokenCount} tokens</span>
                      )}
                    </div>
                  </Card>
                </div>

                {msg.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask about legal matters, contracts, compliance..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                className="min-h-[100px] resize-none bg-transparent border-border/50"
                disabled={isLoading}
              />
              <Button
                onClick={handleSubmit}
                disabled={!message.trim() || isLoading}
                className="self-end"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line. Remember: This is
              an AI assistant, not a replacement for professional legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
