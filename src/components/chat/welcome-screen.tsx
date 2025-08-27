"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  Sparkles,
  Lightbulb,
  FileText,
  ChevronRight,
  Scale,
  Shield,
} from "lucide-react";

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
  userName?: string;
}

export function WelcomeScreen({
  onSuggestionClick,
  userName,
}: WelcomeScreenProps) {
  const suggestions = [
    {
      title: "Contract Analysis",
      description: "Review and analyze legal contracts",
      icon: FileText,
      prompt: "Help me analyze a contract for potential risks and key terms",
    },
    {
      title: "Legal Research",
      description: "Research case law and precedents",
      icon: Scale,
      prompt: "I need help researching legal precedents for my case",
    },
    {
      title: "Compliance Check",
      description: "Verify regulatory compliance",
      icon: Shield,
      prompt: "What compliance requirements should I be aware of?",
    },
    {
      title: "Document Drafting",
      description: "Help create legal documents",
      icon: Lightbulb,
      prompt: "Help me draft a legal document template",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {userName ? `Welcome back, ${userName}` : "Welcome to LegalMind AI"}
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your AI-powered legal assistant is here to help with contracts,
          research, compliance, and more.
        </motion.p>
      </motion.div>

      <motion.div
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <Button
              variant="outline"
              className="w-full h-auto p-6 flex items-start gap-4 hover:bg-accent/50 transition-all duration-200 group"
              onClick={() => onSuggestionClick(suggestion.prompt)}
            >
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <suggestion.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {suggestion.description}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p>
          Start by typing your question or selecting one of the suggestions
          above
        </p>
      </motion.div>
    </div>
  );
}
