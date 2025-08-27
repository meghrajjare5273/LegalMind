/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Menu,
  Plus,
  Trash2,
  ArrowLeft,
  MessageSquare,
  User,
  Bot,
} from "lucide-react";
import { useSession } from "@/contexts/session-context";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { MinimalSidebar } from "@/components/chat/minimal-sidebar";
import { EnhancedInput } from "@/components/chat/enhanced-input";
import { WelcomeScreen } from "@/components/chat/welcome-screen";

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
  const { user } = useSession();
  const { toast } = useToast();

  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null
  );
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const firstName = user?.name?.split(" ")[0] || "Counsel";

  useEffect(() => {
    if (sessionId) {
      loadSession(sessionId);
      loadSessions();
    }
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSession?.messages]);

  const loadSessions = async () => {
    try {
      setIsLoadingSessions(true);
      const response = await fetch("/api/chat/sessions");
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions);
      }
    } catch (error) {
      console.error("Error loading sessions:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not fetch chat history.",
      });
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const loadSession = async (id: string) => {
    try {
      setIsLoadingSession(true);
      const response = await fetch(`/api/chat/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentSession(data.session);
      } else if (response.status === 404) {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Chat session not found",
        });
        router.push("/services/chat");
      }
    } catch (error) {
      console.error("Error loading session:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not load chat session.",
      });
    } finally {
      setIsLoadingSession(false);
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
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to create new session",
      });
    }
  };

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = message;
    setMessage("");

    if (currentSession) {
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        role: "user",
        content: userMessage,
        createdAt: new Date().toISOString(),
      };
      setCurrentSession({
        ...currentSession,
        messages: [...currentSession.messages, optimisticMessage],
      });
    }

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

        if (data.sessionId && data.sessionId !== sessionId) {
          router.push(`/services/chat/${data.sessionId}`);
          return;
        }

        await loadSession(sessionId);
        await loadSessions();
      } else {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to send message",
        });
        if (currentSession) {
          setCurrentSession({
            ...currentSession,
            messages: currentSession.messages.filter(
              (m) => !m.id.startsWith("temp-")
            ),
          });
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to send message",
      });
      if (currentSession) {
        setCurrentSession({
          ...currentSession,
          messages: currentSession.messages.filter(
            (m) => !m.id.startsWith("temp-")
          ),
        });
      }
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
        toast({
          title: "Success",
          description: "Session deleted",
        });
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not delete chat session",
      });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <div className="min-h-screen flex pt-16 pb-6">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-30 shadow-2xl lg:relative lg:top-0 lg:h-full"
          >
            <MinimalSidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              sessions={sessions}
              activeSessionId={sessionId}
              onSessionSelect={(id: any) => {
                router.push(`/services/chat/${id}`);
                setSidebarOpen(false);
              }}
              onNewSession={createNewSession}
              onDeleteSession={deleteSession}
              user={user}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="sticky top-16 z-20 p-4 bg-background/95 backdrop-blur-md border-b border-border/50">
          <div className="flex items-center justify-between max-w-none mx-auto">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                variant="ghost"
                size="icon"
                className="lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>

              <div className="min-w-0 flex-1">
                {isLoadingSession ? (
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                ) : (
                  <>
                    <h1 className="text-lg font-semibold truncate">
                      {currentSession?.title || "LegalMind AI Chat"}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      AI-powered legal assistance
                    </p>
                  </>
                )}
              </div>
            </div>
            <Button
              onClick={() => router.push("/services/chat")}
              variant="ghost"
              size="icon"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          {isLoadingSession ? (
            <div className="flex-1 p-6 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : !currentSession?.messages?.length && !isLoading ? (
            <WelcomeScreen
              onSuggestionClick={handleSuggestionClick}
              userName={firstName}
            />
          ) : (
            <ScrollArea className="flex-1 px-6">
              <div className="max-w-4xl mx-auto py-6 space-y-6">
                {currentSession?.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p className="whitespace-pre-wrap break-words m-0">
                          {msg.content}
                        </p>
                      </div>
                      <div className="text-xs mt-2 opacity-70 flex items-center gap-2">
                        <span>
                          {msg.role === "user" ? firstName : "AI Assistant"}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          )}

          {/* Input Area */}
          <div className="p-6 border-t">
            <div className="max-w-4xl mx-auto">
              <EnhancedInput
                value={message}
                onChange={setMessage}
                onSend={handleSubmit}
                isLoading={isLoading}
                placeholder="Continue your legal discussion..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
