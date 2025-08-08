"use client";

import React from "react";
import {
  Paper,
  Box,
  Typography,
  Button as MuiButton,
  Chip,
} from "@mui/material";
import { Upload, Loader2 } from "lucide-react";
import { palette } from "./tokens";
import { motion } from "framer-motion";

type Props = {
  file: File | null;
  isLoading: boolean;
  error?: string | null;
  onPick: () => void;
  onAnalyze: () => void;
};

const MotionPaper = motion(Paper);

export function UploadCard({
  file,
  isLoading,
  error,
  onPick,
  onAnalyze,
}: Props) {
  return (
    <MotionPaper
      elevation={0}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        p: { xs: 2, md: 3 },
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 2,
        backdropFilter: "blur(6px)",
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "white", fontWeight: 800, mb: 0.5 }}
      >
        Upload PDF Contract
      </Typography>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.72)" }}>
        Drop a PDF or click to select. We’ll extract and analyze risks, sections
        and recommendations.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mt: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <MuiButton
          variant="contained"
          onClick={onPick}
          startIcon={<Upload size={16} />}
          sx={{
            background: `linear-gradient(90deg, ${palette.navy}, ${palette.deep})`,
            color: "white",
            px: 2,
            py: 1,
            "&:hover": { opacity: 0.95 },
          }}
        >
          Select PDF
        </MuiButton>
        <MuiButton
          color="inherit"
          variant="outlined"
          disabled={!file || isLoading}
          onClick={onAnalyze}
          startIcon={
            isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Upload size={14} />
            )
          }
          sx={{
            borderColor: "rgba(255,255,255,0.06)",
            color: "white",
            px: 2,
            py: 1,
          }}
        >
          {isLoading ? "Analyzing..." : "Analyze Contract"}
        </MuiButton>
        {file && (
          <Chip
            label={file.name}
            size="small"
            sx={{
              color: "rgba(255,255,255,0.9)",
              bgcolor: "rgba(255,255,255,0.06)",
            }}
          />
        )}
      </Box>

      {error && (
        <Box sx={{ mt: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              bgcolor: "rgba(255,0,0,0.04)",
              border: "1px solid rgba(255,0,0,0.08)",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: "#ff6b6b" }}>
              {error}
            </Typography>
          </Paper>
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)" }}>
          Tips
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
          <Chip label="PDF only" size="small" />
          <Chip label="Confidential" size="small" />
          <Chip label="Fast results" size="small" />
        </Box>
      </Box>
    </MotionPaper>
  );
}
