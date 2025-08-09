"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { Box, Container, Typography, Button as MuiButton } from "@mui/material";
import { ArrowLeft, Brain } from "lucide-react";
import Link from "next/link";

import { apiService } from "@/services/api";
import type { EnhancedExtractAndAnalyzeResponse } from "@/services/api";

import { UploadCard } from "@/components/contract-review/upload-card";
import { SummaryCard } from "@/components/contract-review/summary-card";
import { OverallSummary } from "@/components/contract-review/overall-summary";
import { ResultsTabs } from "@/components/contract-review/results-tab";
import { Recommendations } from "@/components/contract-review/recommendations";
import {
  StepsSidebar,
  type StepKey,
  type StepDef,
} from "@/components/contract-review/steps-sidebar";
import { AnalyzingState } from "@/components/contract-review/analyzing-state";
import { NextActions } from "@/components/contract-review/next-actions";

export default function ContractReviewPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] =
    useState<EnhancedExtractAndAnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState<StepKey>("upload");

  const steps: StepDef[] = [
    { key: "upload", title: "Upload", subtitle: "Add a PDF to begin" },
    { key: "analyzing", title: "AI Analysis", subtitle: "Extracting insights" },
    { key: "review", title: "Review", subtitle: "Explore risks & sections" },
    { key: "finalize", title: "Next Actions", subtitle: "Export & discuss" },
  ];

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
      setStep("upload");
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
    setStep("analyzing");
    try {
      const response = await apiService.extractAndAnalyze(file);
      setResult(response);
      setStep("review");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while processing the contract."
      );
      setStep("upload");
    } finally {
      setIsLoading(false);
    }
  }

  function onBack() {
    if (step === "analyzing") {
      return;
    }
    if (step === "review") setStep("analyzing");
    if (step === "finalize") setStep("review");
  }

  function onContinue() {
    if (step === "upload") {
      analyze();
      return;
    }
    if (step === "analyzing") return;
    if (step === "review") setStep("finalize");
  }

  function onReset() {
    setFile(null);
    setResult(null);
    setError(null);
    setStep("upload");
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        pb: 8,
      }}
    >
      {/* Simple Navigation Bar */}
      <Box
        component="header"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Link href="/" legacyBehavior>
              <MuiButton
                size="small"
                variant="outlined"
                startIcon={<ArrowLeft size={16} />}
                sx={{
                  color: "text.primary",
                  borderColor: "divider",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "primary.light",
                    color: "white",
                  },
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
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "primary.main",
                  boxShadow: 3,
                }}
              >
                <Brain color="white" size={18} />
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary", fontWeight: 700 }}
                >
                  Smart Contract Review
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  AI-powered legal contract analysis
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={onChangeFile}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
            gap: 3,
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <StepsSidebar
              steps={steps}
              current={step}
              onNavigate={(next) => {
                const order: StepKey[] = [
                  "upload",
                  "analyzing",
                  "review",
                  "finalize",
                ];
                if (order.indexOf(next) <= order.indexOf(step)) {
                  setStep(next);
                }
              }}
            />
          </Box>

          <Box sx={{ display: "grid", gap: 3 }}>
            {step === "upload" && (
              <UploadCard
                file={file}
                isLoading={isLoading}
                error={error}
                onPick={handlePick}
                onAnalyze={analyze}
              />
            )}

            {step === "analyzing" && <AnalyzingState filename={file?.name} />}

            {step === "review" && result && (
              <>
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
              </>
            )}

            {step === "finalize" && <NextActions onReset={onReset} />}

            {/* Action bar */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 2,
              }}
            >
              <MuiButton
                variant="outlined"
                disabled={step === "upload" || step === "analyzing"}
                onClick={onBack}
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
                Back
              </MuiButton>

              <MuiButton
                variant="contained"
                onClick={onContinue}
                disabled={
                  (step === "upload" && !file) ||
                  step === "analyzing" ||
                  (step === "review" && !result)
                }
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  px: 3,
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                {step === "upload"
                  ? "Analyze"
                  : step === "review"
                  ? "Continue"
                  : "Continue"}
              </MuiButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
