"use client";
import { Box, Container, Typography, Chip } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
    <Box
      id="faq"
      component="section"
      ref={ref}
      sx={{
        py: { xs: 10, md: 15 },
        background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: 2,
                mb: 2,
                display: "block",
              }}
            >
              QUESTIONS YOU MAY HAVE
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "secondary.main",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              Frequently Asked{" "}
              <Box component="span" sx={{ color: "#b08d28" }}>
                Questions
              </Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto", fontSize: "1.2rem" }}
            >
              Everything you need to know about LegalMind and how it can
              transform your legal practice.
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Accordion
            className="flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-700"
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                // If using divide-y, keep borders off the item
                className="py-1"
              >
                <AccordionTrigger className="w-full text-left px-4 md:px-5 py-3 text-zinc-950 dark:text-zinc-50">
                  <div className="group flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Chip
                        label={faq.category}
                        size="small"
                        className="shrink-0 group-data-[expanded]:bg-blue-600 group-data-[expanded]:text-white"
                        sx={{
                          bgcolor: "grey.100",
                          color: "text.secondary",
                          fontWeight: 600,
                          transition:
                            "background-color 200ms ease, color 200ms ease",
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "text.primary" }}
                        className="truncate group-data-[expanded]:text-blue-600"
                      >
                        {faq.question}
                      </Typography>
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

                {/* Animated wrapper should NOT have padding; keep overflow-hidden */}
                <AccordionContent className="overflow-hidden">
                  {/* Static padding and spacing live here */}
                  <div className="px-4 md:px-5 pb-4 pt-1">
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7, fontSize: "1.05rem" }}
                    >
                      {faq.answer}
                    </Typography>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Container>
    </Box>
  );
}
