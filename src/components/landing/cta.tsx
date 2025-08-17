/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const isEmailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-black to-[#545d56] py-24 text-white">
      {/* Decorative background shape */}
      <div className="absolute -top-20 -right-28 h-52 w-72 rounded-full bg-[rgba(240,248,255,0.07)] blur-3xl z-0" />

      <div className="relative z-10 mx-auto max-w-3xl px-4">
        {/* Headings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-center font-extrabold leading-tight tracking-tight mb-2 
              text-transparent bg-clip-text bg-gradient-to-r from-[#f0f8ff] to-[#bbb7b4]
              text-[clamp(2.25rem,5vw,3.4rem)]"
          >
            Let&apos;s Design Your <span className="italic">Legal Future</span>{" "}
            Together
          </h2>
          <p className="mb-8 text-center text-lg text-[#e6f1fa] opacity-90">
            Join thousands of legal professionals who trust LegalMind to
            streamline their practice and deliver better outcomes for their
            clients.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form
            className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              if (!isEmailInvalid) {
                alert("Subscribed with: " + email);
              }
            }}
          >
            <div className="flex-1">
              <Label htmlFor="email" className="sr-only">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
                className="bg-[rgba(180,184,187,0.15)] text-[#f0f8ff] placeholder:text-[rgba(240,248,255,0.7)] 
                  border-0 rounded-lg px-4 py-3 backdrop-blur-md focus:bg-[rgba(180,184,187,0.25)] focus:ring-2 
                  focus:ring-[#f0f8ff] focus:outline-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isEmailInvalid}
              aria-label="Subscribe to newsletter with email"
              className="min-w-[140px] font-bold bg-[#f1f9ff] text-[#32393a] shadow-[0_4px_32px_rgba(180,184,187,0.4)]
                transition-all duration-300 hover:bg-[#bdc9c4] hover:text-[#141818] hover:-translate-y-1 hover:scale-105
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get Started →
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
