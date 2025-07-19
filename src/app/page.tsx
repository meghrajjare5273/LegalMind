"use client";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { About } from "@/components/landing/about";
import { Showcase } from "@/components/landing/showcase";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function LegalMindLandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Showcase />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
