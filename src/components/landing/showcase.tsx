"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, FileText, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const showcaseData = [
  {
    id: "contract-analysis",
    title: "Eclipse Tower: A Futuristic Legal Landmark",
    subtitle: "Advanced Contract Intelligence",
    description:
      "Our flagship AI system revolutionizes contract analysis with unprecedented accuracy and speed. Experience the future of legal document processing with intelligent clause extraction, risk assessment, and compliance verification.",
    image:
      "/placeholder.svg?height=600&width=800&text=Contract+Analysis+Dashboard",
    features: [
      "Automatic clause extraction and categorization",
      "Real-time risk scoring and flagging",
      "Intelligent contract comparison tools",
      "Regulatory compliance verification",
    ],
    icon: FileText,
    color: "from-[#FF6B35] to-[#F7931E]",
  },
  {
    id: "risk-assessment",
    title: "Smart Risk Assessment Engine",
    subtitle: "Proactive Legal Protection",
    description:
      "Identify potential legal risks before they become costly problems. Our AI analyzes patterns, precedents, and regulatory changes to provide comprehensive risk assessments.",
    image:
      "/placeholder.svg?height=600&width=800&text=Risk+Assessment+Analytics",
    features: [
      "Predictive risk modeling",
      "Real-time compliance monitoring",
      "Custom risk frameworks",
      "Automated alert systems",
    ],
    icon: Shield,
    color: "from-[#F7931E] to-[#FF8A65]",
  },
  {
    id: "legal-research",
    title: "AI-Powered Legal Research",
    subtitle: "Instant Legal Intelligence",
    description:
      "Transform your legal research with AI that understands context, precedent, and nuance. Find relevant cases and statutes in seconds.",
    image:
      "/placeholder.svg?height=600&width=800&text=Legal+Research+Interface",
    features: [
      "Case law discovery and analysis",
      "Statute interpretation assistance",
      "Precedent matching algorithms",
      "Citation verification tools",
    ],
    icon: Search,
    color: "from-[#FF8A65] to-[#FF6B35]",
  },
  {
    id: "automation",
    title: "Document Automation Suite",
    subtitle: "Streamlined Legal Workflows",
    description:
      "Automate document creation and management with intelligent templates and AI-powered suggestions.",
    image: "/placeholder.svg?height=600&width=800&text=Document+Automation",
    features: [
      "Smart document templates",
      "Automated clause insertion",
      "Version control systems",
      "Collaborative editing tools",
    ],
    icon: Zap,
    color: "from-[#FF6B35] to-[#F7931E]",
  },
];

export function Showcase() {
  const [activeShowcase, setActiveShowcase] = useState(showcaseData[0]);

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="text-sm text-gray-400">
              Crafting Spaces, Crafting Stories
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-900 text-sm font-bold">?</span>
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-900 text-sm font-bold">⚡</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShowcase.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={activeShowcase.image || "/placeholder.svg"}
                  alt={activeShowcase.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div
                    className={`inline-flex items-center gap-2 bg-gradient-to-r ${activeShowcase.color} px-4 py-2 rounded-full mb-3`}
                  >
                    <activeShowcase.icon className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">
                      Live Demo
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShowcase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    {activeShowcase.title}
                  </h3>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[#FF6B35] font-medium">
                      {activeShowcase.subtitle}
                    </span>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-[#FF6B35] rounded-full"></div>
                      <div className="w-2 h-2 bg-[#F7931E] rounded-full"></div>
                      <div className="w-2 h-2 bg-[#FF8A65] rounded-full"></div>
                    </div>
                  </div>
                </div>

                <p className="text-xl text-gray-300 leading-relaxed">
                  {activeShowcase.description}
                </p>

                <div className="space-y-3">
                  {activeShowcase.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-[#FF6B35] rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <Link href="/contract-review">
                  <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white hover:shadow-lg transition-all duration-300 rounded-full px-8 py-6 text-lg">
                    View Project
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Service Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseData.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveShowcase(item)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 group ${
                  activeShowcase.id === item.id
                    ? "bg-gradient-to-br from-[#FF6B35] to-[#F7931E] text-white shadow-xl scale-105"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:shadow-lg"
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    activeShowcase.id === item.id
                      ? "bg-white/20"
                      : `bg-gradient-to-r ${item.color}`
                  }`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold mb-2 group-hover:text-white transition-colors">
                  {item.subtitle}
                </h4>
                <p
                  className={`text-sm ${
                    activeShowcase.id === item.id
                      ? "text-white/80"
                      : "text-gray-400"
                  }`}
                >
                  Click to explore this solution
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
