"use client";

import { Paper, Box, Typography } from "@mui/material";
import { Lightbulb } from "lucide-react";
import { palette } from "./tokens";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

export function OverallSummary({ text }: { text: string }) {
  return (
    <MotionPaper
      elevation={0}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid rgba(255,255,255,0.06)",
        background:
          "linear-gradient(90deg, rgba(255,243,205,0.04), rgba(255,255,255,0.01))",
      }}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Lightbulb color={palette.mint} size={18} />
        <Typography
          variant="subtitle1"
          sx={{ color: "white", fontWeight: 800 }}
        >
          Overall Summary
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.78)", mt: 1 }}
      >
        {text}
      </Typography>
    </MotionPaper>
  );
}
