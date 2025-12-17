"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animate-fade-up",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full px-4 pt-28 md:pt-40 pb-12 md:pb-20 text-black">
      <div ref={containerRef} className="relative z-10 mx-auto w-full max-w-[1440px]">
        <div className="text-center">
          <div className="mb-4 break-words 2xl:max-w-[1880px] md:max-w-[1128px] mx-auto animate-fade-up opacity-0">
            <h1 className="text-[40px] lg:text-[72px] leading-[1.1] tracking-[-0.02em] font-medium text-[#17171c]">
              Your next breakthrough,<br />
              powered by AI
            </h1>
          </div>
          <div className="mx-auto flex justify-center items-center animate-fade-up opacity-0">
            <div className="break-words mb-6 lg:mb-10 lg:w-[655px]">
              <p className="text-[16px] lg:text-[18px] text-[#17171c] leading-relaxed">
                Cohere is where powerful AI meets practical business solutions — so you can work smarter.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-center items-center animate-fade-up opacity-0">
            {/* Primary Button */}
            <div className="group relative z-10 inline-block">
              <div className="absolute inset-0 -z-10 -m-0.5 rounded-full bg-gradient-to-r from-[#FF7759] to-[#C39CFB] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <Link
                className="relative flex w-fit items-center justify-center bg-[#212121] text-[#FFFFFF] rounded-full py-3 px-6 outline-none"
                href="/contact-sales"
              >
                <span className="text-[16px] lg:text-[18px]">Request a demo</span>
              </Link>
            </div>
            {/* Secondary Button */}
            <div className="group relative z-10 inline-block">
              <Link
                className="relative flex w-fit items-center justify-center bg-transparent text-[#17171c] pb-1.5 bg-gradient-to-r bg-[length:100%_1px] bg-bottom bg-no-repeat from-[#212121] to-[#212121]"
                href="/products"
              >
                <span className="text-[16px] lg:text-[18px]">Explore products</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;