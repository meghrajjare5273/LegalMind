/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useMemo } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBrandTabler,
  IconPlus,
  IconTrash,
  IconMessageCircle,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "@/contexts/session-context";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/magicui/animated-theme-toggler";

export type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
  tokenCount?: number;
};

export type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};

const SessionSkeleton = () => (
  <div className="mb-2 rounded-lg border border-border/30 p-3">
    <div className="flex items-start justify-between">
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-sm" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
      <Skeleton className="h-6 w-6 rounded-md" />
    </div>
  </div>
);

export function ChatSidebar() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params?.sessionId as string | undefined;
  const { user } = useSession();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null
  );
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetchCurrentSession();
    }
  }, [sessionId]);

  const fetchSessions = async () => {
    try {
      setIsLoadingSessions(true);
      const response = await fetch("/api/chat/sessions");
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions || []);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const fetchCurrentSession = async () => {
    try {
      const response = await fetch(`/api/chat/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentSession(data.session);
      }
    } catch (error) {
      console.error("Error fetching current session:", error);
    }
  };

  // src/components/protected/chat/chat-sidebar.tsx
  // Replace the existing createNewSession with this version

  const createNewSession = async () => {
    try {
      const response = await fetch("/api/chat/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Optional: send a title or omit to use backend default "New Chat"
        body: JSON.stringify({ title: "New Chat" }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      const { session } = await response.json();

      if (session?.id) {
        router.push(`/services/chat/${session.id}`);
        await fetchSessions();
      }
    } catch (error) {
      console.error("Error creating new session:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not create new chat session",
      });
    }
  };

  const deleteSession = async (sessionIdToDelete: string) => {
    try {
      const response = await fetch(`/api/chat/${sessionIdToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSessions((prev) => prev.filter((s) => s.id !== sessionIdToDelete));
        if (sessionIdToDelete === sessionId) {
          router.push("/services/chat");
        }
        toast({
          title: "Success",
          description: "Chat session deleted successfully",
        });
      } else {
        throw new Error("Failed to delete");
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

  const links = useMemo(
    () => [
      {
        label: "New Chat",
        href: "#",
        icon: (
          <IconPlus
            className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200"
            stroke={1.75}
          />
        ),
        onClick: createNewSession,
      },
      {
        label: "Chat Home",
        href: "/services/chat",
        icon: (
          <IconBrandTabler
            className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200"
            stroke={1.75}
          />
        ),
      },
    ],
    []
  );

  return (
    <div className="h-full">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="gap-10 justify-between">
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Logo */}
            {open ? <Logo /> : <LogoIcon />}
            {/* Optional: Theme toggler when expanded */}
            {open ? <AnimatedThemeToggler /> : null}

            {/* Navigation Links */}
            <nav className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <button
                  key={idx}
                  className="text-left"
                  onClick={(e) => {
                    e.preventDefault();
                    link.onClick?.();
                  }}
                >
                  <SidebarLink link={link} />
                </button>
              ))}
            </nav>

            {/* Chat History */}
            <div className="mt-6 flex-1 overflow-hidden">
              <motion.div
                animate={{
                  opacity: open ? 1 : 0,
                  display: open ? "block" : "none",
                }}
                className="mb-4 px-2"
              >
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  Chat History
                </h3>
              </motion.div>

              <div className="flex-1 overscroll-contain overflow-y-auto pr-2">
                {isLoadingSessions
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <SessionSkeleton key={i} />
                    ))
                  : sessions.map((session) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "group mb-2 cursor-pointer rounded-lg border p-3 transition-colors hover:bg-accent/50",
                          currentSession?.id === session.id
                            ? "border-primary/50 bg-accent/50"
                            : "border-border/30 hover:border-border"
                        )}
                        onClick={() => {
                          router.push(`/services/chat/${session.id}`);
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <IconMessageCircle
                                className="h-4 w-4 flex-shrink-0 text-muted-foreground"
                                stroke={1.75}
                              />
                              <motion.p
                                animate={{
                                  opacity: open ? 1 : 0,
                                  display: open ? "block" : "none",
                                }}
                                className="truncate text-sm font-medium"
                              >
                                {session.title}
                              </motion.p>
                            </div>
                            <motion.p
                              animate={{
                                opacity: open ? 1 : 0,
                                display: open ? "block" : "none",
                              }}
                              className="text-xs text-muted-foreground"
                            >
                              {new Date(session.updatedAt).toLocaleDateString()}
                            </motion.p>
                          </div>
                          <motion.div
                            animate={{
                              opacity: open ? 1 : 0,
                              display: open ? "block" : "none",
                            }}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteSession(session.id);
                              }}
                              aria-label="Delete session"
                            >
                              <IconTrash className="h-3 w-3" stroke={2} />
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div>
            <SidebarLink
              link={{
                label: user?.name || "User",
                href: "#",
                icon: (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-xs font-medium text-white dark:bg-white dark:text-black">
                    {(user?.name?.charAt(0) || "U").toUpperCase()}
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/services/chat"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-medium text-foreground"
      >
        LegalMind
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/services/chat"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </Link>
  );
};
