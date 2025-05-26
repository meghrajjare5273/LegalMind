"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Star,
  Users,
  Shield,
  Zap,
  Award,
  CheckCircle,
} from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";



export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A2536] via-[#03366D] to-[#0A2536]"
    >
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary floating orb */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#DAF6F5]/30 to-[#B8F2EF]/20 rounded-full blur-3xl"
        />

        {/* Secondary floating orb */}
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#DAF6F5]/25 to-[#B8F2EF]/15 rounded-full blur-3xl"
        />

        {/* Additional accent orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 3,
            }}
            className={`absolute w-32 h-32 bg-[#DAF6F5]/10 rounded-full blur-2xl`}
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
            }}
          />
        ))}

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 opacity-20">
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
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center space-y-8">
            {/* Enhanced Badge with multiple elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[#DAF6F5] text-sm font-medium shadow-lg">
                <Shield className="w-4 h-4 mr-2" />
                AI-Powered Legal Intelligence
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-[#DAF6F5] rounded-full ml-2"
                />
              </div>

              <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-medium">
                <Zap className="w-3 h-3 mr-1" />
                Instant Results
              </div>
            </motion.div>

            {/* Enhanced Main Heading with better typography */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight"
            >
              Legal{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAF6F5] via-[#B8F2EF] to-[#DAF6F5] animate-pulse">
                  brilliance
                </span>
                <motion.div
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 2, delay: 1 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF] rounded-full"
                />
              </span>
              <br />
              meets{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8F2EF] to-[#DAF6F5]">
                AI precision
              </span>
            </motion.h1>

            {/* Enhanced Subtitle with better hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
                Transform complex legal challenges into clear, actionable
                insights. Upload documents, ask questions, and receive
                expert-level analysis
                <span className="text-[#DAF6F5] font-medium">
                  {" "}
                  in seconds, not hours.
                </span>
              </p>

              {/* Key benefits */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-white/70"
              >
                {[
                  "Contract Analysis",
                  "Legal Research",
                  "Document Review",
                  "Compliance Check",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 text-[#DAF6F5] mr-2" />
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Rating Badge with more social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <div className="inline-flex items-center px-6 py-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#DAF6F5] fill-current"
                    />
                  ))}
                  <span className="ml-2 font-semibold">4.9/5</span>
                </div>
                <div className="w-px h-4 bg-white/20 mr-4" />
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">15K+ legal professionals</span>
                </div>
              </div>

              <div className="inline-flex items-center px-4 py-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/30 rounded-full text-amber-300 text-sm">
                <Award className="w-4 h-4 mr-2" />
                #1 AI Legal Tool 2024
              </div>
            </motion.div>

            {/* Enhanced CTA Button with better effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF] hover:from-[#B8F2EF] hover:to-[#DAF6F5] text-[#0A2536] px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                  />
                  <span className="relative flex items-center">
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mr-3 text-2xl"
                    >
                      ⚡
                    </motion.span>
                    Start Your Legal Analysis
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>

                <Button
                  size="lg"
                  className="bg-transparent border-2 border-white/30 hover:border-[#DAF6F5] text-white px-8 py-6 text-lg font-medium rounded-full transition-all duration-300 hover:bg-white/5"
                >
                  Watch Demo
                </Button>
              </div>

              <p className="mt-4 text-sm text-white/60">
                No credit card required • Free 7-day trial • Cancel anytime
              </p>
            </motion.div>

            {/* Enhanced Floating Interface Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="relative mt-16 max-w-5xl mx-auto"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#DAF6F5]/20 to-[#B8F2EF]/20 rounded-3xl blur-xl" />

                <div className="relative bg-black/50 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="flex items-center mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-white/80 text-lg font-medium">
                        LegalMind AI • Contract Analyzer
                      </span>
                    </div>
                    <div className="px-3 py-1 bg-[#DAF6F5]/20 rounded-full text-[#DAF6F5] text-xs">
                      Live Analysis
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* AI Response */}
                    <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border border-white/10">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#DAF6F5] to-[#B8F2EF] rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-[#0A2536] text-sm font-bold">
                            AI
                          </span>
                        </div>
                        <div className="flex-1 space-y-3">
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            className="text-white text-base leading-relaxed"
                          >
                            <span className="text-[#DAF6F5] font-semibold">
                              Analysis Complete!
                            </span>{" "}
                            I&apos;ve reviewed your 47-page merger agreement and
                            identified{" "}
                            <span className="text-yellow-300">
                              3 critical issues
                            </span>{" "}
                            and{" "}
                            <span className="text-green-300">
                              12 optimization opportunities
                            </span>
                            .
                          </motion.p>

                          <div className="grid sm:grid-cols-3 gap-3 mt-4">
                            {[
                              { icon: "⚠️", label: "Risk Areas", count: "3" },
                              {
                                icon: "✅",
                                label: "Compliant Clauses",
                                count: "94%",
                              },
                              { icon: "🔍", label: "Suggestions", count: "12" },
                            ].map((item, i) => (
                              <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2.5 + i * 0.2 }}
                                className="bg-white/5 rounded-lg p-3 text-center border border-white/10"
                              >
                                <div className="text-lg mb-1">{item.icon}</div>
                                <div className="text-[#DAF6F5] font-semibold">
                                  {item.count}
                                </div>
                                <div className="text-white/70 text-xs">
                                  {item.label}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input area */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-white/60 text-base"
                      >
                        What are the termination clauses in section 12?
                      </motion.span>
                    </div>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF] text-[#0A2536] hover:from-[#B8F2EF] hover:to-[#DAF6F5] px-6 py-4 rounded-xl font-semibold shadow-lg"
                    >
                      Analyze
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
