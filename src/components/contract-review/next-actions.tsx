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
      elevation={0}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        p: 3,
        borderRadius: 2,
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Typography variant="h6" sx={{ color: "white", fontWeight: 800 }}>
        Next actions
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.78)", mt: 0.5 }}
      >
        Choose what you’d like to do with these results.
      </Typography>

      <Box sx={{ mt: 2, display: "flex", gap: 1.25, flexWrap: "wrap" }}>
        <MuiButton
          startIcon={<Download size={16} />}
          disabled
          sx={{
            borderColor: "rgba(255,255,255,0.16)",
            color: "white",
            textTransform: "none",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          Export PDF (coming soon)
        </MuiButton>

        <MuiButton
          component="a"
          href="/chat"
          startIcon={<MessageSquare size={16} />}
          sx={{
            background: "white",
            color: "black",
            textTransform: "none",
            "&:hover": { background: "rgba(255,255,255,0.9)" },
          }}
        >
          Discuss in Chat
        </MuiButton>

        <MuiButton
          startIcon={<RotateCcw size={16} />}
          onClick={onReset}
          sx={{
            color: "white",
            textTransform: "none",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
          variant="outlined"
        >
          Start new review
        </MuiButton>
      </Box>
    </MotionPaper>
  );
}
