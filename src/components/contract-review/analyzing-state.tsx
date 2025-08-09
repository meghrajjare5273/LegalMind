"use client";

import { Box, Paper, Typography, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

export function AnalyzingState({ filename }: { filename?: string }) {
  return (
    <MotionPaper
      elevation={2}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        p: 4,
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 700 }}>
        Analyzing your contract…
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mt: 1 }}>
        {filename
          ? `File: ${filename}`
          : "Preparing model context and extracting text"}
      </Typography>

      <Box sx={{ mt: 3 }}>
        <LinearProgress
          color="primary"
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "background.default",
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 4, display: "grid", gap: 2 }}>
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
              gridTemplateColumns: "20px 1fr",
              gap: 1.5,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "primary.main",
                animation: "pulse 1.8s ease-in-out infinite",
                animationDelay: `${i * 0.18}s`,
                "@keyframes pulse": {
                  "0%, 80%, 100%": { opacity: 0.3 },
                  "40%": { opacity: 1 },
                },
              }}
            />
            <Typography variant="body1" sx={{ color: "text.primary" }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </MotionPaper>
  );
}
