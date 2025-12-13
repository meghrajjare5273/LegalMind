// app/page.tsx
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import About from "@/components/landing/about";
import Insights from "@/components/landing/insights";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background">
      <Navbar />
      {/* The visual flow moves from White Hero -> Black Content */}
      <Hero />
      <About />
      <Insights />
      <Footer />
    </main>
  );
}
