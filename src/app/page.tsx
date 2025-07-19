/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Main Landing Page Component
export default function LegalMindLandingPage() {
  return (
    <div className="bg-[#F3F4F6] text-[#111827]">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Showcase />
        <ServicesGrid />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

// 1. Header Component
function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">LegalMind</h1>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#" className="text-gray-600 hover:text-[#FF5A36]">
            Features
          </a>
          <a href="#" className="text-gray-600 hover:text-[#FF5A36]">
            Solutions
          </a>
          <a href="#" className="text-gray-600 hover:text-[#FF5A36]">
            Pricing
          </a>
          <a href="#" className="text-gray-600 hover:text-[#FF5A36]">
            Blog
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Search className="h-5 w-5 text-gray-500 hidden md:block" />
          <Button className="bg-[#FF5A36] text-white hover:bg-[#E04A2D] rounded-full px-6">
            Request Demo
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

// 2. Hero Section Component
function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] text-white">
      {/* Replace with a high-quality background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x1080/000000/FFFFFF?text=Abstract+AI+Background')",
        }}
      />
      <div className="relative container mx-auto flex flex-col justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg font-semibold text-gray-200 mb-2">
            Welcome to LegalMind
          </p>
          <h2 className="text-5xl md:text-7xl font-bold max-w-3xl leading-tight">
            Inspired by Justice, Defined by AI Excellence.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-gray-300">
            Harness the power of AI to streamline document analysis, mitigate
            risks, and accelerate your legal research. Welcome to the future of
            law.
          </p>
          <Button className="mt-8 bg-white text-[#FF5A36] font-bold hover:bg-gray-200 rounded-full px-8 py-6">
            Explore Features <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// 3. Features Section Component
const featuresList = [
  {
    title: "AI-Powered Legal Analysis",
    description:
      "Advanced machine learning algorithms analyze complex legal documents.",
  },
  {
    title: "Lightning-Fast Document Review",
    description: "Process hundreds of pages in seconds, not hours.",
  },
  {
    title: "Smart Risk Assessment",
    description: "Identify potential legal risks before they become problems.",
  },
  {
    title: "Contract Intelligence Engine",
    description: "Extract key terms and clauses with precision accuracy.",
  },
  {
    title: "Real-Time Compliance Monitoring",
    description: "Stay ahead of regulatory changes and requirements.",
  },
  {
    title: "Case Precedent Discovery",
    description: "Find relevant case law and precedents instantly.",
  },
  {
    title: "Intelligent Legal Research",
    description: "Research complex legal topics with AI assistance.",
  },
];

function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-2">
          Intelligent Tools for Modern Legal Teams
        </h3>
        <p className="text-gray-600 mb-12">
          Empowering you with speed, accuracy, and unparalleled insight.
        </p>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold">
              Cutting-Edge Capabilities
            </h4>
            <p className="text-gray-500">
              LegalMind offers a comprehensive suite of AI-driven tools designed
              to automate tedious tasks, enhance decision-making, and give your
              firm a competitive advantage. Each feature is crafted for
              precision and efficiency.
            </p>
            <ul className="space-y-2 pt-2">
              {featuresList.slice(0, 3).map((feature) => (
                <li key={feature.title} className="flex items-center gap-2">
                  <ChevronRight className="h-5 w-5 text-[#FF5A36]" />
                  <span className="font-medium">{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Carousel className="w-full shadow-xl rounded-lg">
              <CarouselContent>
                {featuresList.map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="border-none bg-[#1F2937] text-white">
                        <CardContent className="flex flex-col justify-center p-8 aspect-video">
                          <span className="text-lg font-semibold text-[#FF5A36] mb-2">
                            Feature Focus
                          </span>
                          <p className="text-2xl font-bold mb-4">
                            {feature.title}
                          </p>
                          <p className="text-gray-300">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/20 text-white hover:bg-white/40 border-none" />
              <CarouselNext className="right-4 bg-white/20 text-white hover:bg-white/40 border-none" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. About Section Component
function About() {
  return (
    <section className="py-24 bg-[#F3F4F6]">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 inline-block bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm font-medium">
            Our Mission
          </p>
          <h3 className="text-3xl md:text-4xl font-bold leading-snug">
            Forged from a vision to democratize legal technology, we are
            committed to empowering legal professionals with transformative AI.
          </h3>
          <p className="mt-6 text-gray-600">
            We blend cutting-edge artificial intelligence with deep legal
            expertise to deliver a tool that offers unparalleled precision,
            speed, and insight, allowing you to focus on what matters most: your
            clients.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// 5. Showcase Section Component
function Showcase() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <p className="text-sm font-semibold text-[#FF5A36]">
          AI-Powered Legal Analysis
        </p>
        <div className="grid md:grid-cols-2 gap-10 items-center mt-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-96 rounded-lg overflow-hidden"
          >
            {/* Replace with a product screenshot or relevant image */}
            <img
              src="https://placehold.co/800x600/111827/FFFFFF?text=LegalMind+Dashboard"
              alt="LegalMind Dashboard"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl font-bold">
              Contract Intelligence: Uncover Insights in Seconds
            </h3>
            <p className="mt-4 text-gray-600">
              LegalMind&apos;s advanced algorithms dissect complex legal documents,
              identifying key clauses, risks, and obligations. Go from review to
              resolution faster than ever before and make data-driven decisions
              with confidence.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3">
                <ChevronRight className="h-5 w-5 text-[#FF5A36]" />
                <span className="font-medium">Automatic clause extraction</span>
              </li>
              <li className="flex items-center gap-3">
                <ChevronRight className="h-5 w-5 text-[#FF5A36]" />
                <span className="font-medium">Risk scoring and flagging</span>
              </li>
              <li className="flex items-center gap-3">
                <ChevronRight className="h-5 w-5 text-[#FF5A36]" />
                <span className="font-medium">
                  Side-by-side document comparison
                </span>
              </li>
            </ul>
            <Button className="mt-8 bg-[#FF5A36] text-white hover:bg-[#E04A2D] rounded-full px-8 py-6">
              See It In Action
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 6. Services Grid Component
const services = [
  {
    title: "Smart Risk Assessment",
    image: "https://placehold.co/600x400/CCCCCC/FFFFFF?text=Risk+Analysis",
  },
  {
    title: "Case Precedent Discovery",
    image:
      "https://placehold.co/600x400/DDEEFF/FFFFFF?text=Precedent+Discovery",
  },
  {
    title: "Real-Time Compliance",
    image:
      "https://placehold.co/600x400/EFEFEF/FFFFFF?text=Compliance+Monitoring",
  },
  {
    title: "Intelligent Research",
    image: "https://placehold.co/600x400/FFF0DD/FFFFFF?text=AI+Research",
  },
];

function ServicesGrid() {
  return (
    <section className="py-20 bg-[#F3F4F6]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-3xl font-bold">A Comprehensive AI Toolkit</h3>
            <p className="text-gray-600">For every legal need and challenge.</p>
          </div>
          <Button variant="outline" className="border-gray-400 rounded-full">
            View All Features <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="group relative h-80 rounded-lg overflow-hidden cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h4 className="text-xl font-bold">{service.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 7. CTA Section Component
function CTA() {
  return (
    <section className="bg-[#FF5A36] py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-4xl font-bold">
            Ready to Elevate Your Practice?
          </h3>
          <p className="mt-4 max-w-2xl mx-auto">
            Join hundreds of leading firms transforming their workflow with
            LegalMind. Get started today and discover the future of legal work.
          </p>
          <Button className="mt-8 bg-white text-[#FF5A36] font-bold hover:bg-gray-200 rounded-full px-10 py-7 text-lg">
            Request a Personalized Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// 8. Footer Component
function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h4 className="text-2xl font-bold text-white mb-4">LegalMind</h4>
            <p className="max-w-xs">
              The AI-powered platform for modern legal professionals.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Product</h5>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Integrations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Company</h5>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Resources</h5>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Whitepapers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  API Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2025 LegalMind. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
