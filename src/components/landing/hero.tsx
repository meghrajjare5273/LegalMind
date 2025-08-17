"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "../ui/motion-primitives/text-effect";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <div
      className="min-h-screen flex items-center relative overflow-hidden pt-16 bg-card"
      style={{
        backgroundImage: 'url("../pexels-sora-shimazaki-5668473.jpg")',
        imageResolution: "initial",
      }}
    >
      {/* MUI Container maxWidth="lg" equivalent */}
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col space-y-6 max-w-[700px] relative z-10 font-['Roboto','-apple-system','BlinkMacSystemFont','Segoe_UI',sans-serif]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="leading-[0.85] flex flex-col gap-0">
              {/* Line 1: Inspired by Legal */}
              <h1 className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-[0.9] mb-2 h-auto font-bold">
                Inspired by{" "}
                <span className="italic relative inline-block font-bold">
                  Legal
                  {/* <div className="absolute bottom-[3px] left-0 right-0 h-[3px] bg-white/50 rounded-sm" /> */}
                </span>
              </h1>

              {/* Line 2: Innovation */}
              <h1 className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-[0.9] mb-3 italic h-auto font-bold">
                <TextEffect
                  preset="blur"
                  per="char"
                  speedReveal={0.4}
                  delay={0}
                >
                  Legal Innovation
                </TextEffect>
              </h1>

              {/* Line 3: Defined by Excellence */}
              <h1 className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-[0.9] mb-2 h-auto font-bold">
                Defined by{" "}
                <span className="font-extrabold text-[#fff3cd] inline-block">
                  <TextEffect delay={1.2} preset="fade-in-blur" per="char">
                    Excellence
                  </TextEffect>
                </span>
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-white/90 text-[1.125rem] md:text-[1.25rem] leading-[1.5] max-w-[600px] mt-4 font-normal">
              Transform your legal practice with AI-powered document analysis,
              intelligent research, and lightning-fast compliance monitoring.
              LegalMind brings precision and speed to every legal decision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row gap-6 mt-2">
              <Button
                onClick={() => {
                  router.push("/auth/sign-up");
                }}
                className="bg-white text-gold hover:bg-white/90 px-4 py-3 text-[1.1rem] font-semibold hover:-translate-y-[3px] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border-0 h-auto"
                size="lg"
              >
                Join LegalMind&copy;
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  router.push("/auth/sign-in");
                }}
                className="border-white/50 text-white hover:border-white hover:bg-white px-4 py-3 text-[1.1rem]  hover:-translate-y-[3px] transition-all duration-300 bg-transparent h-auto font-bold"
                size="lg"
              >
                Already a Member.?
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
