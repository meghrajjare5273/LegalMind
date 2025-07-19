"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  FileText,
  Shield,
  Search,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuresList = [
  {
    title: "AI-Powered Legal Analysis",
    description:
      "Advanced machine learning algorithms analyze complex legal documents with unprecedented accuracy.",
    icon: FileText,
    color: "from-[#FF6B35] to-[#F7931E]",
  },
  {
    title: "Smart Risk Assessment",
    description:
      "Identify potential legal risks before they become problems with intelligent pattern recognition.",
    icon: Shield,
    color: "from-[#F7931E] to-[#FF8A65]",
  },
  {
    title: "Case Precedent Discovery",
    description:
      "Find relevant case law and precedents instantly with intelligent search algorithms.",
    icon: Search,
    color: "from-[#FF8A65] to-[#FF6B35]",
  },
  {
    title: "Lightning-Fast Processing",
    description:
      "Process hundreds of pages in seconds, not hours. Transform your workflow efficiency.",
    icon: Zap,
    color: "from-[#FF6B35] to-[#F7931E]",
  },
];

export function Features() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuresList.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuresList.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuresList.length) % featuresList.length
    );
  };

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Building Legal Solutions
            <br />
            <span className="text-[#FF6B35]">with Purpose</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering legal professionals with intelligent tools designed for
            precision, efficiency, and excellence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Crafting environments that inspire
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                LegalMind combines cutting-edge AI technology with deep legal
                expertise to create tools that enhance your practice and deliver
                exceptional results for your clients.
              </p>
            </div>

            <div className="space-y-4">
              {featuresList.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                  onClick={() => setCurrentSlide(index)}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-[#FF6B35] transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#FF6B35] transition-colors" />
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white rounded-full px-6">
                Explore
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 rounded-full px-6 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Enhanced Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-900">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuresList.map((feature, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="border-none bg-gray-900 text-white h-80">
                      <CardContent className="flex flex-col justify-center items-center text-center p-8 h-full">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                        >
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-sm font-medium text-[#FF6B35] mb-2 uppercase tracking-wide">
                          Feature Spotlight
                        </span>
                        <h4 className="text-2xl font-bold mb-4">
                          {feature.title}
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="absolute inset-y-0 left-4 flex items-center">
                <Button
                  onClick={prevSlide}
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>

              <div className="absolute inset-y-0 right-4 flex items-center">
                <Button
                  onClick={nextSlide}
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm rounded-full"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Play/Pause Control */}
              <div className="absolute top-4 right-4">
                <Button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm rounded-full"
                >
                  {isAutoPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuresList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-[#FF6B35] scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
