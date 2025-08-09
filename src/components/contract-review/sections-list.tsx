"use client";

import { Paper, Box, Typography, Chip } from "@mui/material";
import type { ContractSection } from "@/services/api";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

export function SectionsList({ items }: { items: ContractSection[] }) {
  if (items.length === 0) {
    return (
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        No sections detected.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {items.map((section, idx) => (
        <MotionPaper
          key={idx}
          elevation={1}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: idx * 0.03 }}
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
            border: 1,
            borderColor: "divider",
            "&:hover": {
              boxShadow: 3,
              borderColor: "primary.light",
            },
            transition: "all 0.2s ease",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "text.primary", fontWeight: 700 }}
            >
              {section.title}
            </Typography>
            <Chip
              label={`${section.risk_count} risks`}
              size="small"
              sx={{
                bgcolor:
                  section.risk_count > 0 ? "error.light" : "success.light",
                color: section.risk_count > 0 ? "error.dark" : "success.dark",
                fontWeight: 600,
              }}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{ color: "text.secondary", lineHeight: 1.6 }}
          >
            {section.content}
          </Typography>
        </MotionPaper>
      ))}
    </Box>
  );
}
