"use client";

import { Paper, Box, Typography, Chip } from "@mui/material";
import type { ContractSection } from "@/services/api";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

export function SectionsList({ items }: { items: ContractSection[] }) {
  if (items.length === 0) {
    return (
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
        No sections detected.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {items.map((section, idx) => (
        <MotionPaper
          key={idx}
          elevation={0}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: idx * 0.03 }}
          sx={{
            p: 2,
            borderRadius: 1.5,
            border: "1px solid rgba(255,255,255,0.06)",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.14), rgba(0,0,0,0.08))",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: 800 }}
            >
              {section.title}
            </Typography>
            <Chip
              label={`${section.risk_count} risks`}
              size="small"
              sx={{ bgcolor: "rgba(255,255,255,0.06)" }}
            />
          </Box>

          <Typography
            variant="body2"
            sx={{ mt: 1, color: "rgba(255,255,255,0.8)" }}
          >
            {section.content}
          </Typography>
        </MotionPaper>
      ))}
    </Box>
  );
}
