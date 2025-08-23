"use client";

import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Menu,
  Home,
  MessageSquare,
  FileText,
  BookOpen,
  BarChart3,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-ds-surface">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-40 bg-ds-surface/80 backdrop-blur-md border-b border-ds-border shadow-sm"
        >
          <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-ds-surface-soft"
                onClick={() => setSidebarOpen((s) => !s)}
              >
                <Menu className="w-5 h-5 text-ds-ink" />
              </Button>
              <Link href="/" className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 bg-ds-accent rounded-lg flex items-center justify-center"
                >
                  <span className="text-ds-surface font-bold text-sm">L</span>
                </motion.div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xl tracking-tight text-ds-gold">
                    Legal
                  </span>
                  <span className="font-bold text-xl tracking-tight text-ds-ink">
                    Mind
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-ds-surface-soft hover-glow"
                >
                  <Bell className="w-5 h-5 text-ds-ink" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-ds-orange rounded-full"
                  />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Avatar className="h-9 w-9 ring-2 ring-ds-gold/30">
                  <AvatarImage src="/default-avatar.png" />
                  <AvatarFallback className="bg-ds-gold text-ds-surface">
                    U
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <div className="mx-auto max-w-7xl flex">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ x: -264, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -264, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-64 border-r border-ds-border bg-ds-surface-soft/50 backdrop-blur-sm fixed lg:sticky top-16 h-[calc(100vh-4rem)] z-30 lg:z-auto"
              >
                <nav className="p-6 space-y-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="text-xs font-semibold text-ds-gold uppercase tracking-wider mb-3">
                      Overview
                    </div>
                    <div className="space-y-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-ds-gold text-ds-surface shadow-sm hover-lift transition-all"
                      >
                        <Home className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/analytics"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-ds-ink hover:bg-ds-surface hover-lift transition-all"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-xs font-semibold text-ds-gold uppercase tracking-wider mb-3">
                      AI Services
                    </div>
                    <div className="space-y-1">
                      <Link
                        href="/services/chat"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-ds-ink hover:bg-ds-teal/10 hover:text-ds-teal-700 hover-lift transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        AI Chat
                      </Link>
                      <Link
                        href="/services/contract-review"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-ds-ink hover:bg-ds-orange/10 hover:text-ds-orange-700 hover-lift transition-all"
                      >
                        <FileText className="w-4 h-4" />
                        Contract Review
                      </Link>
                      <Link
                        href="/services/research"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-ds-ink hover:bg-ds-teal/10 hover:text-ds-teal-700 hover-lift transition-all"
                      >
                        <BookOpen className="w-4 h-4" />
                        Legal Research
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4 border-t border-ds-border"
                  >
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-ds-ink hover:bg-ds-surface hover-lift transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                  </motion.div>
                </nav>
              </motion.aside>
            )}
          </AnimatePresence>

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 p-6 lg:p-8 lg:ml-0 ml-0"
          >
            {children}
          </motion.main>
        </div>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ds-ink/20 backdrop-blur-sm z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
