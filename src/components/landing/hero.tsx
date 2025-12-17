"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Headline mask reveal
      tl.fromTo(
        ".headline-reveal",
        { 
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          opacity: 0
        },
        { 
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      )
      // Subheading
      .fromTo(
        ".subheading-reveal",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      // Buttons
      .fromTo(
        ".cta-reveal",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full px-6 md:px-8 pt-32 md:pt-48 pb-16 md:pb-24 text-black bg-white">
      <div ref={containerRef} className="relative z-10 mx-auto w-full max-w-360">
        <div className="text-center">
          {/* Headline */}
          <div className="mb-6 md:mb-8 mx-auto max-w-282 2xl:max-w-470">
            <h1 className="headline-reveal text-[44px] md:text-[56px] lg:text-[80px] leading-[1.05] tracking-tight font-medium text-[#17171c] inline-block">
              Your next breakthrough,
              <br />
              powered by AI
            </h1>
          </div>
          
          {/* Subheading */}
          <div className="mx-auto flex justify-center items-center">
            <div className="subheading-reveal mb-8 lg:mb-12 max-w-163.75">
              <p className="text-[16px] md:text-[18px] text-[#17171c] leading-relaxed opacity-90">
                LegalMind is where powerful AI meets practical legal solutions — 
                so you can work smarter with precision and trust.
              </p>
            </div>
          </div>
          
          {/* CTAs */}
          <div className="cta-reveal flex flex-col gap-4 sm:flex-row sm:items-center justify-center items-center">
            {/* Primary Button */}
            <div className="group relative inline-block">
              <div className="absolute inset-0 -z-10 -m-px rounded-full bg-linear-to-r from-[#FF7759] to-[#C39CFB] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <Link
                href="/contact-sales"
                className="relative flex w-fit items-center justify-center bg-[#212121] text-[#FFFFFF] rounded-full py-3.5 px-7 text-[16px] md:text-[18px] font-normal tracking-[-0.01em] transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#C39CFB] focus:ring-offset-2"
              >
                Request a demo
              </Link>
            </div>
            
            {/* Secondary Button */}
            <div className="group relative inline-block">
              <Link
                href="/products"
                className="relative flex w-fit items-center justify-center bg-transparent text-[#17171c] py-3.5 px-1 text-[16px] md:text-[18px] font-normal tracking-[-0.01em] transition-colors duration-300 group-hover:text-[#212121] focus:outline-none focus:ring-2 focus:ring-[#C39CFB] focus:ring-offset-2"
              >
                <span className="relative">
                  Explore products
                  <span className="absolute bottom-0 left-0 w-full h-px bg-[#17171c] transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
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
