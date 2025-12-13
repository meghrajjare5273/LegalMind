// components/atlantiser/Navbar.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-white">
      <div className="flex items-center gap-2">
        <div className="text-xl font-bold tracking-tighter uppercase">
          Atlantiser®
        </div>
      </div>

      <div className="hidden md:flex gap-8 text-sm font-medium tracking-tight">
        {["About", "Services", "Work", "Insights", "Careers"].map((item) => (
          <Link
            key={item}
            href="#"
            className="hover:opacity-60 transition-opacity"
          >
            {item}
          </Link>
        ))}
      </div>

      <Link
        href="#"
        className="group relative bg-white text-black px-5 py-2 rounded-full overflow-hidden flex items-center gap-2 text-sm font-semibold"
      >
        <span className="relative z-10 group-hover:-translate-x-full transition-transform duration-300 ease-in-out block">
          Get in touch
        </span>
        <div className="absolute inset-0 flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out">
          Get in touch
        </div>
        <div className="bg-black text-white rounded-full p-1 ml-2 w-5 h-5 flex items-center justify-center">
          <ArrowRight size={12} />
        </div>
      </Link>
    </nav>
  );
}
