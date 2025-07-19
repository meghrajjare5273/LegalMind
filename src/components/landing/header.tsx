"use client";
import { motion } from "framer-motion";
import { Search, Scale, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-lg flex items-center justify-center">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">LegalMind</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-[#FF6B35] transition-colors text-sm font-medium"
          >
            Features
          </a>
          <a
            href="#about"
            className="text-gray-600 hover:text-[#FF6B35] transition-colors text-sm font-medium"
          >
            About
          </a>
          <a
            href="#services"
            className="text-gray-600 hover:text-[#FF6B35] transition-colors text-sm font-medium"
          >
            Services
          </a>
          <a
            href="/chat"
            className="text-gray-600 hover:text-[#FF6B35] transition-colors text-sm font-medium"
          >
            AI Chat
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Search className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#FF6B35] transition-colors" />
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-[#FF6B35] font-medium"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white hover:shadow-lg transition-all duration-300 rounded-full px-6">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <div className="container mx-auto px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-gray-600 hover:text-[#FF6B35] transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-[#FF6B35] transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="text-gray-600 hover:text-[#FF6B35] transition-colors"
              >
                Services
              </a>
              <a
                href="/chat"
                className="text-gray-600 hover:text-[#FF6B35] transition-colors"
              >
                AI Chat
              </a>
            </nav>
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-[#FF6B35]"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
