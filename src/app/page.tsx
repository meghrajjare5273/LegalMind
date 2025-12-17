import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import SplitFeature from "@/components/landing/features";
import ValueProps from "@/components/landing/values";
import NorthSection from "@/components/landing/dark-features";
import IndustryCarousel from "@/components/landing/carousel";
import Testimonial from "@/components/landing/testimonials";
import Footer from "@/components/landing/footer";
import CTA from "@/components/landing/cta";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <SplitFeature />
      <ValueProps />
      <NorthSection />
      <IndustryCarousel />
      <Testimonial />
      <CTA />
      <Footer />
    </main>
  );
}
