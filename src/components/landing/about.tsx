"use client";
import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <Box sx={{ py: 12, backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                gutterBottom
                sx={{ color: "secondary.main" }}
              >
                Crafting Legal Intelligence
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, color: "text.secondary" }}
              >
                Founded on a passion for innovation and a commitment to legal
                excellence, LegalMind represents a new era of legal technology.
                Our diverse team of legal experts and AI researchers approach
                every challenge with creativity, integrity, and deep respect for
                the legal profession.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We believe that artificial intelligence should amplify human
                expertise, not replace it. That&apos;s why LegalMind is designed
                to enhance your legal practice while maintaining the highest
                standards of confidentiality and accuracy.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: 4,
                  p: 4,
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Legal Innovation Metrics
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  99.7% Accuracy
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  Document analysis precision rate
                </Typography>

                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  500x Faster
                </Typography>
                <Typography variant="body2">
                  Document processing speed vs. manual review
                </Typography>

                {/* Decorative element */}
                <Box
                  aria-hidden="true"
                  role="presentation"
                  sx={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
