"use client";

import { Paper, Box, Typography, Chip } from "@mui/material";
import { AlertTriangle, DollarSign, Shield, Target } from "lucide-react";
import type { EnhancedRiskAnalysis } from "@/services/api";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

function getRiskColor(level: string) {
  switch (level) {
    case "HIGH":
      return "#f44336";
    case "MEDIUM":
    case "MEDIUM-HIGH":
      return "#ff9800";
    default:
      return "#4caf50";
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
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
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
            elevation={1}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.03 }}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: "background.paper",
              border: 1,
              borderColor: "divider",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 2,
              "&:hover": {
                boxShadow: 3,
                borderColor: "primary.light",
              },
              transition: "all 0.2s ease",
            }}
          >
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
              >
                <Box sx={{ color: "primary.main" }}>
                  {getIcon(risk.risk_category)}
                </Box>
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary", fontWeight: 700 }}
                >
                  {risk.risk_type}
                </Typography>
                <Chip
                  size="small"
                  label={risk.risk_level}
                  sx={{
                    bgcolor: `${color}20`,
                    color,
                    fontWeight: 700,
                    border: `1px solid ${color}40`,
                  }}
                />
              </Box>

              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 2, lineHeight: 1.6 }}
              >
                {risk.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 700,
                    display: "block",
                    mb: 1,
                  }}
                >
                  Relevant excerpt
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "background.default",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontStyle: "italic", color: "text.primary" }}
                  >
                    &quot;{risk.sentence}&quot;
                  </Typography>
                </Paper>
              </Box>

              {risk.specific_concerns?.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      display: "block",
                      mb: 1,
                    }}
                  >
                    Specific Concerns
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {risk.specific_concerns.map((c, i) => (
                      <Chip
                        key={i}
                        label={c}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: "divider",
                          color: "text.secondary",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {risk.negotiation_strategies?.length > 0 && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      display: "block",
                      mb: 1,
                    }}
                  >
                    Suggested Negotiation Strategies
                  </Typography>
                  <Box>
                    {risk.negotiation_strategies.map((s, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{ color: "text.primary", mb: 0.5 }}
                      >
                        • {s}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

            <Box sx={{ textAlign: "right", minWidth: 80 }}>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                Priority
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color,
                  fontWeight: 800,
                  fontSize: "2rem",
                }}
              >
                {risk.priority_score}/10
              </Typography>
            </Box>
          </MotionPaper>
        );
      })}
    </Box>
  );
}
