"use client";

import React, { useRef, useState } from "react";
import { Box, Container, Typography, Button as MuiButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ArrowLeft, Brain } from "lucide-react";
import Link from "next/link";

import { apiService } from "@/services/api";
import type { EnhancedExtractAndAnalyzeResponse } from "@/services/api";

import { UploadCard } from "@/components/contract-review/upload-card";
import { SummaryCard } from "@/components/contract-review/summary-card";
import { OverallSummary } from "@/components/contract-review/overall-summary";
import { ResultsTabs } from "@/components/contract-review/results-tab";
import { Recommendations } from "@/components/contract-review/recommendations";
import { palette } from "@/components/contract-review/tokens";

export default function ContractReviewPage() {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] =
    useState<EnhancedExtractAndAnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePick = () => fileInputRef.current?.click();

  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      if (f.type !== "application/pdf") {
        setError("Please upload a PDF file only.");
        return;
      }
      setFile(f);
      setError(null);
      setResult(null);
    }
  }

  async function analyze() {
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await apiService.extractAndAnalyze(file);
      setResult(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while processing the contract."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${palette.deep} 0%, ${palette.navy} 100%)`,
        pb: 8,
      }}
    >
      {/* Top header */}
      <Box
        component="header"
        sx={{
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
          backdropFilter: "blur(8px)",
          background: "rgba(0,0,0,0.45)",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Link href="/" legacyBehavior>
                <MuiButton
                  size="small"
                  variant="outlined"
                  startIcon={<ArrowLeft size={16} />}
                  sx={{
                    color: "common.white",
                    borderColor: "rgba(255,255,255,0.12)",
                    "&:hover": { borderColor: "rgba(255,255,255,0.24)" },
                  }}
                >
                  Back
                </MuiButton>
              </Link>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${palette.mint}, ${palette.mintDark})`,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  <Brain color={palette.deep} size={18} />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "white", fontWeight: 800 }}
                  >
                    Smart Contract Review
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    AI-powered legal contract analysis
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "success.main",
                  boxShadow: "0 0 8px rgba(0,255,0,0.08)",
                }}
              />
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Secure Session
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        {/* hidden input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={onChangeFile}
        />

        <UploadCard
          file={file}
          isLoading={isLoading}
          error={error}
          onPick={handlePick}
          onAnalyze={analyze}
        />

        {result && (
          <Box sx={{ display: "grid", gap: 3, mt: 3 }}>
            <SummaryCard result={result} />
            {result.overall_summary && (
              <OverallSummary text={result.overall_summary} />
            )}
            <ResultsTabs
              risks={result.analysis}
              sections={result.sections}
              text={result.extracted_text}
            />
            <Recommendations items={result.recommendations} />
          </Box>
        )}
      </Container>
    </Box>
  );
}
