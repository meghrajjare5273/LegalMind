"use client";
import type React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
// <CHANGE> Import Aurora Background component
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // disableTransitionOnChange
    >
      {/* <CHANGE> Replace the gradient background with Aurora Background */}
      <AuroraBackground className="h-screen overflow-hidden dark:text-white">
        <div className="relative flex h-full w-full">
          {/* Left side - Image/Branding */}
          <motion.div
            className="hidden lg:flex lg:flex-1 relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            role="img"
            aria-label="Legal management platform branding"
          >
            <div className="absolute inset-0 z-10" />
            <Image
              src="/pexels-sora-shimazaki-5668882.jpg"
              alt="Legal management platform branding"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            {/* <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-4xl font-bold mb-4"
                >
                  Secure Legal Management
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-lg opacity-90"
                >
                  Protect your privacy and manage legal data with confidence
                </motion.p>
              </div>
            </div> */}
          </motion.div>

          {/* Right side - Auth Form */}
          <motion.div
            className="flex-1 lg:flex-1 flex flex-col px-4 sm:px-6 lg:px-8 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* <CHANGE> Enhanced backdrop with better opacity for aurora effect */}
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md" />

            <div className="flex-1 flex items-center justify-center relative z-10 py-8">
              <div className="w-full max-w-md h-full overflow-y-hidden overflow-x-hidden">
                <div className="min-h-full flex items-center justify-center py-4">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <Toaster />
      </AuroraBackground>
    </ThemeProvider>
  );
}
