"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Loader2, Scale, FileText, Users, Gavel } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

export default function ChatPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = message;

    try {
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMessage,
          sessionId: null, // No session ID means create new session
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to the new session
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
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Constitutional Law",
      question:
        "What are the fundamental rights under the Indian Constitution?",
      description: "Understand your constitutional rights",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Corporate Law",
      question: "What are the compliance requirements for private companies?",
      description: "Corporate governance and compliance",
    },
    {
      icon: <Gavel className="w-5 h-5" />,
      title: "Criminal Law",
      question: "What are the stages of criminal proceedings in India?",
      description: "Criminal justice process overview",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Spotlight />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-32">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Avatar className="h-16 w-16 bg-primary/10">
                <AvatarFallback className="text-2xl font-bold text-primary">
                  LM
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Welcome to LegalMind AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your intelligent legal assistant powered by AI. Ask questions
              about Indian law, contracts, compliance, and get expert guidance
              instantly.
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-12">
            <Card className="p-6 bg-background/80 backdrop-blur-sm border-border/50">
              <div className="flex gap-4">
                <Textarea
                  placeholder="Ask about legal matters, contracts, compliance, or any legal question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  className="min-h-[120px] resize-none text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!message.trim() || isLoading}
                  size="lg"
                  className="self-end px-6"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Press Enter to send, Shift+Enter for new line. This AI assistant
                provides general legal information, not professional legal
                advice.
              </p>
            </Card>
          </div>

          {/* Suggested Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedQuestions.map((item, index) => (
              <Card
                key={index}
                className="p-6 cursor-pointer hover:bg-accent/50 transition-colors bg-background/60 backdrop-blur-sm border-border/50"
                onClick={() => setMessage(item.question)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      &quot;{item.question}&quot;
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 text-center">
            <Card className="p-4 bg-background/60 backdrop-blur-sm border-border/50">
              <p className="text-sm text-muted-foreground">
                <strong>Disclaimer:</strong> LegalMind AI provides general legal
                information and should not be considered as professional legal
                advice. Always consult with a qualified lawyer for specific
                legal matters.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
