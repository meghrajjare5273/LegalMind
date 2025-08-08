"use client";

import { Paper, Box, Typography, Chip } from "@mui/material";
import { AlertTriangle, DollarSign, Shield, Target } from "lucide-react";
import type { EnhancedRiskAnalysis } from "@/services/api";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

function getRiskColor(level: string) {
  switch (level) {
    case "HIGH":
      return "#ff6b6b";
    case "MEDIUM":
    case "MEDIUM-HIGH":
      return "#f7b731";
    default:
      return "#2ecc71";
  }
}

function getIcon(cat: string) {
  switch (cat) {
    case "Financial Risk":
      return <DollarSign size={16} />;
    case "Legal Risk":
      return <Shield size={16} />;
    case "Contract Continuity":
      return <Target size={16} />;
    default:
      return <AlertTriangle size={16} />;
  }
}

export function RiskList({ items }: { items: EnhancedRiskAnalysis[] }) {
  if (items.length === 0) {
    return (
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
        No risks detected.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {items.map((risk, idx) => {
        const color = getRiskColor(risk.risk_level);
        return (
          <MotionPaper
            key={idx}
            elevation={0}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.03 }}
            sx={{
              p: 2,
              borderRadius: 1.5,
              border: "1px solid rgba(255,255,255,0.06)",
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.12))",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 2,
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {getIcon(risk.risk_category)}
                <Typography
                  variant="subtitle1"
                  sx={{ color: "white", fontWeight: 800 }}
                >
                  {risk.risk_type}
                </Typography>
                <Chip
                  size="small"
                  label={risk.risk_level}
                  sx={{
                    ml: 1,
                    bgcolor: `${color}22`,
                    color,
                    fontWeight: 800,
                  }}
                />
              </Box>

              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.78)", mt: 1 }}
              >
                {risk.description}
              </Typography>

              <Box sx={{ mt: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.66)", fontWeight: 700 }}
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
                    sx={{ fontStyle: "italic", color: "rgba(255,255,255,0.8)" }}
                  >
                    &quot;{risk.sentence}&quot;
                  </Typography>
                </Paper>
              </Box>

              {risk.specific_concerns?.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.66)", fontWeight: 700 }}
                  >
                    Specific Concerns
                  </Typography>
                  <Box
                    sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    {risk.specific_concerns.map((c, i) => (
                      <Chip
                        key={i}
                        label={c}
                        size="small"
                        sx={{ bgcolor: "rgba(255,255,255,0.04)" }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {risk.negotiation_strategies?.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.66)", fontWeight: 700 }}
                  >
                    Suggested Negotiation Strategies
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {risk.negotiation_strategies.map((s, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.78)", mt: 0.5 }}
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
                sx={{ color: "rgba(255,255,255,0.66)", display: "block" }}
              >
                Priority
              </Typography>
              <Typography variant="h5" sx={{ color, fontWeight: 900 }}>
                {risk.priority_score}/10
              </Typography>
            </Box>
          </MotionPaper>
        );
      })}
    </Box>
  );
}
