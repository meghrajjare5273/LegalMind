"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-teal-600" />
          AI Legal Assistant
        </h1>
        <p className="text-muted-foreground mt-2">
          Get instant legal insights and assistance powered by AI
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="relative overflow-hidden h-[600px] flex flex-col">
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={80}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Legal AI Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 bg-muted/30 rounded-lg p-4 mb-4 overflow-y-auto">
              <div className="text-center text-muted-foreground">
                Start a conversation with your AI legal assistant
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about legal matters..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
