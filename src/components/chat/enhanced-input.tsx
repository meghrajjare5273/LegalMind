"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send, Paperclip, Mic, Square, Loader2 } from "lucide-react";

interface EnhancedInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onAttach?: () => void;
  disabled?: boolean;
  placeholder?: string;
  isLoading?: boolean;
}

export function EnhancedInput({
  value,
  onChange,
  onSend,
  onAttach,
  disabled = false,
  placeholder = "Ask me anything about legal matters...",
  isLoading = false,
}: EnhancedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled && !isLoading) {
        onSend();
      }
    }
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    // Voice recording functionality can be implemented here
  };

  return (
    <motion.div
      className={`relative flex items-end gap-3 rounded-2xl border p-3 transition-all duration-200 ${
        isFocused
          ? "border-primary/50 bg-background shadow-lg"
          : "border-border bg-background/50"
      }`}
      animate={{
        scale: isFocused ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Attach Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onAttach}
        disabled={disabled}
        className="shrink-0 p-2 h-auto"
      >
        <Paperclip className="h-4 w-4" />
      </Button>

      {/* Text Input */}
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        className="min-h-[24px] max-h-[120px] resize-none border-0 bg-transparent p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        rows={1}
      />

      {/* Voice/Send Button */}
      {value.trim() ? (
        <Button
          onClick={onSend}
          disabled={disabled || isLoading}
          size="sm"
          className="shrink-0 p-2 h-auto bg-primary hover:bg-primary/90"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMicClick}
          disabled={disabled}
          className="shrink-0 p-2 h-auto"
        >
          {isRecording ? (
            <Square className="h-4 w-4 text-red-500" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
      )}

      {/* Recording Indicator */}
      {isRecording && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-10 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs"
        >
          Recording...
        </motion.div>
      )}
    </motion.div>
  );
}
