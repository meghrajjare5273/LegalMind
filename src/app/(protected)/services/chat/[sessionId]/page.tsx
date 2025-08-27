"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, Plus, Trash2, ArrowLeft, MessageSquare } from "lucide-react";
import { AIChatInput } from "@/components/ui/ai-chat-input";
import { useSession } from "@/contexts/session-context";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

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

const SessionSkeleton = () => (
  <div className="p-3 mb-2 border border-border/30 rounded-lg">
    <div className="flex justify-between items-start">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
      <Skeleton className="h-6 w-6" />
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
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        // toast.error("Chat session not found");
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
        // toast.error("Failed to send message");
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
      // toast.error("Failed to send message");
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
        // toast.success("Session deleted");
        toast({
          title: "Success",
          variant: "success",
          description: "Session deleted",
        });
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      // toast.error("Failed to delete session");
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not delete chat session",
      });
    }
  };

  return (
    <div className="min-h-screen flex pt-16 pb-6">
      {/* Sidebar */}
      <AnimatePresence>
        {showSessions && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 z-30 bg-background/95 backdrop-blur-md border-r border-border/50 flex flex-col shadow-2xl"
          >
            <div className="p-4 border-b border-border/50 flex items-center gap-2">
              <Button
                onClick={() => setShowSessions(false)}
                variant="ghost"
                size="icon"
                className="lg:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>

              <Button
                onClick={createNewSession}
                className="flex-1 bg-transparent"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>

              <Button
                onClick={() => router.push("/services/chat")}
                variant="ghost"
                size="icon"
                title="Back to Chat Home"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-2">
              {isLoadingSessions
                ? Array.from({ length: 5 }).map((_, i) => (
                    <SessionSkeleton key={i} />
                  ))
                : sessions.map((session) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`group p-3 mb-2 cursor-pointer hover:bg-accent/50 transition-colors rounded-lg border ${
                        currentSession?.id === session.id
                          ? "bg-accent/50 border-primary/50"
                          : "border-border/30 hover:border-border"
                      }`}
                      onClick={() => {
                        router.push(`/services/chat/${session.id}`);
                        setShowSessions(false);
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <MessageSquare className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <p className="font-medium text-sm truncate">
                              {session.title}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(session.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSession(session.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="sticky top-16 z-20 p-4 bg-background/95 backdrop-blur-md border-b border-border/50">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowSessions(!showSessions)}
                variant="ghost"
                size="icon"
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
                      Ask questions about Indian law, contracts, and legal
                      compliance
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4">
          <div className="max-w-4xl mx-auto py-6">
            {isLoadingSession ? (
              Array.from({ length: 3 }).map((_, i) => (
                <MessageSkeleton key={i} />
              ))
            ) : (
              <>
                {/* Welcome message for empty sessions */}
                {!currentSession?.messages?.length && (
                  <div className="flex items-center justify-center h-full py-20">
                    <div className="text-center max-w-md">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                          Continue Your Legal Discussion
                        </h2>
                        <p className="text-muted-foreground mb-8">
                          Ask a follow-up question or start a new legal topic
                        </p>
                      </motion.div>

                      <div className="grid grid-cols-1 gap-3">
                        <Button
                          variant="outline"
                          className="text-left justify-start h-auto p-4 hover:bg-accent/50 bg-transparent"
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
                          className="text-left justify-start h-auto p-4 hover:bg-accent/50 bg-transparent"
                          onClick={() =>
                            setMessage(
                              "What are the fundamental rights under the Indian Constitution?"
                            )
                          }
                        >
                          <div>
                            <div className="font-medium">
                              Constitutional Law
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Fundamental rights and duties
                            </div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat Messages */}
                {currentSession?.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-8 ${
                      msg.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] ${
                        msg.role === "user"
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-muted/30 border border-border/30"
                      } rounded-2xl p-4 backdrop-blur-sm`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            msg.role === "user"
                              ? "bg-primary"
                              : "bg-muted-foreground"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <p className="whitespace-pre-wrap break-words m-0 text-foreground">
                              {msg.content}
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground mt-3 flex items-center gap-2 flex-wrap">
                            <span className="font-medium">
                              {msg.role === "user"
                                ? user?.name?.split(" ")[0] || "You"
                                : "AI Assistant"}
                            </span>
                            <span>•</span>
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

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex justify-start"
                  >
                    <div className="max-w-[85%] bg-muted/30 border border-border/30 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-muted-foreground animate-pulse" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              AI is thinking...
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
        </ScrollArea>

        {/* Input Area */}
        <div className="sticky bottom-0 p-4 bg-background/95 backdrop-blur-md border-t border-border/50">
          <div className="max-w-4xl mx-auto">
            <AIChatInput
              value={message}
              onChange={setMessage}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              placeholder="Continue your legal discussion..."
            />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send • Remember: This is an AI assistant, not a
              replacement for professional legal advice.
            </p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {showSessions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSessions(false)}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
