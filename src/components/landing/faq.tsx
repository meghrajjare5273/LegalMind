"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/motion-primitives/accordion";

const faqs = [
  {
    question: "What is LegalMind?",
    answer:
      "LegalMind is an AI-powered legal assistant that helps lawyers and legal professionals analyze contracts, conduct research, and ensure compliance. Our platform uses advanced artificial intelligence to provide insights that would typically take hours of manual review.",
    category: "General",
  },
  {
    question: "Can LegalMind help with lead generation?",
    answer:
      "While LegalMind is primarily focused on legal analysis and research, our platform can help you demonstrate expertise to potential clients through faster, more accurate legal work, which naturally supports business development efforts.",
    category: "Business",
  },
  {
    question: "Will LegalMind replace human lawyers?",
    answer:
      "No, LegalMind is designed to augment and enhance legal expertise, not replace it. Our AI serves as an intelligent assistant that helps lawyers work more efficiently, allowing them to focus on strategy, client relationships, and complex legal reasoning.",
    category: "General",
  },
  {
    question: "What makes LegalMind different from other AI tools?",
    answer:
      "LegalMind is specifically designed for legal professionals with features like contract risk analysis, legal precedent research, and compliance monitoring. We understand the unique needs of legal practice and have built our AI accordingly.",
    category: "Features",
  },
  {
    question: "How does LegalMind ensure data privacy and security?",
    answer:
      "We implement bank-level security measures including end-to-end encryption, secure cloud infrastructure, and strict access controls. All data is processed in compliance with legal industry standards and regulations.",
    category: "Security",
  },
  {
    question: "What types of documents can LegalMind analyze?",
    answer:
      "LegalMind can analyze various legal documents including contracts, agreements, legal briefs, compliance documents, and more. We support PDF, DOCX, and other common document formats.",
    category: "Features",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="faq"
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <span className="text-black font-bold tracking-[0.2em] text-sm uppercase block mb-4">
              QUESTIONS YOU MAY HAVE
            </span>
            <h2 className="font-extrabold tracking-tight text-slate-800 text-4xl md:text-6xl leading-tight mb-6">
              Frequently Asked <span className="text-gold">Questions</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-xl leading-relaxed">
              Everything you need to know about LegalMind and how it can
              transform your legal practice.
            </p>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Accordion
            className="flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700"
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="py-1"
              >
                <AccordionTrigger className="w-full text-left px-4 md:px-5 py-3 text-zinc-950 dark:text-zinc-50">
                  <div className="group flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Badge
                        variant="secondary"
                        className="shrink-0 bg-slate-100 text-slate-600 font-semibold text-xs group-data-[expanded]:bg-gold group-data-[expanded]:text-white transition-colors duration-200"
                      >
                        {faq.category}
                      </Badge>
                      <h6 className="font-semibold text-slate-900 truncate group-data-[expanded]:text-black transition-colors duration-200 text-lg">
                        {faq.question}
                      </h6>
                    </div>
                    <svg
                      className="h-5 w-5 text-zinc-600 dark:text-zinc-300 transition-transform duration-200 group-data-[expanded]:rotate-180 will-change-transform shrink-0"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7 10l5 5 5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="overflow-hidden">
                  <div className="px-4 md:px-5 pb-4 pt-1">
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
