/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { BorderTrail } from "@/components/ui/motion-primitives/border-trail";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Zod validation schemas
const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export default function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showBorderTrail, setShowBorderTrail] = useState(false);
  const [borderTrailVisible, setBorderTrailVisible] = useState(false);
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

  const handleBorderTrailComplete = () => {
    setShowBorderTrail(false);
    setTimeout(() => setBorderTrailVisible(false), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowBorderTrail(true);
    setBorderTrailVisible(true);
    setErrors({});

    // Validate with Zod first
    try {
      const validatedData = signInSchema.parse({ email, password });

      // Use authClient with onSuccess and onError callbacks
      await authClient.signIn.email(
        {
          email: validatedData.email,
          password: validatedData.password,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success!",
              description: "You have been signed in successfully.",
              variant: "success",
            });
          },
          onError: (ctx) => {
            console.error("Sign-in error:", ctx.error);
            toast({
              title: "Error",
              description:
                ctx.error?.message || "Failed to sign in. Please try again.",
              variant: "destructive",
            });
          },
        }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { email?: string; password?: string } = {};
        error.issues.forEach((err: any) => {
          if (err.path[0]) {
            formattedErrors[err.path as keyof typeof formattedErrors] =
              err.message;
          }
        });
        setErrors(formattedErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setShowBorderTrail(true);
    setBorderTrailVisible(true);

    await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "Signed in with Google successfully.",
            variant: "success",
          });
        },
        onError: (ctx) => {
          console.error("Google sign-in error:", ctx.error);
          toast({
            title: "Error",
            description: ctx.error?.message || "Failed to sign in with Google.",
            variant: "destructive",
          });
        },
      }
    );

    setIsLoading(false);
  };

  const handleMicrosoftSignIn = async () => {
    setIsLoading(true);
    setShowBorderTrail(true);
    setBorderTrailVisible(true);

    await authClient.signIn.social(
      {
        provider: "microsoft",
      },
      {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "Signed in with Microsoft successfully.",
            variant: "success",
          });
        },
        onError: (ctx) => {
          console.error("Microsoft sign-in error:", ctx.error);
          toast({
            title: "Error",
            description:
              ctx.error?.message || "Failed to sign in with Microsoft.",
            variant: "destructive",
          });
        },
      }
    );

    setIsLoading(false);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6 relative"
    >
      {/* Logo */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2d3d3d] to-[#768a8d] dark:from-[#5d6f73] dark:to-[#e6f1fa] bg-clip-text text-transparent">
          LegalMind
        </h1>
      </motion.div>

      {/* Welcome text */}
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-[#222929] dark:text-[#f0f8ff]">
          Welcome back
        </h2>
        <p className="text-[#545d5e] dark:text-[#c2c6c9]">
          Sign in to your account to continue with LegalMind and access your
          secure legal tools.
        </p>
      </motion.div>

      {/* Social login buttons */}
      <motion.div variants={itemVariants} className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-12 text-sm font-medium bg-[#f0f8ff]/50 dark:bg-[#32393a]/50 border-[#b4b8bb]/30 dark:border-[#818684]/30 hover:bg-[#e6f1fa]/70 dark:hover:bg-[#434b4d]/70 transition-colors"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <svg
            width="800px"
            height="800px"
            viewBox="-0.5 0 48 48"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="Icons"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                <g id="Google" transform="translate(401.000000, 860.000000)">
                  <path
                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                    id="Fill-1"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                    id="Fill-2"
                    fill="#EB4335"
                  ></path>
                  <path
                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                    id="Fill-3"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                    id="Fill-4"
                    fill="#4285F4"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 text-sm font-medium bg-[#f0f8ff]/50 dark:bg-[#32393a]/50 border-[#b4b8bb]/30 dark:border-[#818684]/30 hover:bg-[#e6f1fa]/70 dark:hover:bg-[#434b4d]/70 transition-colors"
          onClick={handleMicrosoftSignIn}
          disabled={isLoading}
        >
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path fill="#F35325" d="M1 1h6.5v6.5H1V1z" />
            <path fill="#81BC06" d="M8.5 1H15v6.5H8.5V1z" />
            <path fill="#05A6F0" d="M1 8.5h6.5V15H1V8.5z" />
            <path fill="#FFBA08" d="M8.5 8.5H15V15H8.5V8.5z" />
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
          <span className="px-2 bg-or-light backdrop-blur-3xl text-[#545d5e] dark:text-white">
            OR
          </span>
        </div>
      </motion.div>

      {/* Email form */}
      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
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

        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9ea3a7] w-5 h-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={`h-12 pl-10 pr-10 bg-[#f0f8ff]/30 dark:bg-[#32393a]/30 border-[#b4b8bb]/30 dark:border-[#818684]/30 transition-colors focus:ring-2  focus:ring-[#2d3d3d]/20 dark:focus:ring-[#5d6f73]/20 ${
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
          {borderTrailVisible && (
            <BorderTrail
              className={cn(
                "bg-gradient-to-r from-[#2d3d3d] via-[#768a8d] to-[#2d3d3d] dark:from-[#5d6f73] dark:via-[#bdc9c4] dark:to-[#5d6f73] transition-opacity duration-300",
                showBorderTrail ? "opacity-100" : "opacity-0"
              )}
              size={120}
              transition={{
                ease: [0, 0.5, 0.8, 0.5],
                duration: 2,
                repeat: 1,
              }}
              onAnimationComplete={handleBorderTrailComplete}
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
              "Sign in"
            )}
          </Button>
        </div>
      </motion.form>

      {/* Forgot password */}
      <motion.div variants={itemVariants} className="text-center">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-[#2d3d3d] hover:text-[#768a8d] dark:text-[#bdc9c4] dark:hover:text-[#e6f1fa] transition-colors"
        >
          Forgot your password?
        </Link>
      </motion.div>

      {/* Sign up link */}
      <motion.div variants={itemVariants} className="text-center">
        <p className="text-sm text-[#545d5e] dark:text-[#c2c6c9]">
          Don&apos;t have an account?{" "}
          <button
            onClick={onSwitchToSignUp}
            className="font-medium text-[#2d3d3d] hover:text-[#768a8d] dark:text-[#bdc9c4] dark:hover:text-[#e6f1fa] transition-colors hover:cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </motion.div>

      {/* Terms */}
      <motion.div variants={itemVariants} className="text-center">
        <p className="text-xs text-[#9ea3a7] dark:text-[#818684]">
          By signing in, you agree to our{" "}
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
