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
      elevation={2}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        p: { xs: 3, md: 4 },
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "text.primary", fontWeight: 700, mb: 1 }}
      >
        Upload PDF Contract
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
        Drop a PDF or click to select. We&apos;ll extract and analyze risks, sections
        and recommendations.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <MuiButton
          variant="contained"
          onClick={onPick}
          startIcon={<Upload size={16} />}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            px: 3,
            py: 1.5,
            "&:hover": { backgroundColor: "primary.dark" },
          }}
        >
          Select PDF
        </MuiButton>
        <MuiButton
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
            borderColor: "divider",
            color: "text.primary",
            px: 3,
            py: 1.5,
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "primary.light",
              color: "white",
            },
          }}
        >
          {isLoading ? "Analyzing..." : "Analyze Contract"}
        </MuiButton>
        {file && (
          <Chip
            label={file.name}
            size="medium"
            sx={{
              color: "text.primary",
              backgroundColor: "background.default",
              border: 1,
              borderColor: "divider",
            }}
          />
        )}
      </Box>

      {error && (
        <Box sx={{ mt: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: "error.light",
              border: 1,
              borderColor: "error.main",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: "error.dark" }}>
              {error}
            </Typography>
          </Paper>
        </Box>
      )}

      <Box sx={{ mt: 3 }}>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontWeight: 600 }}
        >
          Features
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
          <Chip label="PDF only" size="small" variant="outlined" />
          <Chip label="Confidential" size="small" variant="outlined" />
          <Chip label="Fast results" size="small" variant="outlined" />
        </Box>
      </Box>
    </MotionPaper>
  );
}
