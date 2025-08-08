"use client";

import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Chip,
  Stack,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";

const MotionPaper = motion(Paper);

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function TiltedFileDeck() {
  // Three tilted, overlapping file tiles resembling CSV/PDF/DOC
  const Tile = ({
    label,
    color,
    rotate,
    zIndex,
    offsetX,
  }: {
    label: string;
    color: string;
    rotate: number;
    zIndex: number;
    offsetX: number;
  }) => (
    <Box
      aria-label={`${label} tile`}
      sx={{
        width: { xs: 84, md: 108 },
        height: { xs: 108, md: 132 },
        borderRadius: 3,
        background: color,
        color: "white",
        display: "grid",
        placeItems: "center",
        fontWeight: 800,
        letterSpacing: 1,
        fontSize: { xs: 18, md: 22 },
        transform: `rotate(${rotate}deg) translateX(${offsetX}px)`,
        boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
        position: "relative",
        zIndex,
        border: "1px solid rgba(255,255,255,0.18)",
      }}
    >
      {label}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "32%",
          height: "26%",
          bgcolor: "rgba(255,255,255,0.25)",
          borderBottomLeftRadius: 8,
          clipPath: "polygon(0 0, 100% 0, 100% 100%)",
        }}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: 260, md: 340 },
        height: { xs: 140, md: 170 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        mx: "auto",
      }}
    >
      <Tile label="CSV" color="#22c55e" rotate={-10} zIndex={3} offsetX={24} />
      <Tile label="PDF" color="#ef4444" rotate={8} zIndex={2} offsetX={-8} />
      <Tile label="DOC" color="#2563eb" rotate={-4} zIndex={1} offsetX={-40} />
    </Box>
  );
}

export default function FeaturesSection() {
  const theme = useTheme();

  return (
    <Box
      id="features"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "radial-gradient(1200px 400px at 50% -200px, rgba(0,0,0,0.04), transparent), linear-gradient(180deg, #faf7f2 0%, #f6f3ee 100%)",
        position: "relative",
        isolation: "isolate",
      }}
    >
      <Container maxWidth="lg">
        {/* Section header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: "left", mb: { xs: 4, md: 6 } }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            POWERFUL FEATURES
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "secondary.main",
              fontSize: { xs: "2rem", md: "2.75rem" },
              lineHeight: 1.15,
            }}
          >
            Modern features that feel effortless
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 700 }}
          >
            Draft with confidence, upload securely, work with specialized
            agents, and chat with top models—purpose‑built for legal work.
          </Typography>
        </Box>

        {/* Row */}
        <Grid container spacing={3} columns={12} sx={{ mb: 1 }}>
          {/* Replaced “code” card with product-relevant content */}
          <Grid size={{ xs: 12, md: 7 }}>
            <MotionPaper
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4 }}
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                background: "linear-gradient(180deg, #ffffff, #fbfbfc)",
                border: (t) => `1px solid ${t.palette.divider}`,
                borderRadius: 3,
                transition:
                  "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
                "&:hover": {
                  zIndex: 2,
                  boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
                  borderColor: theme.palette.grey[300],
                },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Chip
                  size="small"
                  color="primary"
                  icon={<CheckIcon />}
                  label="Citations & compliance"
                  sx={{ color: "#fff", fontWeight: 700 }}
                />
                <Chip
                  size="small"
                  variant="outlined"
                  label="Jurisdiction aware"
                />
                <Chip size="small" variant="outlined" label="Redlines" />
              </Stack>

              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    mt: 1,
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Precision contract insights
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Identify high‑risk clauses, get negotiation strategies, and
                  generate enforceable alternatives with clear citations.
                </Typography>

                <Stack
                  spacing={1}
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <CheckIcon fontSize="small" color="success" />
                    <span>Risk scoring with HIGH / MEDIUM / LOW levels</span>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <CheckIcon fontSize="small" color="success" />
                    <span>Clause replacements with jurisdictional notes</span>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <CheckIcon fontSize="small" color="success" />
                    <span>One‑click overall summary and recommendations</span>
                  </Box>
                </Stack>
              </Box>
            </MotionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <MotionPaper
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              whileHover={{ y: -4 }}
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                background: "linear-gradient(180deg, #ffffff, #fbfbfc)",
                border: (t) => `1px solid ${t.palette.divider}`,
                borderRadius: 3,
                transition:
                  "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
                "&:hover": {
                  zIndex: 2,
                  boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
                  borderColor: theme.palette.grey[300],
                },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TiltedFileDeck />
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Seamless File Handling
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Upload PDFs and DOCX, parse CSV data, and keep everything
                  organized. Your documents stay secure and accessible.
                </Typography>
              </Box>
            </MotionPaper>
          </Grid>
        </Grid>

        {/* Row 2 */}
        <Grid container spacing={3} columns={12}>
          <Grid size={{ xs: 12, md: 5 }}>
            <MotionPaper
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4 }}
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                background: "linear-gradient(180deg, #ffffff, #fbfbfc)",
                border: (t) => `1px solid ${t.palette.divider}`,
                borderRadius: 3,
                "&:hover": {
                  zIndex: 2,
                  boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
                  borderColor: theme.palette.grey[300],
                },
              }}
            >
              <Stack direction="row" spacing={1.5}>
                <Chip size="small" label="Research" />
                <Chip size="small" label="Citations" />
                <Chip size="small" label="Context windows" />
              </Stack>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Specialized legal agents
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Contract review, legal research, and compliance agents tuned
                  for your practice areas.
                </Typography>
              </Box>
            </MotionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <MotionPaper
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              whileHover={{ y: -4 }}
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                background: "linear-gradient(180deg, #ffffff, #fbfbfc)",
                border: (t) => `1px solid ${t.palette.divider}`,
                borderRadius: 3,
                "&:hover": {
                  zIndex: 2,
                  boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
                  borderColor: theme.palette.grey[300],
                },
              }}
            >
              <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                <ModelsRow />
              </Box>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Intelligent conversational AI
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Harness GPT‑4o, Claude 3.5, and Gemini 1.5 for contextual,
                  cited guidance that accelerates drafting and strategy.
                </Typography>
              </Box>
            </MotionPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function ModelChip({
  label,
  active,
  iconSrc,
}: {
  label: string;
  active?: boolean;
  iconSrc?: string;
}) {
  return (
    <Chip
      label={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {iconSrc ? (
            <Image
              src={iconSrc || "/placeholder.svg"}
              alt={`${label} logo`}
              width={16}
              height={16}
              style={{ display: "block" }}
            />
          ) : null}
          <span>{label}</span>
        </Box>
      }
      sx={{
        px: 1.25,
        height: 36,
        borderRadius: 2,
        fontWeight: 700,
        letterSpacing: 0.2,
        bgcolor: active ? "secondary.main" : "background.default",
        color: active ? "#fff" : "text.secondary",
        border: (t) =>
          `1px solid ${active ? t.palette.secondary.main : t.palette.divider}`,
        transition: "all .2s ease",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: active
            ? "0 10px 24px rgba(0,0,0,0.12)"
            : "0 10px 24px rgba(0,0,0,0.06)",
        },
      }}
    />
  );
}

function ModelsRow() {
  return (
    <Stack direction="row" spacing={1.5} flexWrap="wrap" aria-label="Models">
      <ModelChip label="AI Claude 3.5" iconSrc="/claude.svg" />
      <ModelChip label="GPT‑4o" iconSrc="/gpt.svg" />
      {/* <ModelChip label="SAND‑4"  /> */}
      <ModelChip label="Gemini 2.0" iconSrc="/gemini.svg" />
    </Stack>
  );
}
