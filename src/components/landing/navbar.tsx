// components/atlantiser/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
// import { useSession } from "@/contexts/session-context"; 

export default function Navbar() {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Simulate auth check
    const timer = setTimeout(() => {
      setIsAuthLoading(false);
      // setUser({ name: "Demo User" }); // Uncomment to test "Logged In" state
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { title: "Services", href: "#services" },
    { title: "Resources", href: "#resources" },
    { title: "Pricing", href: "/pricing" },
    { title: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference text-white transition-all duration-300">
      
      {/* 1. LOGO SECTION */}
      <div className="flex items-center gap-2">
        <Link 
          href="/" 
          className="flex items-baseline gap-0.5 text-2xl font-bold uppercase font-space tracking-wide group"
        >
          {/* Logo Logic: Heavy weight for first part, lighter for second, wider tracking */}
          <span>Legal</span>
          <span className="font-medium opacity-90 group-hover:opacity-100 transition-opacity">Mind</span>
          <span className="text-accent-500 inline-block w-1.5 h-1.5 rounded-full bg-white mb-0.5 ml-0.5 animate-pulse"></span>
        </Link>
      </div>

      {/* 2. NAVIGATION LINKS (Desktop) */}
      <div className="hidden md:flex items-center gap-10 text-base font-medium tracking-tight font-space">
        {navLinks.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group flex items-center gap-1.5 hover:opacity-100 opacity-70 transition-all duration-200"
          >
            <span className="relative">
              {item.title}
              {/* Underline Hover Animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
            {(item.title === "Services" || item.title === "Resources") && (
               <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            )}
          </Link>
        ))}
      </div>

      {/* 3. AUTH & ACTIONS */}
      <div className="flex items-center gap-4">
        
        {!isAuthLoading && user ? (
           // LOGGED IN STATE
           <div className="hidden md:flex items-center gap-2 font-space text-sm font-bold border border-white/30 px-4 py-2 rounded-full cursor-pointer hover:bg-white hover:text-black transition-colors">
             <span>My Account</span>
           </div>
        ) : (
          // LOGGED OUT STATE (Animated Button)
          <Link
            href="/sign-in"
            className="hidden md:flex group relative bg-white text-black pl-6 pr-1.5 h-11 rounded-full overflow-hidden items-center text-sm font-bold font-space tracking-tight"
          >
            <span className="relative z-10 group-hover:-translate-x-[150%] transition-transform duration-500 cubic-bezier(0.19, 1, 0.22, 1)">
              Get Started
            </span>

            <div className="absolute inset-0 flex items-center justify-center translate-x-[150%] group-hover:translate-x-0 transition-transform duration-500 cubic-bezier(0.19, 1, 0.22, 1) whitespace-nowrap pr-8">
              Join Now
            </div>

            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center ml-3 z-20">
              <ArrowRight size={14} className="group-hover:-rotate-45 transition-transform duration-300" />
            </div>
          </Link>
        )}

        {/* MOBILE MENU TRIGGER (Visible only on mobile) */}
        <button className="md:hidden p-1">
            <Menu className="w-8 h-8" strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
}