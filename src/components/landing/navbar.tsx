"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NavLink = ({ label, href }: { label: string; href: string }) => (
  <li className="group/listItem pointer-events-auto h-full flex items-center">
    <Link href={href} className="relative py-4 px-1">
      <p className="text-[14px] font-medium text-foreground transition-colors hover:text-primary">
        {label}
      </p>
      <div className="absolute bottom-3 left-0 h-0.5 w-0 bg-linear-to-r from-[#FF7759] to-[#C39CFB] transition-all duration-300 group-hover/listItem:w-full"></div>
    </Link>
  </li>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        mobileMenuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        ".mobile-nav-item",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, delay: 0.2 }
      );
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-360 px-4 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="text-[24px] font-bold bg-linear-to-r from-primary to-[#C39CFB] bg-clip-text text-transparent">
                LegalMind
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8 h-full">
              <NavLink label="Features" href="#features" />
              <NavLink label="Use Cases" href="#use-cases" />
              <NavLink label="Pricing" href="#pricing" />
              <NavLink label="Resources" href="/resources" />
              <NavLink label="API" href="/api" />
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/sign-in"
                className="text-[14px] font-medium text-foreground hover:text-primary transition-colors"
              >
                Sign in
              </Link>
              <div className="group relative inline-block">
                <div className="absolute inset-0 -m-0.5 rounded-full bg-linear-to-r from-[#FF7759] to-[#C39CFB] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <Link
                  href="/sign-up"
                  className="relative flex items-center justify-center bg-primary text-primary-foreground rounded-full py-2 px-5 text-[14px] font-medium transition-transform hover:scale-105"
                >
                  Start free trial
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background z-60 transform translate-x-full md:hidden shadow-2xl ${
          isMobileMenuOpen ? "" : "pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="text-[20px] font-bold bg-linear-to-r from-primary to-[#C39CFB] bg-clip-text text-transparent">
              LegalMind
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-1">
              {[
                { label: "Features", href: "#features" },
                { label: "Use Cases", href: "#use-cases" },
                { label: "Pricing", href: "#pricing" },
                { label: "Resources", href: "/resources" },
                { label: "API", href: "/api" },
              ].map((link) => (
                <li key={link.label} className="mobile-nav-item opacity-0">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-[16px] font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile CTA Buttons */}
            <div className="mt-8 space-y-3 mobile-nav-item opacity-0">
              <Link
                href="/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-3 px-4 text-center text-[16px] font-medium border border-border rounded-full hover:bg-accent transition-colors"
              >
                Sign in
              </Link>
              <div className="group relative">
                <div className="absolute inset-0 -m-0.5 rounded-full bg-linear-to-r from-[#FF7759] to-[#C39CFB] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <Link
                  href="/sign-up"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative block w-full py-3 px-4 text-center bg-primary text-primary-foreground rounded-full text-[16px] font-medium"
                >
                  Start free trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-55 md:hidden"
        />
      )}
    </>
  );
};

export default Navbar;
