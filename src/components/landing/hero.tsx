"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Headline Slide Up & Fade
      tl.fromTo(
        ".headline-reveal",
        { 
          opacity: 0,
          y: 50, // Start 50px lower
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        }
      )
      // Subheading
      .fromTo(
        ".subheading-reveal",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8" // Overlap slightly with headline
      )
      // Buttons
      .fromTo(
        ".cta-reveal",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        "-=0.6"
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full px-6 md:px-8 pt-32 md:pt-48 pb-16 md:pb-24 text-black bg-white dark:bg-background dark:text-foreground">
      <div ref={containerRef} className="relative z-10 mx-auto w-full max-w-360">
        <div className="text-center">
          {/* Headline */}
          <div className="mb-6 md:mb-8 mx-auto max-w-4xl">
            <h1 className="headline-reveal text-[44px] md:text-[56px] lg:text-[80px] leading-[1.1] tracking-tight font-medium text-[#17171c] dark:text-foreground inline-block">
              Legal Intelligence, <br/> Reimagined.
            </h1>
          </div>
          
          {/* Subheading */}
          <div className="mx-auto flex justify-center items-center">
            <div className="subheading-reveal mb-8 lg:mb-12 max-w-2xl">
              <p className="text-[16px] md:text-[20px] text-[#17171c]/80 dark:text-muted-foreground leading-relaxed">
                Experience the synergy of advanced AI and legal expertise. 
                Automate the mundane, focus on strategy, and deliver results with precision.
              </p>
            </div>
          </div>
          
          {/* CTAs */}
          <div className="cta-reveal flex flex-col gap-4 sm:flex-row sm:items-center justify-center items-center">
            {/* Primary Button */}
            <div className="group relative inline-block">
              <div className="absolute inset-0 -z-10 -m-px rounded-full bg-linear-to-r from-[#FF7759] to-[#C39CFB] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <Link
                href="/sign-up"
                className="relative flex w-fit items-center justify-center bg-[#212121] text-[#FFFFFF] dark:bg-primary dark:text-primary-foreground rounded-full py-3.5 px-8 text-[16px] md:text-[18px] font-normal tracking-[-0.01em] transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#C39CFB] focus:ring-offset-2"
              >
                Sign Up
              </Link>
            </div>
            
            {/* Secondary Button */}
            <div className="group relative inline-block">
              <Link
                href="/features"
                className="relative flex w-fit items-center justify-center bg-transparent text-[#17171c] dark:text-foreground py-3.5 px-4 text-[16px] md:text-[18px] font-normal tracking-[-0.01em] transition-colors duration-300 group-hover:text-[#212121] focus:outline-none focus:ring-2 focus:ring-[#C39CFB] focus:ring-offset-2"
              >
                <span className="relative">
                  Explore features
                  <span className="absolute bottom-0 left-0 w-full h-px bg-[#17171c] dark:bg-foreground transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;