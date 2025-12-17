"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ChevronDown, ArrowRight } from "lucide-react";

// ==========================================
// CONFIGURATION & TYPES
// ==========================================

type DropdownType = "products" | "learn" | "resources" | null;

interface NavItemProps {
  label: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}

interface ProductCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href?: string;
}

// const NAVBAR_HEIGHT = 72;
const NAVBAR_CONFIG = {
  colors: {
    bg: "#ffffff",
    activeBg: "#ffffff",
    border: "rgba(0, 0, 0, 0.12)",
    highlight: "#896629",
  },
} as const;

// ==========================================
// MAIN NAVBAR COMPONENT
// ==========================================

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleDropdownOpen = (dropdown: DropdownType) => setActiveDropdown(dropdown);
  const handleDropdownClose = () => setActiveDropdown(null);

  const navBackground = activeDropdown 
    ? NAVBAR_CONFIG.colors.activeBg 
    : NAVBAR_CONFIG.colors.bg;

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[1000] transition-colors duration-300"
      style={{ 
        backgroundColor: navBackground,
        boxShadow: `0 1px 0 0 ${NAVBAR_CONFIG.colors.border}` 
      }}
    >
      <div className="flex items-center justify-between h-[72px] px-6 lg:px-12 max-w-[1440px] mx-auto">
        
        {/* Left: Logo & Navigation */}
        <div className="flex items-center gap-10 h-full">
          <Link href="/" className="flex-shrink-0">
            <LogoIcon className="w-[100px] h-[45px] text-black hover:text-[#896629] transition-colors" />
          </Link>

          <ul className="hidden lg:flex items-center gap-6 h-full text-[15px] font-medium">
            <NavItem 
              label="Products" 
              isActive={activeDropdown === 'products'} 
              onMouseEnter={() => handleDropdownOpen('products')}
              onMouseLeave={handleDropdownClose}
            >
              <ProductsMegaMenu />
            </NavItem>

            <NavItem 
              label="Learn" 
              isActive={activeDropdown === 'learn'} 
              onMouseEnter={() => handleDropdownOpen('learn')}
              onMouseLeave={handleDropdownClose}
            >
              <LearnMegaMenu />
            </NavItem>

            <li className="hover:text-[#896629] transition-colors">
              <Link href="/trust">Trust</Link>
            </li>
            <li className="hover:text-[#896629] transition-colors">
              <Link href="/refer">Refer & Save</Link>
            </li>
            
            <div className="h-6 w-[1px] bg-black/10 mx-2" />
            
            <NavItem 
              label="Resources" 
              isActive={activeDropdown === 'resources'} 
              onMouseEnter={() => handleDropdownOpen('resources')}
              onMouseLeave={handleDropdownClose}
            >
              <AdvisorResourcesMenu />
            </NavItem>
          </ul>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="hidden sm:block text-[14px] font-medium hover:text-[#896629] transition-colors"
          >
            Log in
          </Link>
          <Link 
            href="/enroll" 
            className="bg-black text-white px-5 py-2.5 rounded-full text-[14px] font-semibold hover:bg-[#896629] transition-all"
          >
            Get started
          </Link>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-[1.5px] bg-black" />
            <div className="w-6 h-[1.5px] bg-black" />
          </button>
        </div>
      </div>
    </nav>
  );
}

// ==========================================
// NAVIGATION COMPONENTS
// ==========================================

