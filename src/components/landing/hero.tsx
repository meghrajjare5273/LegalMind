"use client";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward, PlayArrow } from "@mui/icons-material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        backgroundImage: `url("../justice-2060093_1920.jpg")`,
        
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        pt: 8, // Add padding top for header
      }}
    >
      {/* Animated Background Elements */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 45,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
        sx={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: { xs: "200px", md: "400px" },
          height: { xs: "200px", md: "400px" },
          background: "rgba(255,255,255,0.1)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
        }}
      />

      {/* Secondary geometric element */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "15%",
          width: { xs: "150px", md: "300px" },
          height: { xs: "150px", md: "300px" },
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
          backdropFilter: "blur(10px)",
        }}
      />

      <Container maxWidth="lg">
        <Stack
          spacing={6}
          sx={{ maxWidth: "700px", zIndex: 2, position: "relative" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                color: "white",
                mb: 2,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
              }}
            >
              Inspired by{" "}
              <Box
                component="span"
                sx={{ fontStyle: "italic", position: "relative" }}
              >
                Legal Innovation
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "rgba(255,255,255,0.5)",
                    borderRadius: 2,
                  }}
                />
              </Box>
              ,<br />
              Defined by{" "}
              <Box component="span" sx={{ fontWeight: 800, color: "#fff3cd" }}>
                Excellence
              </Box>
            </Typography>
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
                lineHeight: 1.6,
                maxWidth: "600px",
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
                Start Free Trial
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<PlayArrow />}
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
                Watch Demo
              </Button>
            </Stack>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
}
