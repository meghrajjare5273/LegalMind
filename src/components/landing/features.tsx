"use client";

import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Chip,
  Avatar,
  AvatarGroup,
  Stack,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";

const MotionPaper = motion(Paper);

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function CodeSnippetBlock() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.secondary.main,
        color: "rgba(255,255,255,0.92)",
        borderRadius: 2,
        p: 2,
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: 12,
        lineHeight: 1.7,
        border: `1px solid ${theme.palette.secondary.light}`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        overflowX: "auto",
      }}
      aria-label="Example code snippet"
    >
      {`import { Draft } from '@legalmind/ai'
const clause = await Draft.clause({
  governingLaw: 'India',
  jurisdiction: 'Delhi',
})
// → Clear, enforceable clause with citations`}
    </Box>
  );
}

function FileIconsRow() {
  const item = (src: string, label: string) => (
    <Stack alignItems="center" spacing={1} role="listitem">
      <Box
        sx={{
          width: 84,
          height: 84,
          borderRadius: 2,
          bgcolor: "#fff",
          // boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={`${label} icon`}
          width={56}
          height={56}
          style={{ display: "block", border: "#fff", position: "absolute" }}
        />
      </Box>
      <Typography
        variant="body2"
        sx={{ fontWeight: 700, color: "text.secondary" }}
      >
        {label}
      </Typography>
    </Stack>
  );

  return (
    <Stack
      direction="row"
      spacing={3}
      role="list"
      aria-label="Supported file types"
      sx={{ flexWrap: "wrap" }}
    >
      {item("/csv.svg", "CSV")}
      {item("/pdf.svg", "PDF")}
      {item("/doc.svg", "DOCX")}
    </Stack>
  );
}

function AgentsAvatars() {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Chip
        icon={
          <StarIcon
            sx={{ color: `${theme.palette.primary.main} !important` }}
          />
        }
        label="Expert copywriter"
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1.5,
          fontWeight: 600,
          border: (t) => `1px solid ${t.palette.divider}`,
        }}
      />
      <AvatarGroup
        max={6}
        sx={{ "& .MuiAvatar-root": { width: 36, height: 36 } }}
      >
        <Avatar alt="Agent 1" src="/agent-avatar-1.png" />
        <Avatar alt="Agent 2" src="/agent-avatar-2.png" />
        <Avatar alt="Agent 3" src="/agent-avatar-3.png" />
        <Avatar alt="Agent 4" src="/agent-avatar-4.png" />
        <Avatar alt="Agent 5" src="/agent-avatar-5.png" />
      </AvatarGroup>
    </Stack>
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
      <ModelChip label="Gemini 2.0" iconSrc="/gemini.svg" active />
      <ModelChip label="SAND‑4" />
    </Stack>
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
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{ textAlign: "left", mb: 4 }}
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

        {/* Row 1 */}
        <Grid
          container
          spacing={3}
          columns={12}
          sx={
            {
              mb: 1,
              "--card-hover-raise": "-4px",
            } as React.CSSProperties
          }
        >
          <Grid size={{ xs: 12, md: 7 }}>
            <MotionPaper
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
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
                position: "relative",
                "&:hover": {
                  zIndex: 2,
                  boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
                  borderColor: theme.palette.grey[300],
                },
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  size="small"
                  color="primary"
                  icon={<CheckIcon />}
                  label=""
                  sx={{ color: "#fff", fontWeight: 700 }}
                />
              </Stack>
              <CodeSnippetBlock />
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    mt: 1,
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Precision contract drafting
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Generate clear, enforceable clauses and compliant language
                  tailored to your jurisdiction—reduce rework and ship faster.
                </Typography>
              </Box>
            </MotionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <MotionPaper
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
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
                position: "relative",
                "&:hover": {
                  zIndex: 2,
                  boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
                  borderColor: theme.palette.grey[300],
                },
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileIconsRow />
              </Box>
              <Box>
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
              transition={{ duration: 0.45, ease: "easeOut" }}
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
                position: "relative",
                "&:hover": {
                  zIndex: 2,
                  boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
                  borderColor: theme.palette.grey[300],
                },
              }}
            >
              <AgentsAvatars />
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Personalized AI Agents
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Specialized agents for contract review, legal research, and
                  compliance—designed to excel in specific practice areas.
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
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
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
                position: "relative",
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
                  Harness GPT‑4o, Claude 3.5, and Gemini 2.0 for contextual,
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
