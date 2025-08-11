"use client";

import { use } from "react";
import { redirect } from "next/navigation";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import AuthContainer from "@/components/auth/auth-container";
import AuthBackground from "@/components/auth/auth-background";
import AuthImageSection from "@/components/auth/auth-image-section";
import AuthFormSection from "@/components/auth/auth-form-section";

type AuthMode = "sign-in" | "sign-up";

interface AuthPageProps {
  params: Promise<{ mode: string }>;
}

export default function AuthPage({ params }: AuthPageProps) {
  const { mode } = use(params);

  // Validate mode and redirect if invalid
  if (mode !== "sign-in" && mode !== "sign-up") {
    redirect("/auth/sign-up");
  }

  const authMode = mode as AuthMode;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        p: { xs: 1, md: 2 },
      }}
    >
      <AuthBackground />

      <AuthContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ height: "100%" }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              borderRadius: 4,
              overflow: "hidden",
              backgroundColor: "white",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              height: "100%",
            }}
          >
            <AuthImageSection />
            <AuthFormSection mode={authMode} />
          </Box>
        </motion.div>
      </AuthContainer>
    </Box>
  );
}
