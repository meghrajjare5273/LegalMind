"use client";

import { Box, Typography, Paper } from "@mui/material";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { palette } from "./tokens";

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
      elevation={0}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        p: 2,
        borderRadius: 2,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.16)",
        position: "sticky",
        top: 92,
      }}
      aria-label="Review Progress"
    >
      <Typography
        variant="subtitle1"
        sx={{ color: "white", fontWeight: 800, mb: 1 }}
      >
        Review Progress
      </Typography>

      <Box
        component="ol"
        sx={{ display: "grid", gap: 1.5, listStyle: "none", pl: 0, m: 0 }}
      >
        {steps.map((s, idx) => {
          const completed = idx < currentIndex;
          const active = idx === currentIndex;
          return (
            <Box
              component="li"
              key={s.key}
              onClick={() => {
                // Allow backward navigation only to avoid breaking async flow
                if (onNavigate && (completed || active)) onNavigate(s.key);
              }}
              sx={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 1.25,
                alignItems: "center",
                p: 1.25,
                borderRadius: 1.5,
                cursor: completed ? "pointer" : "default",
                transition: "background .2s ease, transform .2s ease",
                background: active
                  ? "linear-gradient(90deg, rgba(218,246,245,0.08), rgba(184,242,239,0.06))"
                  : "transparent",
                "&:hover": {
                  background: completed
                    ? "rgba(255,255,255,0.06)"
                    : active
                    ? "linear-gradient(90deg, rgba(218,246,245,0.10), rgba(184,242,239,0.08))"
                    : "transparent",
                },
              }}
              aria-current={active ? "step" : undefined}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background: completed
                    ? `linear-gradient(135deg, ${palette.mint}, ${palette.mintDark})`
                    : "transparent",
                  color: completed ? palette.deep : "white",
                  border: completed
                    ? "none"
                    : "1px dashed rgba(255,255,255,0.35)",
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                {completed ? <Check size={16} /> : idx + 1}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    fontWeight: active ? 800 : 600,
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
                    sx={{ color: "rgba(255,255,255,0.7)" }}
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
          mt: 3,
          p: 1.5,
          borderRadius: 1.5,
          background: "rgba(255,255,255,0.06)",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: "white", fontWeight: 800 }}
        >
          Having trouble?
        </Typography>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)" }}>
          Contact support and we’ll help you complete the review.
        </Typography>
        <Box
          component="a"
          href="mailto:support@example.com"
          sx={{
            display: "inline-block",
            mt: 1,
            px: 1.25,
            py: 0.75,
            borderRadius: 1,
            border: "1px solid rgba(255,255,255,0.16)",
            color: "white",
            textDecoration: "none",
            fontSize: 12,
            fontWeight: 700,
            "&:hover": { background: "rgba(255,255,255,0.08)" },
          }}
        >
          Contact Us
        </Box>
      </Box>
    </MotionPaper>
  );
}
