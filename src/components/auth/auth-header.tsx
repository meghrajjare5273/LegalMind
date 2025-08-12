"use client";

import { motion } from "framer-motion";

interface AuthHeaderProps {
  mode: "sign-in" | "sign-up";
}

export default function AuthHeader({ mode }: AuthHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-2 text-center mb-6"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
        {mode === "sign-in" ? "Welcome back" : "Welcome to LegalMind"}
      </h1>
      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
        {mode === "sign-in"
          ? "Sign in to your account to continue your legal work."
          : "Transform your legal practice with AI-powered document analysis and intelligent research."}
      </p>
    </motion.div>
  );
}
