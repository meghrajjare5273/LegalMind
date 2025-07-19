"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FF6B35] via-[#F7931E] to-[#FF8A65]">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0">
        {/* Large curved shape */}
        <div className="absolute top-0 right-0 w-2/3 h-full">
          <svg viewBox="0 0 800 600" className="w-full h-full">
            <path
              d="M400,0 C600,100 700,300 600,500 C500,600 300,550 200,400 C100,250 200,50 400,0 Z"
              fill="url(#heroGradient)"
              opacity="0.8"
            />
            <defs>
              <linearGradient
                id="heroGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF8A65" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F7931E" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating dots pattern */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
              }}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-8"
        >
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold leading-tight"
            >
              Inspired by
              <br />
              <span className="text-white/90">Justice, Defined</span>
              <br />
              by Excellence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-white/80 leading-relaxed max-w-lg"
            >
              Harness the power of AI to streamline document analysis, mitigate
              risks, and accelerate your legal research. Welcome to the future
              of law.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/sign-up">
              <Button className="bg-white text-[#FF6B35] hover:bg-gray-50 font-semibold px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg bg-transparent backdrop-blur-sm group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 pt-8"
          >
            {[
              { number: "10K+", label: "Documents Analyzed" },
              { number: "95%", label: "Accuracy Rate" },
              { number: "24/7", label: "AI Availability" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-sm text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Floating Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-[#FF6B35] rounded-full"></div>
                <div className="w-3 h-3 bg-[#F7931E] rounded-full"></div>
                <div className="w-3 h-3 bg-white/50 rounded-full"></div>
              </div>
              <div className="text-white/60 text-sm">AI Assistant</div>
            </div>

            <div className="space-y-4">
              <div className="text-white font-semibold text-lg">
                Legal Document Analysis
              </div>
              <div className="space-y-3">
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-white/80 text-sm">
                    Contract Risk Assessment
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-white h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-white/80 text-sm">Clause Extraction</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-white h-2 rounded-full w-3/5"></div>
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-white/80 text-sm">Compliance Check</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-white h-2 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
