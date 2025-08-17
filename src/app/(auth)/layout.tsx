"use client";
import type React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Background Pattern - Fixed URL encoding */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative flex min-h-screen">
        {/* Left side - Image/Branding */}
        <motion.div
          className="hidden lg:flex lg:flex-1 relative overflow-visible"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          role="img"
          aria-label="Legal management platform branding"
        >
          <Image
            src="/pexels-francesco-ungaro-998641.jpg"
            alt="Legal management platform branding"
            fill
            style={{ objectFit: "initial" }}
            priority
          />
        </motion.div>

        {/* Right side - Auth Form - Fixed backdrop blur positioning */}
        <motion.div
          className="flex-1 lg:flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Backdrop blur layer */}
          <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm" />

          <div className="w-full max-w-md relative z-10">{children}</div>
        </motion.div>
      </div>

      {/* Floating elements - Improved performance and reduced motion */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-xl hidden lg:block"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "reverse",
          }}
        /> */}
        {/* <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-xl hidden lg:block"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [180, 90, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "reverse",
          }}
        /> */}
      </div>
    </div>
  );
}
