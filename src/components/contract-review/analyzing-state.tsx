"use client";

import { Box, Paper, Typography, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

export function AnalyzingState({ filename }: { filename?: string }) {
  return (
    <MotionPaper
      elevation={1}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        p: 4,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "grey.200",
        backgroundColor: "background.paper",
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          color: "text.primary", 
          fontWeight: 700,
          mb: 1
        }}
      >
        Analyzing your contract…
      </Typography>
      <Typography
        variant="body1"
        sx={{ 
          color: "text.secondary", 
          mb: 3,
          lineHeight: 1.6
        }}
      >
        {filename
          ? `File: ${filename}`
          : "Preparing model context and extracting text"}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <LinearProgress
          color="primary"
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "grey.200",
          }}
        />
      </Box>

      <Box sx={{ display: "grid", gap: 2 }}>
        {[
          "Parsing text",
          "Detecting sections", 
          "Assessing risks",
          "Compiling recommendations",
        ].map((label, i) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
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
            <Typography 
              variant="body2" 
              sx={{ 
                color: "text.secondary",
                fontWeight: 500
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </MotionPaper>
  );
}
