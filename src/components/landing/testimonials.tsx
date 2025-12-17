"use client";
import React from "react";

const Testimonial = () => {
  return (
    <section className="relative w-full px-4 lg:px-10 pt-16 md:pt-24 pb-12 md:pb-20 text-black">
      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        {/* SVG Filter Definition */}
        <svg tabIndex={-1} aria-hidden="true" className="pointer-events-none invisible absolute" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="rounded" colorInterpolationFilters="sRGB">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"></feGaussianBlur>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="rounded"></feColorMatrix>
                    <feComposite in="SourceGraphic" in2="rounded" operator="atop"></feComposite>
                </filter>
            </defs>
        </svg>

        <div className="flex w-full items-end justify-between pb-10">
            <h2 className="text-[24px] lg:text-[32px] font-medium text-[#212121]">Why leading teams trust Cohere</h2>
        </div>

        <div className="w-full">
            <div className="relative h-[600px] w-full flex">
                {/* Left Card */}
                <div className="h-full absolute left-0 top-0 w-[55%] z-10" style={{ filter: 'url("#rounded")' }}>
                    <div className="h-full rounded-xl p-10 bg-[#212121] text-[#FFFFFF] w-full [clip-path:polygon(82%_0,0_0,0_100%,98%_100%)] flex flex-col justify-center">
                        <div className="w-10/12">
                            <img src="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/2cb1c33d8405830ac09aa15b7e4708ed525073c9-128x50.svg" className="h-12 w-auto mb-10" alt="Nvidia" />
                            <h3 className="text-[20px] lg:text-[24px] font-medium mb-10 leading-snug">
                                “The team at Cohere has made foundational contributions to generative AI. Their service will help enterprises around the world harness these capabilities to automate and accelerate.”
                            </h3>
                            <p className="text-[16px] lg:text-[18px]">— Jensen Huang, Founder and CEO</p>
                            <a href="#" className="mt-16 inline-block text-[16px] hover:text-[#FFFFFF]/80 transition-colors">Read more →</a>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="absolute right-0 h-full w-[55%] pointer-events-none" style={{ filter: 'url("#rounded")' }}>
                    <div className="h-full w-full overflow-hidden bg-[#212121] [clip-path:polygon(100%_0,2%_0,18%_100%,100%_100%)]">
                        <img 
                            src="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/e596d8241a01e47f3afdd6021ea2053f064209d9-1436x1080.png" 
                            className="h-full w-full object-cover" 
                            alt="Person" 
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;