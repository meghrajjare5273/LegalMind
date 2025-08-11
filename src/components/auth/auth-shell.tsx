"use client";
import { Box, Paper, Typography } from "@mui/material";
import type React from "react";

import { Gavel } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthShell({
  title,
  description,
  imageAlt,
  children,
}: {
  title: string;
  description: string;
  imageAlt?: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: { xs: 3, md: 4 },
        overflow: "hidden",
        border: "1px solid",
        borderColor: "rgba(0,0,0,0.08)",
        bgcolor: "rgba(255,255,255,0.9)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        }}
      >
        {/* Left image panel */}
        <Box
          aria-label={imageAlt || "Auth visual"}
          sx={{
            display: { xs: "none", md: "block" },
            p: 2.5,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.02))",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                height: "100%",
                minHeight: 520,
                borderRadius: 5,
                overflow: "hidden",
                boxShadow: "0 10px 40px rgba(0,0,0,0.16)",
                border: "6px solid rgba(255,255,255,0.8)",
                backgroundImage: "url('/images/auth-side.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </motion.div>
        </Box>

        {/* Right form panel */}
        <Box
          sx={{
            p: { xs: 3, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                bgcolor: "primary.main",
                display: "grid",
                placeItems: "center",
                color: "white",
                boxShadow: "0 6px 14px rgba(255,68,68,0.25)",
              }}
              aria-label="LegalMind logo"
            >
              <Gavel size={18} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              LegalMind
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.01em",
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mb: 3,
              maxWidth: 520,
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {children}
          </motion.div>
        </Box>
      </Box>
    </Paper>
  );
}
