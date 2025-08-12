"use client";

import { Box, useTheme, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AuthForm from "./auth-form";

interface AuthFormSectionProps {
  mode: "sign-in" | "sign-up";
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function AuthFormSection({ mode }: AuthFormSectionProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const direction = mode === "sign-in" ? 1 : -1;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: {
          xs: 2, // Reduced padding on mobile
          sm: 3,
          md: 4,
          lg: 6,
        },
        position: "relative",
        height: "100%",
        overflow: "hidden",
        width: "100%",
        minHeight: { xs: "100vh", sm: "auto" }, // Ensure full height on mobile
      }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={mode}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // Remove absolute positioning to fix centering
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: isMobile ? "100%" : "420px", // Slightly wider on desktop for better centering
              display: "flex",
              justifyContent: "center", // Ensure form is centered
              px: { xs: 1, sm: 0 }, // Small horizontal padding on mobile
            }}
          >
            <AuthForm mode={mode} />
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
