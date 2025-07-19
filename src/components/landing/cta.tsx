"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Let&apos;s Design Your Future Together
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="w-full px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <Button
                  size="icon"
                  className="absolute right-2 top-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { number: "30-Day", label: "Free Trial" },
              { number: "No", label: "Setup Fees" },
              { number: "24/7", label: "Support" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {item.number}
                </div>
                <div className="text-white/80">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
