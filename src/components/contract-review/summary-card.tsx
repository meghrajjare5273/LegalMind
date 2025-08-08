"use client";

import { Paper, Box, Typography, Grid } from "@mui/material";
import { Brain } from "lucide-react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import { palette } from "./tokens";
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
        backgroundColor: ["#ff6b6b", "#f7b731", "#2ecc71"],
      },
    ],
  };

  const levelColor =
    result.summary.overall_risk_level === "HIGH"
      ? "#ff6b6b"
      : result.summary.overall_risk_level.includes("MEDIUM")
      ? "#f7b731"
      : "#2ecc71";

  return (
    <MotionPaper
      elevation={0}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        p: { xs: 2, md: 3 },
        background: `linear-gradient(180deg, ${palette.navy}22, ${palette.deep}18)`,
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 2,
        backdropFilter: "blur(8px)",
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(135deg, ${palette.mint}, ${palette.mintDark})`,
                boxShadow: "0 6px 20px rgba(0,0,0,0.45)",
              }}
            >
              <Brain color={palette.deep} size={18} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: "white", fontWeight: 800 }}>
                Contract Analysis Summary
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.72)" }}
              >
                File:{" "}
                <strong style={{ color: "white" }}>
                  {result.filename ?? "Uploaded contract"}
                </strong>
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ color: levelColor, fontWeight: 800 }}
                >
                  {result.summary.overall_risk_level}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Overall Risk
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ color: "white", fontWeight: 800 }}
                >
                  {result.summary.total_risks}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Total Risks Found
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#ff6b6b", fontWeight: 800 }}
                >
                  {result.summary.high_risk_count}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  High Priority
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ color: "#f7b731", fontWeight: 800 }}
                >
                  {result.summary.medium_risk_count}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Medium Priority
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: "rgba(255,255,255,0.9)" }}
          >
            Risk Distribution
          </Typography>
          <Box sx={{ height: 160, mt: 1 }}>
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
          </Box>
        </Grid>
      </Grid>
    </MotionPaper>
  );
}
