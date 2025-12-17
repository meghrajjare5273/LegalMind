"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const NavLink = ({ label, href, hasMenu = false }: { label: string; href: string, hasMenu?: boolean }) => (
  <li className="group/listItem pointer-events-auto h-full flex items-center">
    <Link href={href} className="relative py-4">
      <p className="text-[14px] font-medium text-[#17171c]">{label}</p>
      <div className="relative">
        <div
          tabIndex={-1}
          aria-hidden="true"
          className="absolute mt-0.5 h-px w-0 bg-linear-to-r transition-[width] duration-300 from-[#FF7759] via-[#C39CFB] to-[#4579FF] group-hover/listItem:w-full"
        ></div>
      </div>
    </Link>
    {/* Mega Menu Placeholder - simulating specific DOM structure for "Products" */}
    {hasMenu && (
      <div className="absolute left-1/2 top-[calc(100%)] -translate-x-1/2 transform transition-all duration-300 ease-in-out -translate-y-2 opacity-0 pointer-events-none rounded-3xl group-hover/listItem:pointer-events-auto group-hover/listItem:translate-y-0 group-hover/listItem:opacity-100 border border-[#E0E0E0] bg-[#FFFFFF] shadow-[0px_2px_2px_rgb(0_0_0/0.1)] pt-4 px-6 pb-6 min-w-225 z-50">
         <div className="absolute -top-11 left-1/2 h-[calc(100%+44px)] w-[200%] max-w-237 -translate-x-1/2"></div>
         <div className="flex gap-10">
            {/* Replicating structure from source for Products menu */}
            <div className="flex flex-col gap-4 w-71">
               <p className="text-[11px] uppercase tracking-wider text-[#828282] mb-3">Workplace Systems</p>
               <Link href="#" className="group/item flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#4579FF] mt-2"></div>
                  <div>
                      <p className="text-[16px] font-medium">North</p>
                      <p className="text-[14px] text-[#828282] mt-1">An enterprise-ready AI platform.</p>
                  </div>
               </Link>
               <Link href="#" className="group/item flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#4579FF] mt-2"></div>
                  <div>
                      <p className="text-[16px] font-medium">Compass</p>
                      <p className="text-[14px] text-[#828282] mt-1">Intelligent search and discovery.</p>
                  </div>
               </Link>
            </div>
            {/* Additional Columns would go here based on source */}
         </div>
      </div>
    )}
  </li>
);

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initial entrance animation matching extract: -translate-y-full opacity-0
    gsap.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.2,
    });
  }, []);


  return (
    <nav
      ref={navRef}
      role="navigation"
      className="z-999 h-auto transition-all duration-300 ease-in-out py-5 md:py-4 flex w-full items-center justify-between gap-x-10 px-4 md:px-6 lg:px-10 fixed top-0 -translate-y-full opacity-0 bg-[#FFFFFF] shadow-[0px_2px_2px_rgb(0_0_0/0.1)]"
    >
      <Link className="mr-auto flex flex-1 justify-start" href="/">
                  <svg width="115.6" height="42" viewBox="0 0 289 105" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_dn_1_4)">
            <path d="M5.66401 71.296V49.344L4.00001 48.384V38.848L5.66401 39.808V0H13.984V44.608L15.648 45.568V55.104L13.984 54.144V62.976H22.816V49.728L31.136 54.528V71.296H5.66401ZM60.4095 71.296H34.9375V32.704L47.6735 25.344L60.4095 32.704V47.872L43.2575 57.792V62.976H52.0895V57.664L60.4095 52.928V71.296ZM43.2575 48.192L52.0895 43.072V37.504L47.6735 34.944L43.2575 37.504V48.192ZM89.6595 32.704V89.28L76.9235 96.64L64.1875 89.28V75.072L72.5075 79.872V84.48L76.9235 87.04L81.3395 84.48V68.736L76.9235 71.296L72.5075 68.736L64.1875 63.936V32.704L76.9235 25.344L89.6595 32.704ZM76.9235 34.944L72.5075 37.504V59.136L76.9235 61.696L81.3395 59.136V37.504L76.9235 34.944ZM109.886 25.344H118.206V71.296H109.886V68.736L105.47 71.296H92.7335V32.704L105.47 25.344L109.886 27.904V25.344ZM109.886 59.136V37.504L105.47 34.944L101.054 37.504V62.976H103.23L109.886 59.136ZM122 71.296V0H130.32V71.296H122Z" fillOpacity="0.75" style={{ fill: "black", fillOpacity: 0.75 }} />
              <path d="M135.335 71.296V21.656H137.443L145.263 28.048V21.656H160.155L168.655 28.048V21.656H183.547L192.047 30.156V71.296H182.119V30.156H168.655V71.296H158.727V30.156H145.263V71.296H135.335ZM197.614 71.296V35.8H206.862V71.296H197.614ZM197.614 30.836V21.656H206.862V30.836H197.614ZM212.222 71.296V35.8H214.33L221.47 42.192V35.8H237.45L245.95 44.368V71.296H236.77V44.368H221.47V71.296H212.222ZM259.029 71.296L250.529 62.796V35.8H268.005L275.077 42.192V21.656H284.257V71.296H259.029ZM259.777 44.368V62.796H275.077V44.368H259.777Z" fill="#C6A15B" style={{ fill: "#C6A15B",}} />
            </g>
            <defs>
              <filter id="filter0_dn_1_4" x="0" y="0" width="288.257" height="104.64" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_4"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="2673" />
                <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                  <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
                </feComponentTransfer>
                <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                <feMerge result="effect2_noise_1_4">
                  <feMergeNode in="shape" />
                  <feMergeNode in="color1" />
                </feMerge>
                <feBlend mode="normal" in="effect2_noise_1_4" in2="effect1_dropShadow_1_4" result="effect2_noise_1_4"/>
              </filter>
            </defs>
          </svg>
      </Link>

      <ul className="hidden flex-1 list-none justify-center gap-x-8 lg:flex xl:gap-x-10 h-full">
        <NavLink label="Products" href="/products" hasMenu={true} />
        <NavLink label="Solutions" href="/solutions" hasMenu={true} />
        <NavLink label="Research" href="/research" hasMenu={true} />
        <NavLink label="Company" href="/about" hasMenu={true} />
      </ul>

      <div className="ml-auto flex flex-1 items-center justify-end gap-x-4 xl:gap-x-6">
        <div className="hidden items-center gap-x-4 sm:flex xl:gap-x-6">
          <div className="hidden lg:inline-block">
            <Link
              href="https://dashboard.cohere.com/welcome/login"
              className="group/CTA relative whitespace-nowrap"
            >
              <p className="text-[14px] text-[#17171c]">Sign in</p>
              <div className="relative">
                <div
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute mt-0.5 h-px w-0 bg-linear-to-r transition-[width] group-hover/CTA:w-full from-[#FF7759] via-[#C39CFB] to-[#4579FF]"
                ></div>
              </div>
            </Link>
          </div>
          <div className="group relative z-10 inline-block">
            <div className="absolute inset-0 -z-10 -m-0.5 rounded-full bg-linear-to-r from-[#FF7759] to-[#C39CFB] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <Link
              className="w-full! whitespace-nowrap sm:w-fit! relative flex items-center justify-center transition-all duration-300 cursor-pointer bg-[#212121] text-[#FFFFFF] rounded-full py-3 px-4 outline-none"
              href="/contact-sales"
            >
              <span className="text-[14px]">Request a demo</span>
            </Link>
          </div>
        </div>
        {/* Mobile Hamburger */}
        <button className="flex h-5.25 w-8 items-center justify-center lg:hidden">
           <div className="w-full h-0.5 bg-black relative before:content-[''] before:absolute before:w-full before:h-0.5 before:bg-black before:-top-2 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-black after:top-2"></div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;