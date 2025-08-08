"use client";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import { motion, useInView } from "framer-motion";
import { ExpandMore } from "@mui/icons-material";
import { useRef, useState } from "react";

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
  const [expanded, setExpanded] = useState<string | false>(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      id="faq"
      component="section"
      ref={ref}
      sx={{
        py: { xs: 10, md: 15 },
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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
              <Box component="span" sx={{ color: "primary.main" }}>
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
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor:
                    expanded === `panel${index}` ? "primary.main" : "grey.200",
                  boxShadow:
                    expanded === `panel${index}`
                      ? "0 8px 32px rgba(255, 68, 68, 0.15)"
                      : "0 2px 8px rgba(0,0,0,0.05)",
                  "&:before": { display: "none" },
                  transition: "all 0.3s ease",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    py: 2,
                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",
                      gap: 2,
                    },
                  }}
                >
                  <Chip
                    label={faq.category}
                    size="small"
                    sx={{
                      bgcolor:
                        expanded === `panel${index}`
                          ? "primary.main"
                          : "grey.100",
                      color:
                        expanded === `panel${index}`
                          ? "white"
                          : "text.secondary",
                      fontWeight: 600,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color:
                        expanded === `panel${index}`
                          ? "primary.main"
                          : "text.primary",
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7, fontSize: "1.1rem" }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
