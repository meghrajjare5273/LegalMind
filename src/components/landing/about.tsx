"use client";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            About Us
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
            Founded on a passion for innovation and a commitment to
            sustainability, we are a diverse team of{" "}
            <span className="text-[#FF6B35]">legal experts</span> who approach
            every project with creativity, integrity, and a deep respect for the
            law.
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            We believe that technology should enhance human expertise, not
            replace it. Our AI-powered tools are designed to amplify the
            capabilities of legal professionals, enabling them to deliver better
            outcomes for their clients while maintaining the highest standards
            of legal practice.
          </p>

          {/* Color Pop Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-2xl p-12 text-white shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-6">
              Transforming Legal Practice Through Innovation
            </h3>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Our commitment extends beyond technology – we&apos;re building the
              future of legal work, where artificial intelligence amplifies
              human expertise and enables legal professionals to focus on what
              matters most: delivering justice and serving their clients.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { number: "99.7%", label: "Accuracy Rate" },
                { number: "10,000+", label: "Legal Professionals" },
                { number: "50+", label: "Countries Served" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
