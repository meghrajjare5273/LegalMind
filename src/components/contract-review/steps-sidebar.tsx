"use client";

import { Box, Typography, Paper } from "@mui/material";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export type StepKey = "upload" | "analyzing" | "review" | "finalize";

export type StepDef = {
  key: StepKey;
  title: string;
  subtitle?: string;
};

type StepsSidebarProps = {
  steps: StepDef[];
  current: StepKey;
  onNavigate?: (next: StepKey) => void;
};

const MotionPaper = motion(Paper);

export function StepsSidebar({
  steps,
  current,
  onNavigate,
}: StepsSidebarProps) {
  const currentIndex = steps.findIndex((s) => s.key === current);

  return (
    <MotionPaper
      elevation={2}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
        position: "sticky",
        top: 100,
      }}
      aria-label="Review Progress"
    >
      <Typography
        variant="h6"
        sx={{ color: "text.primary", fontWeight: 700, mb: 2 }}
      >
        Review Progress
      </Typography>

      <Box
        component="ol"
        sx={{ display: "grid", gap: 2, listStyle: "none", pl: 0, m: 0 }}
      >
        {steps.map((s, idx) => {
          const completed = idx < currentIndex;
          const active = idx === currentIndex;
          return (
            <Box
              component="li"
              key={s.key}
              onClick={() => {
                if (onNavigate && (completed || active)) onNavigate(s.key);
              }}
              sx={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 1.5,
                alignItems: "center",
                p: 1.5,
                borderRadius: 1.5,
                cursor: completed ? "pointer" : "default",
                transition: "background-color 0.2s ease",
                backgroundColor: active ? "primary.light" : "transparent",
                "&:hover": {
                  backgroundColor: completed
                    ? "background.default"
                    : active
                    ? "primary.light"
                    : "transparent",
                },
              }}
              aria-current={active ? "step" : undefined}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: completed
                    ? "primary.main"
                    : active
                    ? "white"
                    : "background.default",
                  color: completed
                    ? "white"
                    : active
                    ? "primary.main"
                    : "text.secondary",
                  border: completed ? "none" : 2,
                  borderColor: active ? "primary.main" : "divider",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {completed ? <Check size={16} /> : idx + 1}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: active ? "white" : "text.primary",
                    fontWeight: active ? 700 : 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {s.title}
                </Typography>
                {s.subtitle ? (
                  <Typography
                    variant="caption"
                    sx={{
                      color: active
                        ? "rgba(255,255,255,0.8)"
                        : "text.secondary",
                    }}
                  >
                    {s.subtitle}
                  </Typography>
                ) : null}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          mt: 4,
          p: 2,
          borderRadius: 1.5,
          backgroundColor: "background.default",
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: "text.primary", fontWeight: 700 }}
        >
          Having trouble?
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Contact support and we&apos;ll help you complete the review.
        </Typography>
        <Box
          component="a"
          href="mailto:support@legalmind.com"
          sx={{
            display: "inline-block",
            mt: 1.5,
            px: 2,
            py: 1,
            borderRadius: 1,
            border: 1,
            borderColor: "primary.main",
            color: "primary.main",
            textDecoration: "none",
            fontSize: 12,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
        >
          Contact Us
        </Box>
      </Box>
    </MotionPaper>
  );
}
