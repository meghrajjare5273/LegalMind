"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

// Icons
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.368 21.75H1.06l7.73-8.835L0 2.25h8.203l4.713 6.231L18.244 2.25z" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.451 20.451h-3.554v-5.569c0-1.328-.024-3.037-1.85-3.037-1.853 0-2.136 1.447-2.136 2.944v5.662H9.357V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.369-1.85 3.605 0 4.262 2.373 4.262 5.455v6.285zM5.337 7.433a2.059 2.059 0 110-4.119 2.059 2.059 0 010 4.119zM7.119 20.451H3.555V9h3.564v11.451zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.454C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const Github = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5a12 12 0 00-3.793 23.4c.6.111.82-.261.82-.579 0-.286-.011-1.231-.017-2.234-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.332-1.758-1.332-1.758-1.089-.744.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.76-1.604-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.51 11.51 0 016.005 0c2.291-1.553 3.297-1.23 3.297-1.23.656 1.653.244 2.873.12 3.176.771.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.289 0 .321.216.696.825.579A12 12 0 0012 .5z" />
  </svg>
);

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");

  const footerLinks = {
    Product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "API", href: "/api" },
    ],
    Company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
    Legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Reveal the Top CTA Header
      tl.fromTo(
        ".footer-header",
        { y: 40, opacity: 0, filter: "blur(12px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 }
      );

      // 2. Reveal the Divider
      tl.fromTo(
        ".footer-divider",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.5, ease: "expo.out" },
        "-=0.8"
      );

      // 3. Stagger reveal links and newsletter (Blur + Float up)
      tl.fromTo(
        ".footer-element",
        { y: 20, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.05,
        },
        "-=1.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative bg-[#050505] text-white pt-20 pb-10 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-linear-to-b from-[#FF7759]/10 to-transparent blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Elegant Divider */}
        {/* <div className="footer-divider w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-12" /> */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand & Newsletter */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col gap-6">
            <div className="footer-element">
              <span className="text-xl font-bold bg-linear-to-r from-[#FF7759] to-[#C39CFB] bg-clip-text text-transparent">
                LegalMind
              </span>
              <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
                AI moves fast. We&apos;ll keep you up to date with the latest legal
                tech insights and updates.
              </p>
            </div>
            
            <div className="footer-element relative max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C39CFB]/50 transition-colors"
              />
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-3.5 h-3.5 text-white/70" />
              </button>
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="flex flex-col gap-4">
                <h3 className="footer-element text-sm font-medium text-white">
                  {category}
                </h3>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label} className="footer-element">
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors block w-fit"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="footer-element text-xs text-white/30">
            © {new Date().getFullYear()} LegalMind Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {[
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Github, href: "#", label: "GitHub" },
            ].map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                className="footer-element group p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;