"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Scale,
  FileText,
  Shield,
  Users,
  Briefcase,
  GraduationCap,
  Building,
  UserCheck,
} from "lucide-react";

export function Services() {
  const [activeTab, setActiveTab] = useState("individuals");

  const tabs = [
    { id: "individuals", label: "Individuals", icon: UserCheck },
    { id: "businesses", label: "Small Businesses", icon: Building },
    { id: "professionals", label: "Legal Professionals", icon: Briefcase },
    { id: "students", label: "Law Students", icon: GraduationCap },
  ];

  const services = {
    individuals: [
      {
        icon: Scale,
        title: "Contract Review",
        description:
          "Get your contracts analyzed for potential risks and unfavorable terms",
        features: [
          "Risk identification",
          "Plain English explanations",
          "Negotiation tips",
        ],
      },
      {
        icon: FileText,
        title: "Legal Document Drafting",
        description: "Create legally sound documents with AI assistance",
        features: ["Template library", "Custom clauses", "Compliance checking"],
      },
      {
        icon: Shield,
        title: "Legal Consultation",
        description: "Get instant answers to your legal questions",
        features: [
          "24/7 availability",
          "Expert-backed responses",
          "Case precedents",
        ],
      },
      {
        icon: Users,
        title: "Family Law Guidance",
        description: "Navigate family legal matters with confidence",
        features: ["Divorce proceedings", "Child custody", "Estate planning"],
      },
    ],
    businesses: [
      {
        icon: Building,
        title: "Business Formation",
        description: "Set up your business structure correctly from the start",
        features: [
          "Entity selection",
          "Registration assistance",
          "Compliance setup",
        ],
      },
      {
        icon: FileText,
        title: "Employment Law",
        description: "Ensure your HR practices are legally compliant",
        features: [
          "Policy creation",
          "Contract templates",
          "Dispute resolution",
        ],
      },
      {
        icon: Shield,
        title: "Intellectual Property",
        description: "Protect your business assets and innovations",
        features: [
          "Trademark search",
          "Patent guidance",
          "Copyright protection",
        ],
      },
      {
        icon: Scale,
        title: "Commercial Contracts",
        description: "Draft and review business agreements",
        features: [
          "Vendor agreements",
          "Service contracts",
          "Partnership deals",
        ],
      },
    ],
    professionals: [
      {
        icon: Briefcase,
        title: "Case Research",
        description: "Accelerate your legal research with AI",
        features: ["Precedent analysis", "Statute lookup", "Citation checking"],
      },
      {
        icon: FileText,
        title: "Document Automation",
        description: "Streamline document creation and review",
        features: [
          "Template generation",
          "Bulk processing",
          "Quality assurance",
        ],
      },
      {
        icon: Users,
        title: "Client Communication",
        description: "Enhance client service with AI insights",
        features: ["Case summaries", "Progress updates", "Risk assessments"],
      },
      {
        icon: Shield,
        title: "Compliance Monitoring",
        description: "Stay updated with changing regulations",
        features: [
          "Regulatory alerts",
          "Compliance checklists",
          "Risk monitoring",
        ],
      },
    ],
    students: [
      {
        icon: GraduationCap,
        title: "Legal Writing",
        description: "Improve your legal writing skills",
        features: ["Structure guidance", "Citation help", "Style checking"],
      },
      {
        icon: Scale,
        title: "Case Analysis",
        description: "Learn to analyze cases effectively",
        features: [
          "Issue identification",
          "Rule application",
          "Conclusion drafting",
        ],
      },
      {
        icon: FileText,
        title: "Research Skills",
        description: "Master legal research techniques",
        features: [
          "Database navigation",
          "Source evaluation",
          "Research strategy",
        ],
      },
      {
        icon: Users,
        title: "Exam Preparation",
        description: "Prepare for law school exams and bar",
        features: [
          "Practice questions",
          "Study guides",
          "Performance tracking",
        ],
      },
    ],
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-[#DAF6F5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#DAF6F5] border border-[#B8F2EF] rounded-full text-[#03366D] text-sm font-medium mb-6">
            Our Services
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-[#0A2536] mb-6">
            Perfect for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03366D] to-[#0A2536]">
              everyone
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you&apos;re an individual, business owner, legal professional, or
            student, our AI-powered platform adapts to your specific needs.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#03366D] to-[#0A2536] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services[activeTab as keyof typeof services].map(
            (service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#03366D]/10 to-[#0A2536]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <div className="relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-[#DAF6F5] transition-all duration-300 shadow-lg hover:shadow-xl h-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#DAF6F5] to-[#B8F2EF] rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-[#0A2536]" />
                    </div>

                    <h3 className="text-xl font-bold text-[#0A2536] mb-3">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-500"
                        >
                          <div className="w-1.5 h-1.5 bg-[#03366D] rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            }
          )}
        </motion.div>
      </div>
    </section>
  );
}
