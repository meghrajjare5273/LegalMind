"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  MessageSquare,
  Plus,
  Settings,
  User,
  Archive,
  Bot,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";

interface ChatSession {
  id: string;
  title: string;
  lastMessage?: string;
  updatedAt: string;
}

interface MinimalSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  sessions: ChatSession[];
  activeSessionId?: string;
  onSessionSelect: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string) => void;
  user?: { name: string; email: string } | null;
}

export function MinimalSidebar({
  isOpen,
  onToggle,
  sessions,
  activeSessionId,
  onSessionSelect,
  onNewSession,
  onDeleteSession,
  user,
}: MinimalSidebarProps) {
  const sidebarItems = [
    { icon: Bot, label: "LegalMind AI", action: () => {}, isLogo: true },
    { icon: Plus, label: "New Chat", action: onNewSession },
    { icon: MessageSquare, label: "Conversations", action: () => {} },
    { icon: Archive, label: "Archived", action: () => {} },
    { icon: Settings, label: "Settings", action: () => {} },
    { icon: User, label: "Profile", action: () => {} },
  ];

  return (
    <TooltipProvider>
      <motion.div
        className="flex h-full flex-col border-r bg-background"
        animate={{ width: isOpen ? 300 : 60 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-3 border-b">
          <Button variant="ghost" size="sm" onClick={onToggle} className="p-2">
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Sidebar Items */}
        <div className="flex flex-col gap-1 p-2">
          {sidebarItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={item.action}
                  className={`${
                    isOpen ? "justify-start" : "justify-center"
                  } h-10 gap-3 ${
                    item.isLogo ? "text-primary font-semibold" : ""
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {isOpen && <span className="truncate">{item.label}</span>}
                </Button>
              </TooltipTrigger>
              {!isOpen && (
                <TooltipContent side="right">{item.label}</TooltipContent>
              )}
            </Tooltip>
          ))}
        </div>

        {/* Conversations List (when expanded) */}
        {isOpen && (
          <div className="flex-1 overflow-hidden">
            <div className="px-3 py-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Recent Chats
              </h3>
            </div>
            <ScrollArea className="flex-1 px-2">
              {sessions.slice(0, 20).map((session) => (
                <div key={session.id} className="group relative mb-1">
                  <Button
                    onClick={() => onSessionSelect(session.id)}
                    variant="ghost"
                    size="sm"
                    className={`w-full h-auto py-3 px-3 justify-start text-left ${
                      activeSessionId === session.id
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-foreground hover:bg-accent"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate mb-1">
                        {session.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {new Date(session.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}

        {/* User Profile Section */}
        <div className="border-t p-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`w-full ${
                  isOpen ? "justify-start" : "justify-center"
                } h-10 gap-3`}
              >
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {user?.name?.charAt(0) || "U"}
                </div>
                {isOpen && (
                  <div className="flex-1 min-w-0 text-left">
                    <div className="text-sm font-medium truncate">
                      {user?.name || "User"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Free Plan
                    </div>
                  </div>
                )}
              </Button>
            </TooltipTrigger>
            {!isOpen && (
              <TooltipContent side="right">
                {user?.name || "User"} - Free Plan
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
