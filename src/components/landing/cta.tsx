"use client";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { Send } from "@mui/icons-material";

export default function CTASection() {
  const isEmailValid = true;
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #000000 0%, #545d56 100%)",
        py: 12,
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative shapes */}
      <Box
        sx={{
          position: "absolute",
          top: -70,
          right: -100,
          width: 300,
          height: 200,
          background: "rgba(240, 248, 255, 0.07)",
          borderRadius: "50%",
          filter: "blur(24px)",
          zIndex: 0,
        }}
      />
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              letterSpacing: -1,
              fontSize: { xs: "2.25rem", md: "3.4rem" },
              mb: 2,
              background: "linear-gradient(90deg, #f0f8ff 30%, #bbb7b4 70%)",
              backgroundClip: "text",
              color: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            Let&apos;s Design Your Legal{" "}
            <span style={{ fontStyle: "italic" }}>Future</span> Together
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 6,
              fontSize: "1.25rem",
              color: "#e6f1fa",
              opacity: 0.9,
            }}
          >
            Join thousands of legal professionals who trust LegalMind to
            streamline their practice and deliver better outcomes for their
            clients.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ maxWidth: 500, mx: "auto" }}
          >
            <TextField
              placeholder="Enter your email address"
              type="email"
              label="Email Address"
              required
              variant="filled"
              fullWidth
              sx={{
                backgroundColor: "rgba(180, 184, 187, 0.15)",
                borderRadius: 2,
                "& .MuiFilledInput-root": {
                  backgroundColor: "rgba(180, 184, 187, 0.15)",
                  "&:hover": {
                    backgroundColor: "rgba(180, 184, 187, 0.25)",
                  },
                },
                "& .MuiFilledInput-input": {
                  color: "#f0f8ff",
                  "&::placeholder": {
                    color: "rgba(240, 248, 255, 0.7)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(240, 248, 255, 0.8)",
                },
              }}
            />
            <Button
              variant="contained"
              endIcon={<Send />}
              sx={{
                backgroundColor: "#f1f9ff",
                color: "#32393a",
                minWidth: 140,
                fontWeight: 700,
                boxShadow: "0 4px 32px rgba(180, 184, 187, 0.4)",
                "&:hover": {
                  backgroundColor: "#bdc9c4",
                  color: "#141818",
                  transform: "translateY(-4px) scale(1.04)",
                },
                transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
              }}
              type="submit"
              disabled={isEmailValid}
              aria-label="Subscribe to newletter with email"
            >
              Get Started
            </Button>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
