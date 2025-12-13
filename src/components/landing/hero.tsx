"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- THEME CONFIGURATION (Based on your Palette Image) ---
const THEMES = {
  dark: {
    "--bg": "#141A22",        // Ink Black
    "--text-primary": "#F3EFE8", // Parchment
    "--text-secondary": "#89A1BE", // Steel Blue
    "--border": "rgba(243, 239, 232, 0.15)",
    "--accent": "#C6AC8E",    // Khaki Beige
    "--highlight": "#6C0E26", // Dark Amaranth
  },
  light: {
    "--bg": "#F3EFE8",        // Parchment
    "--text-primary": "#141A22", // Ink Black
    "--text-secondary": "#513E29", // Deep Walnut
    "--border": "rgba(20, 26, 34, 0.1)",
    "--accent": "#6C0E26",    // Dark Amaranth
    "--highlight": "#C6AC8E", // Khaki Beige
  },
};

export default function Hero() {
  const [isDark, setIsDark] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. THEME SWITCHER
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const theme = isDark ? THEMES.dark : THEMES.light;

    gsap.to(root, {
      "--bg": theme["--bg"],
      "--text-primary": theme["--text-primary"],
      "--text-secondary": theme["--text-secondary"],
      "--border": theme["--border"],
      "--accent": theme["--accent"],
      "--highlight": theme["--highlight"],
      duration: 0.6,
      ease: "power2.inOut",
    });
  }, [isDark]);

  // 2. ENTRANCE ANIMATION
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // A. Reveal Grid Lines
      tl.fromTo(
        ".grid-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, stagger: 0.1 }
      )
        // B. Reveal Nav Items
        .fromTo(
          ".nav-fade",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 },
          "-=0.8"
        )
        // C. Main Title Reveal
        .fromTo(
          ".hero-char",
          { yPercent: 120, rotateX: -20 },
          { yPercent: 0, rotateX: 0, duration: 1.2, stagger: 0.02, ease: "expo.out" },
          "-=0.5"
        )
        // D. Secondary Text
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      // Added `selection:` styles to match the accent color for a premium feel
      className="relative w-full min-h-screen flex flex-col overflow-hidden transition-colors select-none md:select-auto"
      style={THEMES.dark as React.CSSProperties}
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 bg-(--bg) transition-colors duration-500" />
      
      {/* Clean Grid System - Less messy than SVG paths, looks architectural */}
      <div className="absolute inset-0 z-0 flex justify-between px-6 md:px-24 pointer-events-none">
        <div className="w-px h-full bg-border grid-line origin-top" />
        <div className="w-px h-full bg-[var(--border)] grid-line origin-top hidden md:block" />
        <div className="w-px h-full bg-[var(--border)] grid-line origin-top hidden lg:block" />
        <div className="w-px h-full bg-[var(--border)] grid-line origin-top" />
      </div>

      {/* Grain Texture for that "Paper/Film" Look */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none z-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-20 flex flex-col justify-between h-full min-h-screen p-6 md:p-12 lg:px-24">
        
        {/* NAV */}
        {/* <nav className="w-full flex justify-between items-start font-mono text-xs uppercase tracking-widest text-[var(--text-primary)]">
        

          <div className="flex gap-8 items-center">

            <div className="nav-fade hidden md:block text-right opacity-60 leading-tight">
              Pune, IN <br /> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            
            <button
              onClick={() => setIsDark(!isDark)}
              className="nav-fade border border-[var(--border)] px-5 py-2 rounded-sm hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-all duration-300"
            >
              {isDark ? "Light" : "Dark"}
            </button>
          </div>
        </nav> */}

        {/* MAIN TYPOGRAPHY */}
        <div className="flex flex-col justify-center flex-grow pt-10 md:pt-0">
          <div className="relative">
            {/* Small Label */}
           

            {/* Huge Serif Headline */}
            <h1 className="font-serif text-[13vw] md:text-[11vw] leading-[0.85] tracking-tight text-[var(--text-primary)]">
              <div className="overflow-hidden">
                {"Legal".split("").map((char, i) => (
                  <span key={i} className="hero-char inline-block">{char}</span>
                ))}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 ml-1 md:ml-[6vw]">
                {/* Italic Bridge Word */}
                <span className="hero-char font-sans text-[4vw] md:text-[3vw] italic font-light opacity-50 self-start md:self-center -mt-2 md:mt-0">
                  for the
                </span>
                
                {/* Second Word */}
                <div className="overflow-hidden text-[var(--text-secondary)]">
                  {"Future".split("").map((char, i) => (
                    <span key={i} className="hero-char inline-block">{char}</span>
                  ))}
                </div>
              </div>
            </h1>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 pt-10 md:pt-0 border-t border-[var(--border)] md:border-none mt-8 md:mt-0">
          
          <div className="hero-sub w-full md:w-1/3 text-[var(--text-primary)] opacity-80">
            <p className="text-sm md:text-base font-sans leading-relaxed">
              Transforming Indian Law with precision AI. 
              Complex morphological parsing meets expert legal reasoning.
            </p>
          </div>

          <div className="hero-sub w-full md:w-auto">
             <button className="group relative w-full md:w-auto overflow-hidden bg-[var(--accent)] text-[var(--bg)] px-8 py-4 md:px-10 md:py-5">
               <div className="absolute inset-0 bg-[var(--text-primary)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]" />
               <span className="relative z-10 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest font-bold group-hover:text-[var(--bg)] transition-colors">
                  Start Consultation
                  <span className="text-lg leading-none mb-1">→</span>
               </span>
             </button>
          </div>

        </div>
      </div>
    </section>
  );
}