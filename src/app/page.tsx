import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero";
import FeaturesCarousel from "@/components/landing/features";
import AboutSection from "@/components/landing/about";
import SolutionsCarousel from "@/components/landing/showcase";
import CTASection from "@/components/landing/cta";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesCarousel />
      <AboutSection />
      <SolutionsCarousel />
      <CTASection />
      <Footer />
    </main>
  );
}
