/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      company: "TechStart Inc.",
      content:
        "LegalMind has been a game-changer for my startup. The AI caught contract issues that could have cost me thousands. It's like having a legal expert available 24/7.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      role: "Freelance Consultant",
      company: "Chen Consulting",
      content:
        "As someone who works with multiple clients, I need quick legal guidance. LegalMind's document analysis has saved me hours of research and given me confidence in my contracts.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Emily Rodriguez",
      role: "Real Estate Investor",
      company: "Rodriguez Properties",
      content:
        "The real estate guidance is incredibly detailed. I've used LegalMind for lease agreements and purchase contracts - it's become an essential part of my due diligence process.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#DAF6F5] border border-[#B8F2EF] rounded-full text-[#03366D] text-sm font-medium mb-6">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-[#0A2536] mb-6">
            Why users{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03366D] to-[#0A2536]">
              love us
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#03366D]/10 to-[#0A2536]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-[#DAF6F5] transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#DAF6F5]"
                  />
                  <div>
                    <h4 className="text-[#0A2536] font-bold text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <p className="text-[#03366D] text-sm font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#DAF6F5] fill-current"
                    />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#DAF6F5] mb-4 opacity-50" />

                <p className="text-gray-700 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
