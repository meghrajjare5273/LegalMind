// components/atlantiser/About.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".partner-logo", {
        scrollTrigger: {
          trigger: ".logo-grid",
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] text-white py-32 px-6 md:px-12 z-10"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <span className="text-sm text-gray-400 mb-6 font-medium">
          Since 2016
        </span>

        <h2 className="about-text text-3xl md:text-5xl md:leading-[1.1] text-center font-medium tracking-tight mb-8">
          Atlantiser® is a digital-first branding agency that specializes in
          building and scaling next-gen{" "}
          <span className="underline decoration-1 underline-offset-4 decoration-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
            brands
          </span>{" "}
          and{" "}
          <span className="underline decoration-1 underline-offset-4 decoration-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
            digital-experiences
          </span>
          .
        </h2>

        <p className="about-text text-lg md:text-xl text-gray-400 text-center max-w-2xl mb-20 leading-relaxed">
          Transforming visions into brands that stand out, inspire, and excel in
          a crowded digital-first world
        </p>

        <div className="w-full">
          <div className="text-xs font-mono uppercase text-gray-600 text-center mb-8 tracking-widest">
            Awards & Recognitions
          </div>
          <div className="logo-grid grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              "Clutch",
              "Awwwards",
              "CSSDA",
              "FWA",
              "RedDot",
              "Strategyzer",
              "IDEO",
              "Future London",
              "Section",
              "Business Made Simple",
            ].map((brand, i) => (
              <div key={i} className="partner-logo flex items-center justify-center h-8">
                <span className="text-xs font-bold font-mono tracking-tighter">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <Link href="#" className="group flex items-center gap-4 text-white">
            <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
              <ArrowRight size={16} />
            </div>
            <span className="text-sm font-mono uppercase tracking-widest">
              About Us
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
