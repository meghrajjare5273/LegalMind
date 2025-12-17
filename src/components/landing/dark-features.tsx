import React from "react";
import Link from "next/link";
import Interface from "#/assets/chat.png"
import Image from "next/image";
import Grad9 from "#/assets/grad-9.jpg"


const NorthSection = () => {
  return (
    <section className="w-full pt-28 md:pt-40 text-[#FFFFFF] pl-4 lg:pl-10 xl:relative xl:flex xl:h-screen xl:max-h-237.5 xl:min-h-200 xl:items-end relative bg-[#2E2E2E] overflow-hidden">
      {/* Background Image */}
      <div className="absolute top-0 left-0 h-full w-full">
        <Image
          alt=""
          className="hidden h-full w-full object-cover object-center lg:block"
          src={Grad9}
          height={960}
          width={950}
        />
        <Image
            alt=""
            className="block h-full w-full object-cover object-center lg:hidden"
          src={Grad9}
          height={960}
          width={950}
          
        />
      </div>

      <div className="relative z-10 max-w-360 mx-auto w-full h-full">
        {/* Floating Icon Desktop */}
        <div className="absolute z-20 hidden md:-top-24 md:block xl:top-16">
            <img src="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/b792ea088f96bc9520e6d71223eff2b00b42632e-160x33.svg" width="160" height="33" alt="North Icon" className="w-30 md:w-40" />
        </div>

        <div className="flex justify-center md:gap-x-10 lg:gap-x-32 flex-col xl:justify-start md:flex-row h-full items-end">
          {/* Text Content */}
          <div className="w-full mb-10 md:mb-14 md:w-1/2 flex h-full flex-col justify-end">
             {/* Mobile Icon */}
             <img src="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/b792ea088f96bc9520e6d71223eff2b00b42632e-160x33.svg" width="160" height="33" alt="North Icon" className="mb-9 w-30 md:hidden" />
             
             <div className="text-left max-w-87.5 sm:max-w-full">
                <h3 className="text-[28px] lg:text-[48px] leading-tight font-medium mb-4">The rocket fueled AI platform for all your legal needs.</h3>
                <div className="mb-6 lg:mb-10 lg:w-138.75">
                    <p className="text-[16px] lg:text-[18px]">From scattered tools to seamless action — LegalMind brings everything together so your work just works.</p>
                </div>
                <div className="group relative z-10 inline-block">
                    <div className="absolute inset-0 -z-10 -m-0.5 rounded-full bg-linear-to-r from-[#FF7759] to-[#C39CFB] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <Link
                        className="relative flex w-fit items-center justify-center bg-[#FFFFFF] text-[#212121] rounded-full py-3 px-6 outline-none"
                        href="/north"
                    >
                        <span className="text-[16px] lg:text-[18px]">Talk to LegalMind</span>
                    </Link>
                </div>
             </div>
          </div>

          {/* Image Content */}
          <div className="w-full md:w-1/2 xl:absolute xl:bottom-0 xl:m-auto xl:flex xl:h-full xl:max-h-200 xl:items-end xl:right-0 xl:justify-end">
             <Image
                alt="Interface" 
                className="m-auto w-full xl:max-h-200" 
                src={Interface} 
              height={1416}
              width={1440}
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NorthSection;