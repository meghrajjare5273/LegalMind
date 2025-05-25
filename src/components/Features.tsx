"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Features() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [300, -2800]);

  const features = [
    "AI-Powered Legal Analysis",
    "Instant Document Review",
    "Risk Assessment",
    "Contract Intelligence",
    "Legal Compliance",
    "Expert Guidance",
    "Case Precedent Analysis",
    "Smart Legal Research",
    "Automated Due Diligence",
    "Regulatory Updates",
  ];

  return (
    <section ref={targetRef} className="h-[300vh] bg-[#0A2536] relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex items-center whitespace-nowrap"
        >
          {features.concat(features).map((feature, index) => (
            <div key={index} className="flex items-center">
              <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mr-8 md:mr-12">
                {feature}
              </span>
              <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#DAF6F5] mr-8 md:mr-12">
                •
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
