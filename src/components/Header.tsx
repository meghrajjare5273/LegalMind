"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Scale,
  ChevronDown,
  Sparkles,
  Shield,
  Users,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";

// Button component
// const Button = ({ children, size, className, ...props }) => {
//   const sizeClasses = {
//     sm: "px-3 py-1.5 text-sm",
//     lg: "px-6 py-3 text-lg",
//   };

//   return (
//     <button
//       className={`inline-flex items-center justify-center rounded-md font-medium transition-colors ${
//         sizeClasses[size] || "px-4 py-2"
//       } ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      name: "Solutions",
      href: "#solutions",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Contract Analysis",
          icon: Shield,
          desc: "AI-powered contract review",
        },
        {
          name: "Legal Research",
          icon: BookOpen,
          desc: "Comprehensive case law search",
        },
        {
          name: "Document Review",
          icon: Users,
          desc: "Automated document scanning",
        },
        {
          name: "Compliance Check",
          icon: Sparkles,
          desc: "Regulatory compliance tools",
        },
      ],
    },
    { name: "Pricing", href: "#pricing" },
    { name: "Resources", href: "#resources" },
    { name: "Company", href: "#company" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
            : "bg-black/10 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="relative w-12 h-12 bg-gradient-to-br from-[#DAF6F5] to-[#B8F2EF] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
              >
                <Scale className="w-6 h-6 text-[#03366D]" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full opacity-80"
                />
              </motion.div>
              <div className="flex flex-col">
                <span
                  className={`font-bold text-2xl transition-colors ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  LegalMind
                </span>
                <span
                  className={`text-xs font-medium transition-colors ${
                    isScrolled ? "text-gray-500" : "text-white/70"
                  }`}
                >
                  AI Legal Assistant
                </span>
              </div>
            </motion.div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.a
                    href={item.href}
                    whileHover={{ y: -2 }}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isScrolled
                        ? "text-gray-600 hover:text-[#03366D] hover:bg-gray-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 ml-1 transition-transform ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </motion.a>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-2"
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <motion.a
                            key={dropdownItem.name}
                            href="#"
                            whileHover={{ x: 4 }}
                            className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-[#DAF6F5]/20 to-[#B8F2EF]/20 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                              <dropdownItem.icon className="w-5 h-5 text-[#03366D]" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {dropdownItem.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {dropdownItem.desc}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:flex items-center space-x-3"
            >
              <Button
                className={`font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-600 hover:text-[#03366D] hover:bg-gray-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                } px-4 py-2 rounded-lg`}
              >
                Sign In
              </Button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="relative bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF] hover:from-[#B8F2EF] hover:to-[#DAF6F5] text-[#03366D] px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                  <span className="relative flex items-center">
                    Start Free Trial
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl z-50 lg:hidden border-l border-gray-200/50"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#DAF6F5] to-[#B8F2EF] rounded-2xl flex items-center justify-center">
                      <Scale className="w-5 h-5 text-[#03366D]" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">LegalMind</div>
                      <div className="text-xs text-gray-500">
                        AI Legal Assistant
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2 mb-8">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="font-medium text-gray-900 group-hover:text-[#03366D]">
                          {item.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#03366D] group-hover:translate-x-1 transition-all" />
                      </a>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <Button className="w-full bg-transparent border border-gray-200 text-gray-900 hover:bg-gray-50 py-3 rounded-xl font-medium transition-all">
                    Sign In
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-[#DAF6F5] to-[#B8F2EF] text-[#03366D] py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                    Start Free Trial
                  </Button>
                </motion.div>

                {/* Mobile Menu Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center text-sm text-gray-500">
                    Trusted by 15K+ legal professionals
                  </div>
                  <div className="flex justify-center mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles
                        key={i}
                        className="w-4 h-4 text-[#DAF6F5] fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
