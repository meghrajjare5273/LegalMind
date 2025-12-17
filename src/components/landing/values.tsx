"use client";
import Link from "next/link";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ValueProps = () => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(".fade-up-item", 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: ref.current, start: "top 80%" }}
        )
    }, ref);
    return () => ctx.revert();
  }, []);

  const items = [
    {
        title: "Security",
        desc: "Ensure privacy and compliance with multi-layered protection, access controls, and industry-certified security standards.",
        link: "/security",
        icon: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/dcdf04a6c8e30bf7d432956f6eaf6a730eb9897f-100x100.svg"
    },
    {
        title: "Deployment",
        desc: "Secure your data by deploying within a dedicated virtual private cloud (VPC) environment or on-premises, air-gapped behind your firewall.",
        link: "/private-deployments",
        icon: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/5fc7c13fbb1203d8393575e3b1af25a00bc768a9-102x102.svg"
    },
    {
        title: "Customization",
        desc: "Train our models on your proprietary data and partner with us to create unique AI solutions that fit your use cases, needs, and infrastructure.",
        link: "/customization",
        icon: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/1a4deb9b787ba55805eef53f73bb27e916b9299a-100x100.svg"
    }
  ];

  return (
    <section ref={ref} className="relative w-full px-4 lg:px-10 pt-12 md:pt-20 pb-16 md:pb-36 text-black">
      <div className="relative z-10 mx-auto w-full max-w-360">
        <div className="text-center mb-10 fade-up-item">
            <h3 className="text-[28px] lg:text-[48px] leading-tight font-medium">Safe. Flexible. Built for business.</h3>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-y-9 md:gap-x-5">
            {items.map((item, i) => (
                <div key={i} className="w-full fade-up-item">
                    <img src={item.icon} width="100" height="100" alt={`${item.title} Icon`} className="pb-6 max-w-25" />
                    <div className="flex flex-col gap-4 md:pr-6">
                        <p className="text-[20px] lg:text-[24px] font-medium">{item.title}</p>
                        <p className="text-[16px] leading-relaxed text-[#17171c]">{item.desc}</p>
                        <Link href={item.link} className="group inline-block pt-2">
                            <span className="flex items-center text-[#17171c]">
                                <span className="text-[16px]">Learn more</span>
                                <span className="ml-1 transition-all duration-300 group-hover:translate-x-1">→</span>
                            </span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;