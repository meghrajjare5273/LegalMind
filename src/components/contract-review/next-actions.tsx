"use client";

import { Paper, Box, Typography, Button as MuiButton } from "@mui/material";
import { Download, RotateCcw, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

type NextActionsProps = {
  onReset?: () => void;
};

export function NextActions({ onReset }: NextActionsProps) {
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
      <Typography
        variant="h6"
        sx={{ color: "text.primary", fontWeight: 700, mb: 1 }}
      >
        Next Actions
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
        Choose what you&apos;d like to do with these results.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <MuiButton
          startIcon={<Download size={16} />}
          disabled
          variant="outlined"
          sx={{
            borderColor: "divider",
            color: "text.secondary",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "primary.light",
              color: "white",
            },
          }}
        >
          Export PDF (coming soon)
        </MuiButton>

        <MuiButton
          component="a"
          href="/chat"
          startIcon={<MessageSquare size={16} />}
          variant="contained"
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Discuss in Chat
        </MuiButton>

        <MuiButton
          startIcon={<RotateCcw size={16} />}
          onClick={onReset}
          variant="outlined"
          sx={{
            borderColor: "divider",
            color: "text.primary",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "primary.light",
              color: "white",
            },
          }}
        >
          Start new review
        </MuiButton>
      </Box>
    </MotionPaper>
  );
}
