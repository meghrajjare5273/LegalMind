"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  FileText,
  Shield,
  Search,
  Scale,
  Zap,
  BookOpen,
  TrendingUp,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function Features() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [300, -3200]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.3, 1, 1, 0.3]
  );

  const features = [
    {
      text: "AI-Powered Legal Analysis",
      icon: Brain,
      gradient: "from-[#DAF6F5] to-[#B8F2EF]",
      description:
        "Advanced machine learning algorithms analyze complex legal documents",
    },
    {
      text: "Lightning-Fast Document Review",
      icon: FileText,
      gradient: "from-[#B8F2EF] to-[#DAF6F5]",
      description: "Process hundreds of pages in seconds, not hours",
    },
    {
      text: "Smart Risk Assessment",
      icon: AlertTriangle,
      gradient: "from-[#DAF6F5] to-[#B8F2EF]",
      description: "Identify potential legal risks before they become problems",
    },
    {
      text: "Contract Intelligence Engine",
      icon: Scale,
      gradient: "from-[#B8F2EF] to-[#DAF6F5]",
      description: "Extract key terms and clauses with precision accuracy",
    },
    {
      text: "Real-Time Compliance Monitoring",
      icon: Shield,
      gradient: "from-[#DAF6F5] to-[#B8F2EF]",
      description: "Stay ahead of regulatory changes and requirements",
    },
    {
      text: "Expert AI Guidance",
      icon: Zap,
      gradient: "from-[#B8F2EF] to-[#DAF6F5]",
      description: "Get expert-level insights powered by advanced AI",
    },
    {
      text: "Case Precedent Discovery",
      icon: BookOpen,
      gradient: "from-[#DAF6F5] to-[#B8F2EF]",
      description: "Find relevant case law and precedents instantly",
    },
    {
      text: "Intelligent Legal Research",
      icon: Search,
      gradient: "from-[#B8F2EF] to-[#DAF6F5]",
      description: "Research complex legal topics with AI assistance",
    },
    {
      text: "Automated Due Diligence",
      icon: TrendingUp,
      gradient: "from-[#DAF6F5] to-[#B8F2EF]",
      description: "Streamline due diligence processes with automation",
    },
    {
      text: "24/7 Legal Intelligence",
      icon: Clock,
      gradient: "from-[#B8F2EF] to-[#DAF6F5]",
      description: "Access legal insights anytime, anywhere",
    },
  ];

  return (
    <section
      ref={targetRef}
      className="h-[400vh] bg-gradient-to-br from-[#0A2536] via-[#03366D] to-[#0A2536] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              delay: i * 2,
            }}
            className="absolute w-6 h-6 border border-[#DAF6F5]/20 rounded transform rotate-45"
            style={{
              top: `${10 + i * 8}%`,
              left: `${5 + i * 7}%`,
            }}
          />
        ))}

        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#DAF6F5]/10 to-[#B8F2EF]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            delay: 5,
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-[#B8F2EF]/10 to-[#DAF6F5]/10 rounded-full blur-3xl"
        />
      </div>

      {/* Section Header */}
      <div className="sticky top-0 z-10 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-[#DAF6F5] text-sm font-medium mb-6"
          >
            <Brain className="w-4 h-4 mr-2" />
            Powered by Advanced AI
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-[#DAF6F5] rounded-full ml-2"
            />
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Revolutionary{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF]">
              Legal Technology
            </span>
          </h2>

          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Experience the future of legal work with our comprehensive
            AI-powered platform
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Features */}
      <div className="sticky top-1/2 -translate-y-1/2 flex items-center overflow-hidden">
        <motion.div
          style={{ x, opacity }}
          className="flex items-center whitespace-nowrap will-change-transform"
        >
          {/* Duplicate features for seamless loop */}
          {features.concat(features).map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              {/* Feature Card */}
              <div className="relative mx-8 md:mx-12">
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-20 blur-2xl rounded-3xl scale-110 group-hover:opacity-30 transition-opacity`}
                />

                {/* Main card */}
                <div className="relative bg-black/30 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12 group-hover:border-white/40 transition-all duration-300 min-w-[400px] md:min-w-[500px]">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-[#0A2536]" />
                  </motion.div>

                  {/* Text content */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {feature.text}
                  </h3>

                  <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-md">
                    {feature.description}
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        className="w-2 h-2 bg-[#DAF6F5] rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Separator */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF] mx-8 md:mx-12"
              >
                ✦
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA Section */}
      <div className="sticky bottom-0 z-10 pb-20 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to revolutionize your legal workflow?
            </h3>
            <p className="text-lg text-white/70 mb-6">
              Join thousands of legal professionals already using AI to work
              smarter
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF] text-[#0A2536] px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Experience the Future of Legal Work
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
