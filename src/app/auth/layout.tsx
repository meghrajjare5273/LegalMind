"use client";
import type { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/images/auth-side.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        py: { xs: 4, md: 8 },
      }}
      aria-label="Authentication Background"
    >
      {/* Blur overlay to mimic the screenshot background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(10px)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.85) 100%)",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </Container>
    </Box>
  );
}