function NavItem({ label, isActive, onMouseEnter, onMouseLeave, children }: NavItemProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    if (isActive) {
      gsap.to(dropdown, {
        opacity: 1,
        y: 0,
        display: 'block',
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(dropdown, {
        opacity: 0,
        y: -10,
        display: 'none',
        duration: 0.2,
        ease: "power2.in"
      });
    }
  }, [isActive]);

  return (
    <li 
      className="h-full flex items-center group cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center gap-1 group-hover:text-[#896629] transition-colors">
        {label}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-300 ${
            isActive ? 'rotate-180' : ''
          }`} 
        />
      </div>

      <div 
        ref={dropdownRef}
        className="absolute top-[72px] left-0 w-full bg-white border-t border-black/5 shadow-xl! hidden opacity-0"
      >
        {children}
      </div>
    </li>
  );
}

// ==========================================
// MEGA MENU COMPONENTS
// ==========================================

function ProductsMegaMenu() {
  const products: ProductCardProps[] = [
    {
      title: "Exchange Fund",
      description: "Diversify your large stock position by pooling it with other investors.",
      imageUrl: "https://cdn.prod.website-files.com/655a158485a10c0b88c01948/69208f13585fd1679d49349d_nav-exchange-fund.jpg",
    },
    {
      title: "Collar Advance",
      description: "Borrow against stocks at rates lower than a standard mortgage rate.",
      imageUrl: "https://cdn.prod.website-files.com/655a158485a10c0b88c01948/69208f13b6d47dbeaa2b4b0e_nav-collar-advance.jpg",
    },
    {
      title: "Stock Lending",
      description: "Earn passive income with minimal risk. Highest fee rebate in the industry.",
      imageUrl: "https://cdn.prod.website-files.com/655a158485a10c0b88c01948/69208f13525b37cd5610ef01_nav-stock-lending.jpg",
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto p-12 grid grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.title} {...product} />
      ))}
    </div>
  );
}

function ProductCard({ title, description, imageUrl, href = "#" }: ProductCardProps) {
  return (
    <Link 
      href={href} 
      className="group block bg-[#f8f5f1] rounded-xl overflow-hidden hover:bg-[#ece9e1] transition-colors p-6"
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <h4 className="text-xl font-semibold mb-2">{title}</h4>
          <p className="text-[#737373] text-sm leading-relaxed">{description}</p>
        </div>
        <img 
          src={imageUrl} 
          className="mt-8 rounded-lg w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={title} 
        />
      </div>
    </Link>
  );
}

function LearnMegaMenu() {
  const articles = [
    "What’s an Exchange Fund?",
    "How do exchange funds work?",
    "Optimize tax drag",
  ];

  return (
    <div className="max-w-[1440px] mx-auto p-12 flex gap-12">
      <div className="w-1/3 border-r border-black/5 pr-12">
        <h4 className="text-xl font-semibold mb-4">The Cache Companion</h4>
        <p className="text-[#737373] mb-6">
          Expert insights and practical strategies for concentrated stocks.
        </p>
        <img 
          src="https://cdn.prod.website-files.com/655a158485a10c0b88c01948/691cff3fdd86338fd4652152_nav-companion.svg" 
          className="w-full" 
          alt="Cache Companion" 
        />
      </div>

      <div className="flex-1">
        <h5 className="text-sm font-bold text-[#8c8c8c] uppercase tracking-widest mb-6">
          Top Articles
        </h5>
        <nav className="space-y-4">
          {articles.map((article) => (
            <Link 
              key={article} 
              href="#" 
              className="flex items-center justify-between p-4 rounded-lg hover:bg-[#f4f1eb] transition-colors group"
            >
              <span className="font-medium">{article}</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function AdvisorResourcesMenu() {
  return (
    <div className="p-12 text-center text-gray-400">
      Advisor Resources Content
    </div>
  );
}

// ==========================================
// UTILITY COMPONENTS
// ==========================================

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 336 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Company Logo"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M100 0H50V50H0V100H50V150H100V100H50V50H100V0ZM183.761 84.278C182.592 88.9114 180.05 92.6901 176.136 95.614C172.223 98.493 167.342 99.9325 161.494 99.9325C154.072 99.9325 148.134 97.5933 143.68 92.915C139.227 88.2366 137 82.2537 137 74.9663C137 67.7238 139.249 61.7634 143.748 57.085C148.246 52.3617 154.184 50 161.561 50C167.409 50 172.178 51.3945 175.866 54.1835C179.6 56.9276 182.232 60.7512 183.761 65.6545H175.664C174.359 62.6856 172.583 60.4813 170.333 59.0418C168.084 57.6023 165.16 56.8826 161.561 56.8826C156.568 56.8826 152.587 58.6145 149.618 62.0783C146.649 65.4971 145.165 69.7931 145.165 74.9663C145.165 80.1395 146.649 84.4579 149.618 87.9217C152.587 91.3405 156.568 93.0499 161.561 93.0499C168.804 93.0499 173.505 90.126 175.664 84.278H183.761Z" 
        fill="currentColor"
      />
    </svg>
  );
}
