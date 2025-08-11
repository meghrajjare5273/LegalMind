"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RecovaBrand from "./recova-brand";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

interface AuthFormProps {
  mode: "signin" | "signup";
  onModeChange: (mode: "signin" | "signup") => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onModeChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Integrate with better-auth
    console.log(`${mode} attempt:`, formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleSocialAuth = async (provider: "google" | "microsoft") => {
    // TODO: Integrate with better-auth social providers
    console.log(`${provider} auth attempt`);
  };

  return (
    <div
      className="w-full max-w-md mx-auto h-full flex flex-col justify-center"
      style={{ minHeight: "0" }} // Allow shrinking
    >
      {/* Brand Header - Reduced spacing */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-4"
      >
        <RecovaBrand />
      </motion.div>

      {/* Welcome Section - Reduced spacing */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-2 text-center mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {mode === "signin" ? "Welcome back" : "Welcome to Recova"}
        </h1>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {mode === "signin"
            ? "Sign in to your account to continue your legal work."
            : "Recova is a fast, simple and secure way to recover data. With it, you can protect your privacy and well being anytime and anywhere."}
        </p>
      </motion.div>

      {/* Social Login Buttons - Reduced spacing */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-2 mb-4"
      >
        <Button
          variant="social"
          size="lg"
          className="w-full h-10 text-sm font-medium"
          onClick={() => handleSocialAuth("google")}
          disabled={isLoading}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        <Button
          variant="social"
          size="lg"
          className="w-full h-10 text-sm font-medium"
          onClick={() => handleSocialAuth("microsoft")}
          disabled={isLoading}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M11.4 24H12.6V12.6H24V11.4H12.6V0H11.4V11.4H0V12.6H11.4V24Z"
              fill="#00BCF2"
            />
            <path d="M11.4 11.4H0V0H11.4V11.4Z" fill="#0078D4" />
            <path d="M24 11.4H12.6V0H24V11.4Z" fill="#00BCF2" />
            <path d="M11.4 24H0V12.6H11.4V24Z" fill="#40E0D0" />
            <path d="M24 24H12.6V12.6H24V24Z" fill="#FFB900" />
          </svg>
          Continue with Microsoft
        </Button>
      </motion.div>

      {/* Divider - Reduced spacing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative mb-4"
      >
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-muted-foreground">Or</span>
        </div>
      </motion.div>

      {/* Form - Reduced spacing */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-3 mb-4"
      >
        {mode === "signup" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1"
          >
            <Label htmlFor="name" className="text-sm">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-10 text-sm bg-gray-50 border-gray-200 focus:bg-white pl-10"
                required={mode === "signup"}
              />
            </div>
          </motion.div>
        )}

        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm">
            Email address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="email"
              type="email"
              placeholder="john.doe@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="h-10 text-sm bg-gray-50 border-gray-200 focus:bg-white pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-sm">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={
                mode === "signin"
                  ? "Enter your password"
                  : "Create a strong password"
              }
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="h-10 text-sm bg-gray-50 border-gray-200 focus:bg-white pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="ctaSoft"
          size="lg"
          className="w-full h-10 text-sm font-medium"
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
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
          ) : mode === "signin" ? (
            "Sign in"
          ) : (
            "Continue with email"
          )}
        </Button>
      </motion.form>

      {/* Mode Toggle - Reduced spacing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center mb-3"
      >
        <span className="text-muted-foreground text-sm">
          {mode === "signin"
            ? "Don't have an account? "
            : "Already have an account? "}
        </span>
        <Button
          variant="link"
          className="p-0 h-auto font-medium text-primary hover:text-primary/80 text-sm"
          onClick={() => onModeChange(mode === "signin" ? "signup" : "signin")}
        >
          {mode === "signin" ? "Sign up" : "Sign in"}
        </Button>
      </motion.div>

      {/* Terms - Only for signup, reduced spacing */}
      {mode === "signup" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-xs text-muted-foreground"
        >
          By signing up, you agree to our{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-xs text-muted-foreground underline hover:text-foreground"
          >
            Terms of services
          </Button>{" "}
          &{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-xs text-muted-foreground underline hover:text-foreground"
          >
            Privacy policy
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default AuthForm;
