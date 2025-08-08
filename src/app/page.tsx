import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero";
import FeaturesCarousel from "@/components/landing/features";
import AboutSection from "@/components/landing/about";
import CTASection from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
import FAQSection from "@/components/landing/faq";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesCarousel />
      <AboutSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
