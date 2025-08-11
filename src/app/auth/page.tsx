"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";
import AuthForm from "@/components/auth/auth-form";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 50%, #ffa8a8 100%)",
        position: "relative",
        overflow: "hidden",
        // Custom scrollbar for auth route
        "& ::-webkit-scrollbar": {
          width: "6px",
        },
        "& ::-webkit-scrollbar-track": {
          background: "rgba(255,255,255,0.1)",
        },
        "& ::-webkit-scrollbar-thumb": {
          background: "rgba(255,255,255,0.3)",
          borderRadius: "3px",
        },
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              borderRadius: 4,
              overflow: "hidden",
              backgroundColor: "white",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              minHeight: { xs: "auto", lg: "600px" },
              maxHeight: "90vh",
            }}
          >
            {/* Left Side - Image */}
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                position: "relative",
                backgroundImage:
                  "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-6a59077f10fccb866e9d094448edee39-cjwyOimQOjPhRcABDuNZXxNjoMq9UG.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "600px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(45deg, rgba(255,68,68,0.1) 0%, rgba(255,107,107,0.05) 100%)",
                }}
              />
            </Box>

            {/* Right Side - Form */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 3, md: 6 },
                position: "relative",
                overflow: "auto",
                maxHeight: { xs: "90vh", lg: "600px" },
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: mode === "signin" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === "signin" ? 20 : -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ width: "100%" }}
                >
                  <AuthForm mode={mode} onModeChange={setMode} />
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
