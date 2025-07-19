"use client";
import { Scale } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-xl flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white">LegalMind</h4>
            </Link>
            <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
              Mastering the Art of Legal Technology
            </p>
            <p className="text-sm text-gray-500">
              © 2025 LegalMind. All rights reserved.
            </p>
          </div>

          {/* Links Sections */}
          <div>
            <h5 className="font-bold text-white mb-6">Product</h5>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="hover:text-white transition-colors"
                >
                  AI Chat
                </Link>
              </li>
              <li>
                <Link
                  href="/contract-review"
                  className="hover:text-white transition-colors"
                >
                  Contract Review
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-6">Company</h5>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="#about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-6">Support</h5>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API Docs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
