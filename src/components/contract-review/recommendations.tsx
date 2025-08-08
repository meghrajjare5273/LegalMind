"use client";

import { Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

export function Recommendations({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <MotionPaper
      elevation={0}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        p: 2,
        borderRadius: 2,
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Typography variant="h6" sx={{ color: "white", fontWeight: 800 }}>
        Recommendations
      </Typography>
      <Box sx={{ mt: 1 }}>
        {items.map((rec, i) => (
          <Box
            key={i}
            sx={{ display: "flex", gap: 1, alignItems: "flex-start", mt: 1 }}
          >
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 800 }}
            >
              {i + 1}.
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
              {rec}
            </Typography>
          </Box>
        ))}
      </Box>
    </MotionPaper>
  );
}
