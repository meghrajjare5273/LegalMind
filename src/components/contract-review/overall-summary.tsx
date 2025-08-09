"use client";

import { Paper, Box, Typography } from "@mui/material";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

export function OverallSummary({ text }: { text: string }) {
  return (
    <MotionPaper
      elevation={2}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 2 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "primary.main",
          }}
        >
          <Lightbulb color="white" size={16} />
        </Box>
        <Typography
          variant="h6"
          sx={{ color: "text.primary", fontWeight: 700 }}
        >
          Overall Summary
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", lineHeight: 1.6 }}
      >
        {text}
      </Typography>
    </MotionPaper>
  );
}
