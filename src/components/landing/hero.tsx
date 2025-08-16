"use client";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { TextEffect } from "../ui/motion-primitives/text-effect";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <Box
      sx={{
        backgroundImage: `url("../pexels-sora-shimazaki-5668473.jpg")`,
        imageResolution: "initial",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        pt: 8, // Add padding top for header
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={4} // Reduced from 6 to 4
          sx={{ maxWidth: "700px", zIndex: 2, position: "relative" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              sx={{
                lineHeight: 0.85,
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {/* Line 1: Inspired by Legal */}
              <Typography
                variant="h1"
                component="div"
                sx={{
                  color: "white",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                  lineHeight: 0.9,
                  mb: 1,
                  height: "auto",
                }}
              >
                Inspired by{" "}
                <Box
                  component="span"
                  sx={{
                    fontStyle: "italic",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 3,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: "rgba(255,255,255,0.5)",
                      borderRadius: 2,
                    }}
                  />
                </Box>
              </Typography>

              {/* Line 2: Innovation, */}
              <Typography
                variant="h1"
                component="div"
                sx={{
                  color: "white",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                  lineHeight: 0.9,
                  mb: 1.5,
                  fontStyle: "italic",
                  height: "auto",
                }}
              >
                <TextEffect
                  preset="blur"
                  per="char"
                  speedReveal={0.4}
                  delay={0}
                >
                  Legal Innovation
                </TextEffect>
              </Typography>

              {/* Line 3: Defined by Excellence */}
              <Typography
                variant="h1"
                component="div"
                sx={{
                  color: "white",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                  lineHeight: 0.9,
                  mb: 1,
                  height: "auto",
                }}
              >
                Defined by{" "}
                <Box
                  component="span"
                  sx={{
                    fontWeight: 800,
                    color: "#fff3cd",
                    display: "inline-block",
                  }}
                >
                  <TextEffect delay={1.2} preset="fade-in-blur" per="char">
                    Excellence
                  </TextEffect>
                </Box>
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontSize: { xs: "1.125rem", md: "1.25rem" },
                lineHeight: 1.5, // Reduced from 1.6 to 1.5
                maxWidth: "600px",
                mt: 2, // Added margin top for spacing control
              }}
            >
              Transform your legal practice with AI-powered document analysis,
              intelligent research, and lightning-fast compliance monitoring.
              LegalMind brings precision and speed to every legal decision.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <Button
                onClick={() => {
                  router.push("/auth/sign-up");
                }}
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
              >
                Join LegalMind&copy;
              </Button>

              <Button
                variant="outlined"
                size="large"
                // startIcon={<PlayArrow />}
                onClick={() => {
                  router.push("/auth/sign-in");
                }}
                sx={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Already a Member.?
              </Button>
            </Stack>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
}
