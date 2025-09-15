"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Bot, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
    tokenCount?: number;
  };
  isStreaming?: boolean;
}

export function MessageBubble({
  message,
  isStreaming = false,
}: MessageBubbleProps) {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "w-full flex gap-3 group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[85%] md:max-w-[75%] relative",
          isUser && "order-first"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-sm relative",
            isUser
              ? "bg-primary text-primary-foreground ml-auto"
              : "bg-card border border-border text-card-foreground"
          )}
        >
          {/* Copy button for assistant messages */}
          {!isUser && (
            <Button
              size="sm"
              variant="ghost"
              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-6 w-6 p-0"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          )}

          {/* Message content */}
          {isUser ? (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="whitespace-pre-wrap break-words m-0 leading-relaxed text-pretty text-primary-foreground">
                {message.content}
              </p>
            </div>
          ) : (
            <div className="relative">
              <MarkdownRenderer
                content={message.content}
                className="prose-sm [&>*:last-child]:mb-0"
              />
              {isStreaming && (
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="inline-block w-2 h-4 bg-current ml-1"
                />
              )}
            </div>
          )}

          {/* Token count for assistant messages */}
          {!isUser && message.tokenCount && (
            <div className="text-xs text-muted-foreground mt-2 opacity-60">
              {message.tokenCount} tokens
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div
          className={cn(
            "text-xs text-muted-foreground mt-1 px-1",
            isUser ? "text-right" : "text-left"
          )}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </motion.div>
  );
}
