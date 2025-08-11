"use client";

import { Box } from "@mui/material";
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
  // Direction for animation (1 for sign-up to sign-in, -1 for sign-in to sign-up)
  const direction = mode === "sign-in" ? 1 : -1;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
        position: "relative",
        height: "100%",
        overflow: "hidden",
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
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AuthForm mode={mode} />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
