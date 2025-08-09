"use client";

import { Paper, Box, Typography, Grid } from "@mui/material";
import { Brain } from "lucide-react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import type { EnhancedExtractAndAnalyzeResponse } from "@/services/api";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

export function SummaryCard({
  result,
}: {
  result: EnhancedExtractAndAnalyzeResponse;
}) {
  const riskChartData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [
          result.summary.high_risk_count ?? 0,
          result.summary.medium_risk_count ?? 0,
          result.summary.low_risk_count ?? 0,
        ],
        backgroundColor: ["#f44336", "#ff9800", "#4caf50"],
      },
    ],
  };

  const levelColor =
    result.summary.overall_risk_level === "HIGH"
      ? "#f44336"
      : result.summary.overall_risk_level.includes("MEDIUM")
      ? "#ff9800"
      : "#4caf50";

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
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "primary.main",
                boxShadow: 2,
              }}
            >
              <Brain color="white" size={24} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ color: "text.primary", fontWeight: 700 }}
              >
                Contract Analysis Summary
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                File: <strong>{result.filename ?? "Uploaded contract"}</strong>
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "background.default",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: levelColor, fontWeight: 800 }}
                >
                  {result.summary.overall_risk_level}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  Overall Risk
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "background.default",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "text.primary", fontWeight: 800 }}
                >
                  {result.summary.total_risks}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  Total Risks Found
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "background.default",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#f44336", fontWeight: 800 }}
                >
                  {result.summary.high_risk_count}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  High Priority
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                  backgroundColor: "background.default",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#ff9800", fontWeight: 800 }}
                >
                  {result.summary.medium_risk_count}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  Medium Priority
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Typography
            variant="h6"
            sx={{ color: "text.primary", fontWeight: 600, mb: 2 }}
          >
            Risk Distribution
          </Typography>
          <Box sx={{ height: 200 }}>
            <Chart
              type="pie"
              data={riskChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "bottom" },
                  title: { display: false },
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </MotionPaper>
  );
}
