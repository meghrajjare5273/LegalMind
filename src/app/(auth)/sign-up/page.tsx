/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
// import { signUp } from "@/lib/auth-client";
import { Mail, Chrome } from "lucide-react";
import { authClient } from "@/lib/auth-client";

// Zod validation schema
const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

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
    setErrors({});

    try {
      const validatedData = signUpSchema.parse({ email });

      // Better-auth email signup integration
      await authClient.signUp.email({
        name: "M",
        email: validatedData.email,
        password: "l",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { email?: string } = {};
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

  const handleGoogleSignUp = async () => {
    try {
      //   await signUp.social({
      //     provider: "google",
      //   });
    } catch (error) {
      console.error("Google sign-up error:", error);
    }
  };

  const handleMicrosoftSignUp = async () => {
    try {
      //   await signUp.social({
      //     provider: "microsoft",
      //   });
    } catch (error) {
      console.error("Microsoft sign-up error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md space-y-6"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LegalMind
          </h1>
        </motion.div>

        {/* Welcome text */}
        <motion.div variants={itemVariants} className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome to LegalMind
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            LegalMind is a fast, simple and secure way to manage legal data.
            With it, you can protect your privacy and well being anytime and
            anywhere.
          </p>
        </motion.div>

        {/* Social login buttons */}
        <motion.div variants={itemVariants} className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={handleGoogleSignUp}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={handleMicrosoftSignUp}
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
            <span className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
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
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-12 pl-10 transition-colors ${
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

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              "Continue with email"
            )}
          </Button>
        </motion.form>

        {/* Sign in link */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>

        {/* Terms */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="underline hover:text-gray-700 dark:hover:text-gray-300"
            >
              Terms of services
            </Link>{" "}
            &{" "}
            <Link
              href="/privacy"
              className="underline hover:text-gray-700 dark:hover:text-gray-300"
            >
              Privacy policy
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
