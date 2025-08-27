/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { Scale, FileText, Users, Gavel } from "lucide-react";
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

  // const suggestedQuestions = [
  //   {
  //     icon: <Scale className="w-5 h-5" />,
  //     title: "Contract Law",
  //     question: "What are the key provisions of the Indian Contract Act?",
  //     description: "Learn about essential contract elements",
  //     gradient: "from-blue-500 to-cyan-500",
  //   },
  //   {
  //     icon: <FileText className="w-5 h-5" />,
  //     title: "Constitutional Law",
  //     question:
  //       "What are the fundamental rights under the Indian Constitution?",
  //     description: "Understand your constitutional rights",
  //     gradient: "from-purple-500 to-pink-500",
  //   },
  //   {
  //     icon: <Users className="w-5 h-5" />,
  //     title: "Corporate Law",
  //     question: "What are the compliance requirements for private companies?",
  //     description: "Corporate governance and compliance",
  //     gradient: "from-green-500 to-emerald-500",
  //   },
  //   {
  //     icon: <Gavel className="w-5 h-5" />,
  //     title: "Criminal Law",
  //     question: "What are the stages of criminal proceedings in India?",
  //     description: "Criminal justice process overview",
  //     gradient: "from-orange-500 to-red-500",
  //   },
  // ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 pb-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-4" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-16 pb-6 items-center justify-center">
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

        {/* Suggested Questions Grid
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full max-w-6xl px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestedQuestions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group cursor-pointer"
                onClick={() => setMessage(item.question)}
              >
                <div className="p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}
