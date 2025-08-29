/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
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

export function ChatSidebar({
  variant = "auto",
}: {
  variant?: "auto" | "desktop" | "mobile";
}) {
  const router = useRouter();
  const params = useParams();
  const sessionId = params?.sessionId as string;
  const { user } = useSession();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null
  );
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);

  const renderDesktop = variant !== "mobile";
  const renderMobile = variant !== "desktop";

  // Fetch sessions on component mount
  useEffect(() => {
    fetchSessions();
  }, []);

  // Fetch current session when sessionId changes
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

  const createNewSession = async () => {
    try {
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "Hello",
          sessionId: null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.sessionId) {
          router.push(`/services/chat/${data.sessionId}`);
          await fetchSessions(); // Refresh sessions list
        }
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
        setSessions(sessions.filter((s) => s.id !== sessionIdToDelete));

        // If we're deleting the current session, redirect to chat home
        if (sessionIdToDelete === sessionId) {
          router.push("/services/chat");
        }

        toast({
          title: "Success",
          description: "Chat session deleted successfully",
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

  const links = [
    {
      label: "New Chat",
      href: "#",
      icon: (
        <IconPlus className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: createNewSession,
    },
    {
      label: "Chat Home",
      href: "/services/chat",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  return (
    <div className="h-full">
      {/* Desktop shell (hover-to-expand) */}
      {renderDesktop && (
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Logo */}
              {open ? <Logo /> : <LogoIcon />}
              {open ? <AnimatedThemeToggler /> : null}

              {/* Navigation Links */}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <div key={idx} onClick={link.onClick}>
                    <SidebarLink link={link} />
                  </div>
                ))}
              </div>

              {/* Chat History - Scrollable Section */}
              <div className="mt-6 flex-1 overflow-hidden">
                <motion.div
                  animate={{
                    opacity: open ? 1 : 0,
                    display: open ? "block" : "none",
                  }}
                  className="mb-4"
                >
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-200 px-2">
                    Chat History
                  </h3>
                </motion.div>

                <div className="flex-1 overflow-y-auto overscroll-behavior-contain pr-2">
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
                            "group p-3 mb-2 cursor-pointer hover:bg-accent/50 transition-colors rounded-lg border",
                            currentSession?.id === session.id
                              ? "bg-accent/50 border-primary/50"
                              : "border-border/30 hover:border-border"
                          )}
                          onClick={() => {
                            router.push(`/services/chat/${session.id}`);
                            setOpen(false);
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <IconMessageCircle className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                <motion.p
                                  animate={{
                                    opacity: open ? 1 : 0,
                                    display: open ? "block" : "none",
                                  }}
                                  className="font-medium text-sm truncate"
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
                                {new Date(
                                  session.updatedAt
                                ).toLocaleDateString()}
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
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSession(session.id);
                                }}
                              >
                                <IconTrash className="h-3 w-3" />
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
                    <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      )}
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/services/chat"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-gradient-to-r from-blue-600 to-purple-600" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
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
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-gradient-to-r from-blue-600 to-purple-600" />
    </Link>
  );
};
