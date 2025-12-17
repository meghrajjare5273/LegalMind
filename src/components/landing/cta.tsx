"use client"
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

export default function CTA() {
    const ctaRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(
                ".cta-reveal",
                {
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                    opacity: 0,
                },
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                }
            )
        }, ctaRef);

        return () => { ctx.revert() }
    }, [])

    return (
      <section ref={ctaRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#FF7759] to-[#C39CFB]" />
        <div
          className="absolute inset-0 pattern-overlay opacity-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative px-4 lg:px-10 pt-24 md:pt-32 pb-16 md:pb-24 flex w-full flex-col items-center justify-center">
          <div className="relative z-10 text-center max-w-4xl">
            <h2 className="cta-reveal text-[40px] md:text-[56px] lg:text-[72px] font-medium leading-[1.1] tracking-[-0.02em] text-white mb-6">
              Ready to transform
              <br />
              your legal practice?
            </h2>
            <p className="cta-reveal text-[18px] lg:text-[20px] text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of legal professionals using AI to work smarter
            </p>

            <div className="cta-reveal flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="group relative inline-block">
                <div className="absolute inset-0 -z-10 -m-0.5 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Link
                  className="relative flex w-fit items-center gap-3 justify-center bg-white text-[#0a0a0a] rounded-full py-4 px-8 outline-none transition-transform hover:scale-[1.02]"
                  href="/sign-up"
                >
                  <span className="text-[16px] lg:text-[18px] font-medium">
                    Start free trial
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <Link
                href="/contact-sales"
                className="relative group flex items-center gap-3 text-white hover:text-white/90 transition-colors py-4 px-8"
              >
                <span className="text-[16px] lg:text-[18px] font-medium">
                  Request a demo
                </span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section >
      ) 
}