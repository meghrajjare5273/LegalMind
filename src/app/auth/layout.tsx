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
        px: 2,
      }}
      aria-label="Authentication Background"
    >
      {/* Enhanced backdrop with gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(12px)",
          background: `
            linear-gradient(135deg, 
              rgba(255,68,68,0.05) 0%, 
              rgba(255,107,107,0.08) 25%,
              rgba(255,255,255,0.75) 50%,
              rgba(248,250,252,0.85) 100%
            )
          `,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </Container>
    </Box>
  );
}
