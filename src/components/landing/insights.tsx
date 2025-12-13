// components/atlantiser/Insights.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    title: "First-Mover Advantage in Niche Industries",
    tag: "Branding",
    time: "10 Min",
    image:
      "https://cdn.prod.website-files.com/67a6021d6f7547e8aef9f082/6874dd8a8384993d93e8b904_First-Mover.avif",
  },
  {
    title: "Atlantiser® Is Now a Participant of the United Nations Global Compact",
    tag: "Commitment",
    time: "4 Min",
    image:
      "https://cdn.prod.website-files.com/67a6021d6f7547e8aef9f082/686f80616be181cd25410a5d_UNGC_Atlantiser.jpg",
  },
  {
    title: "B2B Doesn’t Mean Boring to Boring",
    tag: "Strategy",
    time: "10 Min",
    image:
      "https://cdn.prod.website-files.com/67a6021d6f7547e8aef9f082/6874dda1574359e627e22ca4_b2b.avif",
  },
];

export default function Insights() {
  const containerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".insight-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#0a0a0a] text-white py-24 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4 md:mb-0">
            Insights
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight max-w-sm">
            Ideas, research, <br /> and stories.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="insight-card group cursor-pointer">
              <div className="relative aspect-[4/3] w-full overflow-hidden mb-6 bg-gray-900">
                <img
                  src={article.image}
                  alt={article.title}
                  // fill= "true"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-3">
                <span className="uppercase border border-white/10 px-2 py-1 rounded">
                  {article.tag}
                </span>
                <span>{article.time}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-medium leading-snug group-hover:underline decoration-1 underline-offset-4">
                {article.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
    