import React from "react";
import Link from "next/link";

const Card = ({ title, img, href }: { title: string; img: string, href: string }) => (
  <Link href={href} className="inline-block focus:outline-none snap-center">
    <div className="group/card relative inline-flex h-[289px] w-[289px] rounded-xl md:h-[399px] md:w-[399px] lg:h-[420px] lg:w-[420px] cursor-pointer flex-none transition-transform duration-500 ease-in-out">
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <img
          alt={title}
          className="h-full w-full rounded-xl object-cover transition-transform duration-300 ease-in-out group-hover/card:scale-[1.2]"
          src={img}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rounded-b-xl bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <p className="text-[20px] lg:text-[24px] font-medium text-[#FFFFFF]">{title}</p>
      </div>
    </div>
  </Link>
);

const IndustryCarousel = () => {
  return (
    <section className="relative w-full px-4 lg:px-10 pt-16 md:pt-36 pb-12 md:pb-20 text-black">
      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        <div className="flex w-full items-end justify-between pb-10">
          <h2 className="text-[24px] lg:text-[32px] font-medium max-w-72 sm:max-w-[550px] text-[#212121]">
            Powering progress across industries
          </h2>
          <div className="mb-2 flex gap-x-5">
             {/* Navigation buttons simplified for visual fidelity */}
             <button className="opacity-50 cursor-not-allowed">←</button>
             <button className="text-[#212121]">→</button>
          </div>
        </div>
        
        <div className="w-screen xl:flex xl:justify-center -ml-4 lg:-ml-10">
            <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-auto px-4 lg:px-10 no-scrollbar pb-10">
                <Card title="Technology" href="#" img="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/b5264330c568955041d465542469ebfdeb196547-840x840.jpg" />
                <Card title="Financial Services" href="#" img="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/30ec75e875e50726980c6a68a63b315b8503f1f7-840x840.jpg" />
                <Card title="Healthcare" href="#" img="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/871cc9ed4e63113205ab55e2a6cb207d8d32a2aa-840x840.jpg" />
                <Card title="Manufacturing" href="#" img="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/6ae6fc28f20cc442e8853d60392c50227a430992-840x840.jpg" />
            </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryCarousel;