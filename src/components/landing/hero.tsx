// components/atlantiser/Hero.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".hero-line-inner");
      gsap.from(lines, {
        y: "100%",
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-white text-black flex items-center px-6 md:px-12 pt-24"
    >
      <div className="w-full max-w-[90vw]">
        <h1
          ref={textRef}
          className="text-[10vw] md:text-[7.5vw] leading-[0.9] font-medium tracking-tighter uppercase"
        >
          <div className="overflow-hidden hero-line">
            <div className="hero-line-inner">We Are</div>
          </div>
          <div className="overflow-hidden hero-line">
            <div className="hero-line-inner">Brand</div>
          </div>
          <div className="overflow-hidden hero-line">
            <div className="hero-line-inner">Transformation</div>
          </div>
          <div className="overflow-hidden hero-line">
            <div className="hero-line-inner">Navigators</div>
          </div>
        </h1>

        <div className="mt-12 opacity-70 font-mono text-xs md:text-sm tracking-wide uppercase animate-pulse">
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
