// components/atlantiser/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        <div className="text-center mb-32">
          <Link
            href="#"
            className="bg-white text-black text-2xl md:text-4xl px-12 py-6 rounded-full inline-flex items-center gap-4 hover:scale-105 transition-transform duration-300 ease-out"
          >
            <span>Let&apos;s work together</span>
          </Link>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-16 mb-24">
          <div className="md:col-span-1">
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Atlantiser® is a digital-first branding agency that specializes in
              building and scaling next-gen brands and digital experiences.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs uppercase text-gray-500 mb-6">
              Company
            </div>
            <ul className="space-y-3 text-sm font-medium">
              {["About", "Services", "Work", "Membership", "Contact"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-gray-400 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase text-gray-500 mb-6">
              Learn
            </div>
            <ul className="space-y-3 text-sm font-medium">
              {["Insights", "Careers", "Partners", "Tech Stack", "Ethics Policy"].map(
                (l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-gray-400 transition-colors">
                      {l}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase text-gray-500 mb-6">
              Expertise
            </div>
            <ul className="space-y-3 text-sm font-medium">
              {[
                "Brand Strategy",
                "Brand Identity",
                "Website",
                "Digital Product",
                "E-Commerce",
              ].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-gray-400 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono border-t border-white/5 pt-8">
          <div>© 2016-2025 ATLANTISER MEDIATECH PVT. LTD.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#">SITEMAP</a>
            <a href="#">TERMS</a>
            <a href="#">PRIVACY</a>
          </div>
        </div>

        <div className="w-full mt-24 flex justify-center overflow-hidden">
          <h1 className="text-[18vw] leading-none font-bold tracking-tighter text-white select-none pointer-events-none">
            Atlantiser®
          </h1>
        </div>
      </div>
    </footer>
  );
}
