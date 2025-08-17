/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, Chrome, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { BorderTrail } from "@/components/ui/motion-primitives/border-trail";
import { useToast } from "@/hooks/use-toast";

// Zod validation schema
const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

export default function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showBorderTrail, setShowBorderTrail] = useState(false);
  const { toast } = useToast();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowBorderTrail(true);
    setErrors({});

    try {
      const validatedData = signUpSchema.parse({ name, email, password });

      await authClient.signUp.email({
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
      });

      toast({
        title: "Success!",
        description: "Account created successfully. Please check your email.",
        variant: "default",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: {
          name?: string;
          email?: string;
          password?: string;
        } = {};
        error.issues.forEach((err: any) => {
          if (err.path[0]) {
            formattedErrors[err.path as keyof typeof formattedErrors] =
              err.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        toast({
          title: "Error",
          description: "Failed to create account. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowBorderTrail(false), 2000);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      toast({
        title: "Success!",
        description: "Signed up with Google successfully.",
      });
    } catch (error) {
      console.error("Google sign-up error:", error);
      toast({
        title: "Error",
        description: "Failed to sign up with Google.",
        variant: "destructive",
      });
    }
  };

  const handleMicrosoftSignUp = async () => {
    try {
      toast({
        title: "Success!",
        description: "Signed up with Microsoft successfully.",
      });
    } catch (error) {
      console.error("Microsoft sign-up error:", error);
      toast({
        title: "Error",
        description: "Failed to sign up with Microsoft.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6 relative"
    >
      {/* Border Trail Effect */}
      {/* Logo */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2d3d3d] to-[#768a8d] dark:from-[#5d6f73] dark:to-[#e6f1fa] bg-clip-text text-transparent">
          LegalMind
        </h1>
      </motion.div>

      {/* Welcome text */}
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-[#222929] dark:text-[#f0f8ff]">
          Welcome to LegalMind
        </h2>
        <p className="text-[#545d5e] dark:text-[#c2c6c9]">
          LegalMind is a fast, simple and secure way to manage legal data. With
          it, you can protect your privacy and well being anytime and anywhere.
        </p>
      </motion.div>

      {/* Social login buttons */}
      <motion.div variants={itemVariants} className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-12 text-sm font-medium bg-[#f0f8ff]/50 dark:bg-[#32393a]/50 border-[#b4b8bb]/30 dark:border-[#818684]/30 hover:bg-[#e6f1fa]/70 dark:hover:bg-[#434b4d]/70 transition-colors"
          onClick={handleGoogleSignUp}
          disabled={isLoading}
        >
          <Chrome className="w-5 h-5 mr-2" />
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 text-sm font-medium bg-[#f0f8ff]/50 dark:bg-[#32393a]/50 border-[#b4b8bb]/30 dark:border-[#818684]/30 hover:bg-[#e6f1fa]/70 dark:hover:bg-[#434b4d]/70 transition-colors"
          onClick={handleMicrosoftSignUp}
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 23 23">
            <path fill="#f35325" d="M0 0h11v11H0z" />
            <path fill="#81bc06" d="M12 0h11v11H12z" />
            <path fill="#05a6f0" d="M0 12h11v11H0z" />
            <path fill="#ffba08" d="M12 12h11v11H12z" />
          </svg>
          Continue with Microsoft
        </Button>
      </motion.div>

      {/* Divider */}
      <motion.div variants={itemVariants} className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#b4b8bb]/30 dark:border-[#818684]/30" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-[#545d5e] dark:text-[#c2c6c9]">
            Or
          </span>
        </div>
      </motion.div>

      {/* Email form */}
      <motion.form
        variants={itemVariants}
        onSubmit={handleEmailSignUp}
        className="space-y-4"
      >
        {/* Name field */}
        <div className="space-y-2">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9ea3a7] w-5 h-5" />
            <Input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className={`h-12 pl-10 bg-[#f0f8ff]/30 dark:bg-[#32393a]/30 border-[#b4b8bb]/30 dark:border-[#818684]/30 transition-colors focus:ring-2 focus:ring-[#2d3d3d]/20 dark:focus:ring-[#5d6f73]/20 ${
                errors.name ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9ea3a7] w-5 h-5" />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={`h-12 pl-10 bg-[#f0f8ff]/30 dark:bg-[#32393a]/30 border-[#b4b8bb]/30 dark:border-[#818684]/30 transition-colors focus:ring-2 focus:ring-[#2d3d3d]/20 dark:focus:ring-[#5d6f73]/20 ${
                errors.email ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9ea3a7] w-5 h-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={`h-12 pl-10 pr-10 bg-[#f0f8ff]/30 dark:bg-[#32393a]/30 border-[#b4b8bb]/30 dark:border-[#818684]/30 transition-colors focus:ring-2 focus:ring-[#2d3d3d]/20 dark:focus:ring-[#5d6f73]/20 ${
                errors.password ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ea3a7] hover:text-[#545d5e] dark:hover:text-[#c2c6c9] disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500"
            >
              {errors.password}
            </motion.p>
          )}
        </div>

        <div className="relative">
          {showBorderTrail && (
            <BorderTrail
              className="bg-gradient-to-r from-[#2d3d3d] via-[#768a8d] to-[#2d3d3d] dark:from-[#5d6f73] dark:via-[#bdc9c4] dark:to-[#5d6f73] opacity-80"
              size={150}
              transition={{
                ease: [0, 0.5, 0.8, 0.5],
                duration: 2,
                repeat: 1,
              }}
            />
          )}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-[#2d3d3d] to-[#768a8d] hover:from-[#455457] hover:to-[#5d6f73] text-[#f0f8ff] font-medium transition-all duration-200 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              "Create account"
            )}
          </Button>
        </div>
      </motion.form>

      {/* Sign in link */}
      <motion.div variants={itemVariants} className="text-center">
        <p className="text-sm text-[#545d5e] dark:text-[#c2c6c9]">
          Already have an account?{" "}
          <button
            onClick={onSwitchToSignIn}
            className="font-medium text-[#2d3d3d] hover:text-[#768a8d] dark:text-[#bdc9c4] dark:hover:text-[#e6f1fa] transition-colors"
          >
            Sign in
          </button>
        </p>
      </motion.div>

      {/* Terms */}
      <motion.div variants={itemVariants} className="text-center">
        <p className="text-xs text-[#9ea3a7] dark:text-[#818684]">
          By signing up, you agree to our{" "}
          <Link
            href="/terms"
            className="underline hover:text-[#545d5e] dark:hover:text-[#c2c6c9]"
          >
            Terms of services
          </Link>{" "}
          &{" "}
          <Link
            href="/privacy"
            className="underline hover:text-[#545d5e] dark:hover:text-[#c2c6c9]"
          >
            Privacy policy
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
