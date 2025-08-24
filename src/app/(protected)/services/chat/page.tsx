"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { TextGlitch } from "@/components/ui/text-glitch-effect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Paperclip,
  ImageIcon,
  Send,
  Scale,
  FileText,
  Users,
  Building,
} from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/magicui/animated-theme-toggler";

// Mock user data - replace with actual better-auth integration
const useUser = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Simulate fetching user data
    // Replace this with actual better-auth client call
    setUser({ name: "Ui Mahadi" });
  }, []);

  return user;
};

const legalPrompts = [
  {
    title: "Draft a contract for a business partnership",
    description: "Create a comprehensive partnership agreement",
    icon: FileText,
  },
  {
    title: "Review employment law compliance",
    description: "Analyze workplace policies and procedures",
    icon: Users,
  },
  {
    title: "Explain intellectual property rights",
    description: "Understand patents, trademarks, and copyrights",
    icon: Scale,
  },
  {
    title: "Corporate governance best practices",
    description: "Guide on board responsibilities and compliance",
    icon: Building,
  },
];

export default function ChatPage() {
  const user = useUser();
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setMessage(value);
      setCharCount(value.length);
    }
  };

  const handlePromptClick = (promptTitle: string) => {
    setMessage(promptTitle);
  };

  const handleSubmit = () => {
    if (message.trim()) {
      // Handle message submission
      console.log("Submitting message:", message);
      // Add your chat logic here
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Spotlight Background Effect */}
      <div className="fixed inset-0 z-0">
        <Spotlight />
      </div>

      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <AnimatedThemeToggler />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="flex items-center justify-center min-h-full p-4 md:p-8">
            <div className="max-w-4xl w-full space-y-8">
              {/* Welcome Message with Glitch Effect */}
              <div className="text-center space-y-4">
                <div className="overflow-hidden">
                  <TextGlitch
                    text={`Hi there, ${user?.name || "Legal Professional"}`}
                    className="text-3xl md:text-4xl lg:text-6xl font-bold text-muted-foreground"
                    hoverText="How can I help you.?"
                    delay={0}
                  />
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium">
                  What legal matter can I help you with?
                </h2>
                <p className="text-muted-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
                  I&apos;m your AI Legal Assistant, ready to help with
                  contracts, compliance, legal research, and professional
                  guidance. Choose a prompt below or ask your own question.
                </p>
              </div>

              {/* Legal Prompt Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {legalPrompts.map((prompt, index) => (
                  <Card
                    key={index}
                    className="bg-card/50 border-border hover:border-primary/50 transition-all cursor-pointer p-4 group hover:shadow-lg backdrop-blur-sm"
                    onClick={() => handlePromptClick(prompt.title)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                        <prompt.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">
                          {prompt.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {prompt.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Input Area */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border z-20">
          <div className="p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <Textarea
                  placeholder="Ask about legal matters, contracts, compliance..."
                  value={message}
                  onChange={handleMessageChange}
                  onKeyDown={handleKeyDown}
                  className="min-h-[100px] md:min-h-[120px] bg-card/50 border-border text-foreground placeholder-muted-foreground resize-none pr-20 pb-16 backdrop-blur-sm"
                />

                {/* Input Controls - Bottom Left */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground h-8 w-8"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground h-8 w-8"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>

                {/* Send Button and Character Count - Bottom Right */}
                <div className="absolute bottom-4 right-4 flex items-center space-x-3">
                  <span className="text-xs text-muted-foreground">
                    {charCount}/1000
                  </span>
                  <Button
                    size="icon"
                    onClick={handleSubmit}
                    className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Web Search Toggle */}
              <div className="flex justify-end mt-2">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-muted-foreground rounded-sm" />
                    <span>Search Web</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
