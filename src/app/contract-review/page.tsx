// src/app/contract-review/page.tsx
"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button as MuiButton,
  IconButton,
  Chip,
  CircularProgress,
  Divider,
  Tabs,
  Tab,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ArrowLeft,
  Upload,
  Loader2,
  AlertTriangle,
  Lightbulb,
  Brain,
  DollarSign,
  Shield,
  Target,
  Eye,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

import { Chart } from "react-chartjs-2";
import "chart.js/auto";

import { apiService } from "@/services/api";
import type {
  EnhancedExtractAndAnalyzeResponse,
  EnhancedRiskAnalysis,
  ContractSection,
} from "@/services/api";

/**
 * ContractReviewPage
 *
 * - Uses Material UI components and the app's MUI theme (src/lib/theme.ts).
 * - Preserves all features and exact backend field names.
 * - Modern, slightly futuristic look (glass panels, chips, subtle gradients).
 */

export default function ContractReviewPage() {
  const theme = useTheme();

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] =
    useState<EnhancedExtractAndAnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"risks" | "sections" | "text">(
    "risks"
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file only.");
        return;
      }
      setFile(selectedFile);
      setError(null);
      setResult(null);
    }
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await apiService.extractAndAnalyze(file);
      // response is already typed as EnhancedExtractAndAnalyzeResponse
      setResult(response);
    } catch (err) {
      console.error("Contract analysis error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while processing the contract."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const getRiskLevelColor = (level: string) => {
    // Keep color semantics consistent with previous UI but route them through theme where sensible
    switch (level) {
      case "HIGH":
        return theme.palette.error.main || "#ff4444";
      case "MEDIUM":
      case "MEDIUM-HIGH":
        return theme.palette.warning?.main || "#ffbb33";
      case "LOW":
        return theme.palette.success?.main || "#33bb33";
      default:
        return theme.palette.grey?.[500] || "#9ca3af";
    }
  };

  const getRiskCategoryIcon = (category: string) => {
    switch (category) {
      case "Financial Risk":
        return <DollarSign size={16} />;
      case "Legal Risk":
        return <Shield size={16} />;
      case "Contract Continuity":
        return <Target size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  const getOverallRiskColorClass = (level: string) => {
    // returns a color string for text
    return getRiskLevelColor(level);
  };

  // Chart dataset for risk distribution
  const riskChartData = result
    ? {
        labels: ["High", "Medium", "Low"],
        datasets: [
          {
            data: [
              result.summary.high_risk_count ?? 0,
              result.summary.medium_risk_count ?? 0,
              result.summary.low_risk_count ?? 0,
            ],
            backgroundColor: [
              theme.palette.error.main || "#ff4444",
              theme.palette.warning?.main || "#ffbb33",
              theme.palette.success?.main || "#33bb33",
            ],
          },
        ],
      }
    : undefined;

  return (
    <Box sx={{ minHeight: "100vh", background: "transparent", pb: 8 }}>
      {/* Top header (in-page, keeps previous nav affordances) */}
      <Box
        component="header"
        sx={{
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
          backdropFilter: "blur(8px)",
          background: "rgba(0,0,0,0.55)",
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
                    borderColor: "rgba(255,255,255,0.06)",
                    "&:hover": { borderColor: "rgba(255,255,255,0.12)" },
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
                    background: `linear-gradient(135deg, ${
                      theme.palette.primary.main
                    }, ${theme.palette.secondary?.main || "#0a2536"})`,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  <Brain color="#fff" size={18} />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "common.white", fontWeight: 600 }}
                  >
                    Smart Contract Review
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.55)" }}
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

      {/* Main content */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        {/* Upload Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 2,
            mb: 4,
            backdropFilter: "blur(6px)",
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  sx={{ color: "common.white", fontWeight: 700 }}
                >
                  Upload PDF Contract
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.65)", mt: 0.5 }}
                >
                  Drop a PDF or click to select. We’ll extract and analyze for
                  risks, sections and recommendations.
                </Typography>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                <Box
                  sx={{ display: "flex", gap: 1, mt: 2, alignItems: "center" }}
                >
                  <MuiButton
                    variant="contained"
                    onClick={handleFileSelectClick}
                    startIcon={<Upload size={16} />}
                    sx={{
                      background: `linear-gradient(90deg, ${
                        theme.palette.primary.main
                      }, ${theme.palette.secondary?.main || "#0a2536"})`,
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
                    onClick={() => handleSubmit()}
                    startIcon={
                      isLoading ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Upload size={14} />
                      )
                    }
                    sx={{
                      borderColor: "rgba(255,255,255,0.06)",
                      color: "common.white",
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
                        bgcolor: "rgba(255,255,255,0.03)",
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
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.error.main }}
                      >
                        {error}
                      </Typography>
                    </Paper>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    Tips
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      justifyContent: { xs: "flex-start", md: "flex-end" },
                      mt: 1,
                    }}
                  >
                    <Chip label="PDF only" size="small" />
                    <Chip label="Confidential" size="small" />
                    <Chip label="Fast results" size="small" />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Results */}
        {result && (
          <Box sx={{ display: "grid", gap: 3 }}>
            {/* Summary card */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                background:
                  "linear-gradient(180deg, rgba(3,54,109,0.12), rgba(10,37,54,0.08))",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 2,
                backdropFilter: "blur(6px)",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Brain color="#fff" size={22} />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ color: "common.white", fontWeight: 700 }}
                      >
                        Contract Analysis Summary
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.65)" }}
                      >
                        File:{" "}
                        <strong style={{ color: "white" }}>
                          {result.filename ?? "Uploaded contract"}
                        </strong>
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={1} sx={{ mt: 2 }}>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h4"
                          sx={{
                            color: getOverallRiskColorClass(
                              result.summary.overall_risk_level
                            ),
                            fontWeight: 700,
                          }}
                        >
                          {result.summary.overall_risk_level}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          Overall Risk
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h4"
                          sx={{ color: "common.white", fontWeight: 700 }}
                        >
                          {result.summary.total_risks}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          Total Risks Found
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h4"
                          sx={{
                            color: theme.palette.error.main,
                            fontWeight: 700,
                          }}
                        >
                          {result.summary.high_risk_count}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          High Priority
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h4"
                          sx={{
                            color: theme.palette.warning?.main || "#ffbb33",
                            fontWeight: 700,
                          }}
                        >
                          {result.summary.medium_risk_count}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          Medium Priority
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      Risk Distribution
                    </Typography>

                    <Box sx={{ height: 160, mt: 1 }}>
                      {riskChartData ? (
                        <Chart
                          type="pie"
                          data={riskChartData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: { position: "top" },
                              title: { display: false },
                            },
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: "rgba(255,255,255,0.55)" }}
                          >
                            No data
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Overall summary */}
            {result.overall_summary && (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid rgba(0,0,0,0.25)",
                  background:
                    "linear-gradient(90deg, rgba(255,243,205,0.03), rgba(255,255,255,0.01))",
                }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Lightbulb
                    color={theme.palette.warning?.main || "#ffcc00"}
                    size={18}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "common.white", fontWeight: 700 }}
                  >
                    Overall Summary
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.75)", mt: 1 }}
                >
                  {result.overall_summary}
                </Typography>
              </Paper>
            )}

            {/* Tabs */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.04)",
                background: "rgba(255,255,255,0.01)",
              }}
            >
              <Tabs
                value={activeTab}
                onChange={(_, v) =>
                  setActiveTab(v as "risks" | "sections" | "text")
                }
                textColor="inherit"
                indicatorColor="primary"
                sx={{
                  mb: 2,
                  "& .MuiTab-root": {
                    color: "rgba(255,255,255,0.8)",
                    textTransform: "none",
                    fontWeight: 600,
                  },
                  "& .MuiTab-root.Mui-selected": { color: "white" },
                }}
                aria-label="contract review tabs"
              >
                <Tab
                  value="risks"
                  icon={<AlertTriangle size={16} />}
                  label="Risk Analysis"
                />
                <Tab
                  value="sections"
                  icon={<BookOpen size={16} />}
                  label="Contract Sections"
                />
                <Tab
                  value="text"
                  icon={<Eye size={16} />}
                  label="Extracted Text"
                />
              </Tabs>

              {/* Tab content */}
              {activeTab === "risks" && (
                <Box sx={{ display: "grid", gap: 2 }}>
                  {result.analysis.length === 0 ? (
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      No risks detected.
                    </Typography>
                  ) : (
                    result.analysis.map(
                      (risk: EnhancedRiskAnalysis, idx: number) => (
                        <Paper
                          elevation={0}
                          key={idx}
                          sx={{
                            p: 2,
                            borderRadius: 1.5,
                            border: `1px solid rgba(255,255,255,0.04)`,
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            gap: 2,
                            background: `linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.12))`,
                          }}
                        >
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  alignItems: "center",
                                }}
                              >
                                {getRiskCategoryIcon(risk.risk_category)}
                              </Box>
                              <Typography
                                variant="subtitle1"
                                sx={{ color: "common.white", fontWeight: 700 }}
                              >
                                {risk.risk_type}
                              </Typography>
                              <Chip
                                size="small"
                                label={risk.risk_level}
                                sx={{
                                  ml: 1,
                                  bgcolor: `${getRiskLevelColor(
                                    risk.risk_level
                                  )}22`,
                                  color: getRiskLevelColor(risk.risk_level),
                                  fontWeight: 700,
                                }}
                              />
                            </Box>

                            <Typography
                              variant="body2"
                              sx={{ color: "rgba(255,255,255,0.75)", mt: 1 }}
                            >
                              {risk.description}
                            </Typography>

                            <Box sx={{ mt: 1 }}>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "rgba(255,255,255,0.6)",
                                  fontWeight: 600,
                                }}
                              >
                                Relevant excerpt
                              </Typography>
                              <Paper
                                elevation={0}
                                sx={{
                                  mt: 1,
                                  p: 1,
                                  bgcolor: "rgba(255,255,255,0.02)",
                                  borderRadius: 1,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontStyle: "italic",
                                    color: "rgba(255,255,255,0.75)",
                                  }}
                                >
                                  "{risk.sentence}"
                                </Typography>
                              </Paper>
                            </Box>

                            {risk.specific_concerns?.length > 0 && (
                              <Box sx={{ mt: 1 }}>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "rgba(255,255,255,0.6)",
                                    fontWeight: 700,
                                  }}
                                >
                                  Specific Concerns
                                </Typography>
                                <Box
                                  sx={{
                                    mt: 1,
                                    display: "flex",
                                    gap: 1,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {risk.specific_concerns.map((c, i) => (
                                    <Chip
                                      key={i}
                                      label={c}
                                      size="small"
                                      sx={{ bgcolor: "rgba(255,255,255,0.02)" }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                            )}

                            {risk.negotiation_strategies?.length > 0 && (
                              <Box sx={{ mt: 1 }}>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "rgba(255,255,255,0.6)",
                                    fontWeight: 700,
                                  }}
                                >
                                  Suggested Negotiation Strategies
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                  {risk.negotiation_strategies.map((s, i) => (
                                    <Typography
                                      key={i}
                                      variant="body2"
                                      sx={{
                                        color: "rgba(255,255,255,0.75)",
                                        mt: 0.5,
                                      }}
                                    >
                                      • {s}
                                    </Typography>
                                  ))}
                                </Box>
                              </Box>
                            )}
                          </Box>

                          <Box sx={{ textAlign: "right", minWidth: 110 }}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "rgba(255,255,255,0.6)",
                                display: "block",
                              }}
                            >
                              Priority
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{
                                color: getRiskLevelColor(risk.risk_level),
                                fontWeight: 800,
                              }}
                            >
                              {risk.priority_score}/10
                            </Typography>
                          </Box>
                        </Paper>
                      )
                    )
                  )}
                </Box>
              )}

              {activeTab === "sections" && (
                <Box sx={{ display: "grid", gap: 2 }}>
                  {result.sections.length === 0 ? (
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      No sections detected.
                    </Typography>
                  ) : (
                    result.sections.map((section: ContractSection, idx) => (
                      <Paper
                        key={idx}
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 1.5,
                          border: "1px solid rgba(255,255,255,0.04)",
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
                            sx={{ color: "common.white", fontWeight: 700 }}
                          >
                            {section.title}
                          </Typography>
                          <Chip
                            label={`${section.risk_count} risks`}
                            size="small"
                            sx={{ bgcolor: "rgba(255,255,255,0.02)" }}
                          />
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{ mt: 1, color: "rgba(255,255,255,0.75)" }}
                        >
                          {section.content}
                        </Typography>
                      </Paper>
                    ))
                  )}
                </Box>
              )}

              {activeTab === "text" && (
                <Box>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 1.5,
                      background: "rgba(0,0,0,0.18)",
                      border: "1px solid rgba(255,255,255,0.02)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      Extracted Text
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        p: 2,
                        bgcolor: "rgba(255,255,255,0.01)",
                        borderRadius: 1,
                        maxHeight: 420,
                        overflow: "auto",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily:
                            "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace",
                          color: "rgba(255,255,255,0.85)",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {result.extracted_text ||
                          "No extracted text available."}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              )}
            </Paper>

            {/* Recommendations */}
            {result.recommendations?.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(255,255,255,0.02)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "common.white", fontWeight: 700 }}
                >
                  Recommendations
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {result.recommendations.map((rec, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "flex-start",
                        mt: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.85)",
                          fontWeight: 700,
                        }}
                      >
                        {i + 1}.
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        {rec}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}
