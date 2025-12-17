import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer role="contentinfo" className="relative overflow-hidden bg-[#FF7759]">
        {/* Top CTA Section */}
        <section className="relative px-4 lg:px-10 pt-12 md:pt-20 pb-12 md:pb-20 flex w-full flex-col items-center justify-center min-h-[500px]">
            <div className="absolute top-0 left-0 h-full w-full z-0">
                <img src="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/e67ccb653850e15bdd2772c7a21ddf8890b1e595-2880x1200.png" className="h-full w-full object-cover" alt="bg" />
            </div>
            <div className="relative z-10 text-center">
                <h2 className="text-[32px] lg:text-[60px] font-medium leading-tight mb-8">Ready to put AI to work?</h2>
                <div className="group relative z-10 inline-block">
                    <div className="absolute inset-0 -z-10 -m-0.5 rounded-full bg-gradient-to-r from-[#FF7759] to-[#C39CFB] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <Link
                        className="relative flex w-fit items-center justify-center bg-[#212121] text-[#FFFFFF] rounded-full py-3 px-6 outline-none"
                        href="/contact-sales"
                    >
                        <span className="text-[16px] lg:text-[18px]">Request a demo</span>
                    </Link>
                </div>
            </div>
        </section>

        {/* Links Section */}
        <section className="relative w-full px-4 lg:px-10 pt-20 pb-20 bg-[#212121] text-white">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between">
                <div className="mb-14 md:mb-0 md:max-w-[325px]">
                    <p className="text-[18px] bg-clip-text text-transparent bg-gradient-to-r from-[#FF7759] to-[#C39CFB]">AI moves fast</p>
                    <p className="text-[18px] mb-9">We’ll keep you up to date with the latest.</p>
                    {/* Simplified Form */}
                    <div className="flex border-b border-[#828282] pb-2">
                        <input type="email" placeholder="Email Address" className="bg-transparent w-full outline-none" />
                        <button className="text-[#828282]">
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none"><path d="M13.8 8.8L7.8 2.8..." fill="currentColor"/></svg> {/* Simplified SVG */}
                            →
                        </button>
                    </div>
                </div>

                <div className="hidden md:flex gap-10">
                    <ul className="min-w-[150px]">
                        <li className="mb-4 font-medium"><Link href="/products">Products →</Link></li>
                        <li className="mb-3 text-[14px] text-[#FFFFFF] opacity-80 hover:opacity-100"><Link href="/north">North</Link></li>
                        <li className="mb-3 text-[14px] text-[#FFFFFF] opacity-80 hover:opacity-100"><Link href="/command">Command</Link></li>
                    </ul>
                    <ul className="min-w-[150px]">
                        <li className="mb-4 font-medium text-[#828282]">Company</li>
                        <li className="mb-3 text-[14px] text-[#FFFFFF] opacity-80 hover:opacity-100"><Link href="/about">About</Link></li>
                        <li className="mb-3 text-[14px] text-[#FFFFFF] opacity-80 hover:opacity-100"><Link href="/careers">Careers</Link></li>
                    </ul>
                </div>
            </div>
            
            <div className="max-w-[1440px] mx-auto mt-20 flex justify-between items-end border-t border-[#828282] pt-6">
                <div className="flex gap-4">
                    {/* Social Icons Placeholders */}
                    <div className="w-5 h-5 bg-white opacity-50"></div>
                    <div className="w-5 h-5 bg-white opacity-50"></div>
                </div>
                <div className="flex gap-6 text-[12px] opacity-80">
                    <p>Cohere © 2025</p>
                    <Link href="/privacy">Privacy</Link>
                    <Link href="/terms">Terms</Link>
                </div>
            </div>
        </section>
    </footer>
  );
};

export default Footer;