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
      elevation={1}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "grey.200",
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "text.primary",
          fontWeight: 700,
          mb: 1,
          fontSize: { xs: "1.25rem", md: "1.5rem" },
        }}
      >
        Upload PDF Contract
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 3,
          lineHeight: 1.6,
        }}
      >
        Drop a PDF or click to select. We&apos;ll extract and analyze risks, sections
        and recommendations.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <MuiButton
          variant="outlined"
          onClick={onPick}
          startIcon={<Upload size={16} />}
          sx={{
            borderColor: "primary.main",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
        >
          Select PDF
        </MuiButton>

        <MuiButton
          variant="contained"
          color="primary"
          disabled={!file || isLoading}
          onClick={onAnalyze}
          startIcon={
            isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Upload size={14} />
            )
          }
        >
          {isLoading ? "Analyzing..." : "Analyze Contract"}
        </MuiButton>

        {file && (
          <Chip
            label={file.name}
            size="small"
            sx={{
              backgroundColor: "grey.100",
              color: "text.primary",
            }}
          />
        )}
      </Box>

      {error && (
        <Box sx={{ mt: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: "error.light",
              border: "1px solid",
              borderColor: "error.main",
              borderRadius: 2,
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
          sx={{
            color: "text.secondary",
            display: "block",
            mb: 1,
            fontWeight: 600,
          }}
        >
          Features
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label="PDF only"
            size="small"
            sx={{ backgroundColor: "grey.100" }}
          />
          <Chip
            label="Confidential"
            size="small"
            sx={{ backgroundColor: "grey.100" }}
          />
          <Chip
            label="Fast results"
            size="small"
            sx={{ backgroundColor: "grey.100" }}
          />
        </Box>
      </Box>
    </MotionPaper>
  );
}
