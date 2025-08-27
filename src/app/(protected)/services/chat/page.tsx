/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Scale, FileText, Users, Gavel } from "lucide-react";
import { AIChatInput } from "@/components/ui/ai-chat-input";
import { TextEffect } from "@/components/ui/motion-primitives/text-effect";
import { TextRoll } from "@/components/ui/motion-primitives/text-roll";
import { useSession } from "@/contexts/session-context";
import { motion } from "framer-motion";

export default function ChatPage() {
  const router = useRouter();
  const { user, loading } = useSession();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const firstName = user?.name?.split(" ")[0] || "Counsel";

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: message,
          sessionId: null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.sessionId) {
          router.push(`/services/chat/${data.sessionId}`);
        }
      }
    } catch (error) {
      console.error("Error starting chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    {
      icon: <Scale className="w-5 h-5" />,
      title: "Contract Law",
      question: "What are the key provisions of the Indian Contract Act?",
      description: "Learn about essential contract elements",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Constitutional Law",
      question:
        "What are the fundamental rights under the Indian Constitution?",
      description: "Understand your constitutional rights",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Corporate Law",
      question: "What are the compliance requirements for private companies?",
      description: "Corporate governance and compliance",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Gavel className="w-5 h-5" />,
      title: "Criminal Law",
      question: "What are the stages of criminal proceedings in India?",
      description: "Criminal justice process overview",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-24">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-4" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Header Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 max-w-4xl"
        >
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <TextRoll duration={0.8} getEnterDelay={(i: any) => i * 0.05}>
                {`Welcome back, ${firstName}`}
              </TextRoll>
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <TextEffect
                preset="fade-in-blur"
                per="word"
                speedReveal={0.3}
                delay={1.5}
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
              >
                Your intelligent legal assistant powered by AI. Ask questions
                about Indian law, contracts, compliance, and get expert guidance
                instantly.
              </TextEffect>
            </motion.div>
          </div>
        </motion.div>

        {/* Modern Chat Input */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full max-w-4xl px-4 mb-12"
        >
          <AIChatInput
            value={message}
            onChange={setMessage}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </motion.div>

        {/* Suggested Questions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full max-w-4xl px-4"
        >
          <h2 className="text-xl font-semibold mb-6 text-center text-muted-foreground">
            Popular legal topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedQuestions.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                onClick={() => setMessage(item.question)}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 text-left overflow-hidden hover:scale-105"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground/80 italic">
                    &quot;{item.question}&quot;
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 text-center max-w-3xl px-4"
        >
          <div className="p-4 rounded-xl bg-muted/30 backdrop-blur-sm border border-border/30">
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> LegalMind AI provides general legal
              information and should not be considered as professional legal
              advice. Always consult with a qualified lawyer for specific legal
              matters.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
