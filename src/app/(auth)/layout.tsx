"use client";
import type React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

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
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-gradient-to-br from-[#f0f8ff] to-[#e6f1fa] dark:from-[#141818] dark:to-[#222929]">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23768a8d' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <div className="relative flex min-h-screen">
          {/* Left side - Image/Branding */}
          <motion.div
            className="hidden lg:flex lg:flex-1 relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            role="img"
            aria-label="Legal management platform branding"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2d3d3d]/20 to-[#768a8d]/20 z-10" />
            <Image
              src="/pexels-francesco-ungaro-998641.jpg"
              alt="Legal management platform branding"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
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
            </div>
          </motion.div>

          {/* Right side - Auth Form */}
          <motion.div
            className="flex-1 lg:flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Backdrop blur layer */}
            <div className="absolute inset-0 bg-[#f0f8ff]/30 dark:bg-[#141818]/30 backdrop-blur-sm" />

            <div className="w-full max-w-md relative z-10">{children}</div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#768a8d]/5 dark:bg-[#bdc9c4]/5 rounded-full filter blur-xl hidden lg:block"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#2d3d3d]/5 dark:bg-[#5d6f73]/5 rounded-full filter blur-xl hidden lg:block"
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [180, 90, 0],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              repeatType: "reverse",
            }}
          />
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
