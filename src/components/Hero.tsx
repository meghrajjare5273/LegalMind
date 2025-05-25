"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#DAF6F5]/20 to-[#B8F2EF]/20 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#DAF6F5]/20 to-[#B8F2EF]/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-[#DAF6F5] text-sm font-medium"
            >
              <Star className="w-4 h-4 mr-2" />
              AI-Powered Legal Assistant
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
            >
              Create{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF]">
                quick
              </span>
              <br />
              and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF]">
                effective
              </span>
              <br />
              legal solutions
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed"
            >
              Get instant legal guidance with our advanced AI. Upload documents,
              ask questions, and receive expert-level analysis in seconds.
            </motion.p>

            {/* Rating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-black/20 backdrop-blur-sm border border-white/10 rounded-full text-white"
            >
              <div className="flex items-center mr-4">
                <Star className="w-4 h-4 text-[#DAF6F5] fill-current" />
                <span className="ml-1 font-semibold">4.9/5</span>
              </div>
              <div className="w-px h-4 bg-white/20 mr-4" />
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">10K+ users</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8"
            >
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF] hover:from-[#B8F2EF] hover:to-[#DAF6F5] text-[#0A2536] px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                >
                  <span className="mr-3">●</span>
                  Start free consultation
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Floating Interface Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="relative mt-16 max-w-4xl mx-auto"
            >
              <div className="relative">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-white/60 text-sm">
                        LegalMind AI Assistant
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#DAF6F5] to-[#B8F2EF] rounded-full flex items-center justify-center">
                        <span className="text-[#0A2536] text-sm font-bold">
                          AI
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">
                          I&apos;ve analyzed your contract and found 3 potential
                          issues that need attention...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-white/10 rounded-lg px-4 py-2">
                      <span className="text-white/60 text-sm">
                        Ask about your legal document...
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#DAF6F5] text-[#0A2536] hover:bg-[#B8F2EF]"
                    >
                      Send
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
