"use client";

import { use } from "react";
import { redirect } from "next/navigation";
import { Box, useTheme, useMediaQuery } from "@mui/material";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Validate mode and redirect if invalid
  if (mode !== "sign-in" && mode !== "sign-up") {
    redirect("/auth/sign-up");
  }

  const authMode = mode as AuthMode;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        p: { xs: 0, sm: 1, md: 2 }, // Remove padding on mobile
      }}
    >
      <AuthBackground />

      <AuthContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            display: "flex", // Add flex to motion div
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: isMobile ? "1fr" : "1fr 1fr",
              },
              width: "100%",
              height: {
                xs: "100vh", // Full height on mobile
                sm: "auto",
                md: "600px",
                lg: "650px",
              },
              borderRadius: { xs: 0, sm: 2, md: 4 }, // No border radius on mobile
              overflow: "hidden",
              backgroundColor: "white",
              boxShadow: {
                xs: "none", // Remove shadow on mobile
                sm: "0 10px 25px rgba(0, 0, 0, 0.1)",
                md: "0 25px 50px rgba(0, 0, 0, 0.15)",
              },
              // Add centering to the grid itself
              mx: "auto",
            }}
          >
            {/* Only show image section on desktop */}
            {!isMobile && <AuthImageSection />}
            <AuthFormSection mode={authMode} />
          </Box>
        </motion.div>
      </AuthContainer>
    </Box>
  );
}
