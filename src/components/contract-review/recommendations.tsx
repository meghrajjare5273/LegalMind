"use client";

import { Paper, Typography, Box } from "@mui/material";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

export function Recommendations({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;

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
            backgroundColor: "success.main",
          }}
        >
          <CheckCircle color="white" size={16} />
        </Box>
        <Typography
          variant="h6"
          sx={{ color: "text.primary", fontWeight: 700 }}
        >
          Recommendations
        </Typography>
      </Box>
      <Box sx={{ display: "grid", gap: 1.5 }}>
        {items.map((rec, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "flex-start",
              p: 2,
              backgroundColor: "background.default",
              borderRadius: 1,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                minWidth: 24,
              }}
            >
              {i + 1}.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                lineHeight: 1.6,
              }}
            >
              {rec}
            </Typography>
          </Box>
        ))}
      </Box>
    </MotionPaper>
  );
}
