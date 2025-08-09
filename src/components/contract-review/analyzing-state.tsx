"use client";

import { Box, Paper, Typography, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

export function AnalyzingState({ filename }: { filename?: string }) {
  return (
    <MotionPaper
      elevation={0}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
      }}
    >
      <Typography variant="h6" sx={{ color: "white", fontWeight: 800 }}>
        Analyzing your contract…
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.75)", mt: 0.5 }}
      >
        {filename
          ? `File: ${filename}`
          : "Preparing model context and extracting text"}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <LinearProgress
          color="primary"
          sx={{
            height: 8,
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            "& .MuiLinearProgress-bar": {
              borderRadius: 999,
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 3, display: "grid", gap: 1.25 }}>
        {[
          "Parsing text",
          "Detecting sections",
          "Assessing risks",
          "Compiling recommendations",
        ].map((label, i) => (
          <Box
            key={label}
            sx={{
              display: "grid",
              gridTemplateColumns: "16px 1fr",
              gap: 1,
              alignItems: "center",
              opacity: 0.85,
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                animation: "pulse 1.8s ease-in-out infinite",
                animationDelay: `${i * 0.18}s`,
                "@keyframes pulse": {
                  "0%, 80%, 100%": { opacity: 0.3 },
                  "40%": { opacity: 1 },
                },
              }}
            />
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </MotionPaper>
  );
}
