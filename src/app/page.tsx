import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import SplitFeature from "@/components/landing/features";
import ValueProps from "@/components//landing/values";
import NorthSection from "@/components/landing/dark-features";
import IndustryCarousel from "@/components/landing/carousel";
import Testimonial from "@/components/landing/testimonials";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Hero />
      <SplitFeature />
      <ValueProps />
      <NorthSection />
      <IndustryCarousel />
      
      {/* Developer Section (Similar to North Section structure) */}
      <section className="w-full text-[#FFFFFF] pl-4 lg:pl-10 xl:relative xl:flex xl:h-screen xl:max-h-[950px] xl:min-h-[800px] xl:items-end relative bg-[#2E2E2E] overflow-hidden">
         <div className="absolute top-0 left-0 h-full w-full">
            <img src="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/cdf855c00ccc227a009e31da07e9b4caacc42add-2880x1680.png" className="hidden lg:block w-full h-full object-cover" />
         </div>
         <div className="relative z-10 max-w-[1440px] mx-auto w-full h-full flex flex-col md:flex-row items-end">
            <div className="w-full md:w-1/2 mb-14">
                <h3 className="text-[28px] lg:text-[48px] font-medium mb-4">Developer resources</h3>
                <p className="text-[16px] lg:text-[18px] mb-10 max-w-[555px]">Find everything you need to start building, from API access to deep technical docs, and try our models in the Playground.</p>
                <div className="flex gap-6 items-center">
                    <a href="/developers" className="bg-[#FFFFFF] text-[#212121] rounded-full py-3 px-6 text-[16px]">Let's go</a>
                    <a href="#" className="flex items-center gap-2 hover:gap-3 transition-all">Get an API key <span>↗</span></a>
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <img src="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/53bdb371305538ab5186498794ab355070909fae-1440x1360.png" className="w-full max-h-[680px] object-contain" />
            </div>
         </div>
      </section>

      <Testimonial />
      <Footer />
    </main>
  );
}