"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-[#050508] text-white pt-16 pb-0 w-full">
      <div className="w-full px-6 relative">
        {/* Main footer container */}
        <div className="relative overflow-hidden min-h-[400px]">
          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 opacity-8 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E")`,
              backgroundSize: "160px 160px",
            }}
          />

          {/* Large wordmark background (centered) */}
          <div
            className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden z-0"
            style={{
              maskImage:
                "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)",
            }}
          >
            <div
              className="font-black text-white/20 leading-none tracking-tight pb-8 text-center"
              style={{
                fontSize: "clamp(120px, 15vw, 280px)",
                fontFamily:
                  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto',
              }}
            >
              LegalMind
            </div>
          </div>

          {/* Top utility bar (centered search) */}
          <div className="flex items-center justify-center px-8 pt-8 pb-6 relative z-20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/48 w-4 h-4" />
              <Input
                placeholder="Search"
                className="w-64 h-9 pl-10 bg-white/6 border-white/12 text-white placeholder:text-white/48 rounded-xl focus:border-white/25"
              />
            </div>
          </div>

          {/* Link columns (centered grid) */}
          <div className="relative z-20 pb-16 pt-6">
            <div className="mx-auto max-w-5xl px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {/* Column 1 - The Good */}
                <div>
                  <h3 className="text-white/48 text-xs font-bold uppercase tracking-wider mb-4">
                    The Good
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="#"
                      className="block text-white/72 hover:text-white/90 transition-colors text-sm"
                    >
                      Home
                    </a>
                    <a
                      href="#"
                      className="block text-white/72 hover:text-white/90 transition-colors text-sm"
                    >
                      Manifesto
                    </a>
                    <a
                      href="#"
                      className="block text-white/72 hover:text-white/90 transition-colors text-sm"
                    >
                      Research
                    </a>
                    <a
                      href="#"
                      className="block text-white/72 hover:text-white/90 transition-colors text-sm"
                    >
                      Careers
                    </a>
                  </div>
                </div>

                {/* Column 2 - The Boring */}
                <div>
                  <h3 className="text-white/48 text-xs font-bold uppercase tracking-wider mb-4">
                    The Boring
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="#"
                      className="block text-white/72 hover:text-white/90 transition-colors text-sm"
                    >
                      Terms of Use
                    </a>
                    <a
                      href="#"
                      className="block text-white/72 hover:text-white/90 transition-colors text-sm"
                    >
                      Play by the Rules
                    </a>
                  </div>
                </div>

                {/* Column 3 - The Cool */}
                <div>
                  <h3 className="text-white/48 text-xs font-bold uppercase tracking-wider mb-4">
                    The Cool
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="#"
                      className="block text-white/72 hover:text-white/90 transition-colors text-sm"
                    >
                      X
                    </a>
                    <a
                      href="#"
                      className="block text-white/72 hover:text-white/90 transition-colors text-sm"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom meta row (centered) */}
          <div className="px-8 py-6 border-t border-dashed border-white/12 relative z-20">
            <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              <p className="text-white/48 text-sm">
                © {new Date().getFullYear()} LegalMind
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-white/72 hover:text-white/90 transition-colors text-sm"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-white/72 hover:text-white/90 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>

          {/* Removed the grey corner app icon */}
        </div>
      </div>
    </footer>
  );
}
