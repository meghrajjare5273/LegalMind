"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Scale,
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  Chrome,
  Apple,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });
      // Redirect will be handled by the auth client
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "apple") => {
    try {
      if (provider === "google") {
        await authClient.signIn.social({ provider: "google" });
      }
      // Apple sign-in would be implemented similarly
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2536] via-[#03366D] to-[#0A2536] flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#DAF6F5]/30 to-[#B8F2EF]/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#DAF6F5]/25 to-[#B8F2EF]/15 rounded-full blur-3xl"
          />

          {/* Floating geometric shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
              }}
              className="absolute w-4 h-4 border border-[#DAF6F5]/30 rounded transform rotate-45"
              style={{
                top: `${10 + i * 12}%`,
                right: `${5 + i * 8}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#DAF6F5] to-[#B8F2EF] rounded-2xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-[#03366D]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">LegalMind</h1>
                <p className="text-[#DAF6F5]/80">AI Legal Assistant</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight">
                Welcome back to the future of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF]">
                  legal intelligence
                </span>
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Access your AI-powered legal assistant and continue your journey
                towards smarter legal solutions.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "AI-powered contract analysis",
                "Instant legal research",
                "24/7 legal guidance",
                "Secure & confidential",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-[#DAF6F5] rounded-full" />
                  <span className="text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Back to website link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-[#DAF6F5] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to website
            </Link>
          </div>

          <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome back
              </h2>
              <p className="text-white/70">
                Sign in to access your legal AI assistant
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-12 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-[#DAF6F5] focus:ring-[#DAF6F5]/20"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-[#DAF6F5] focus:ring-[#DAF6F5]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      setFormData({ ...formData, rememberMe: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#DAF6F5] focus:ring-[#DAF6F5]/20"
                  />
                  <span className="text-white/70 text-sm">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[#DAF6F5] hover:text-white text-sm transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF] hover:from-[#B8F2EF] hover:to-[#DAF6F5] text-[#0A2536] font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-[#0A2536]/30 border-t-[#0A2536] rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-black/30 text-white/70">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  onClick={() => handleSocialSignIn("google")}
                  className="bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Google
                </Button>
                <Button
                  type="button"
                  onClick={() => handleSocialSignIn("apple")}
                  className="bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <Apple className="w-5 h-5 mr-2" />
                  Apple
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/70">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-[#DAF6F5] hover:text-white font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
