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
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ff4444 0%, #ff6b6b 100%)",
        py: 12,
        color: "white",
      }}
    >
      <Container maxWidth="md">
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
            sx={{ fontWeight: 700 }}
          >
            Let&apos;s Design Your Legal Future Together
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 6, fontSize: "1.25rem", opacity: 0.9 }}
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
              variant="filled"
              fullWidth
              sx={{
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: 2,
                "& .MuiFilledInput-root": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                },
                "& .MuiFilledInput-input": {
                  color: "white",
                  "&::placeholder": {
                    color: "rgba(255,255,255,0.7)",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              endIcon={<Send />}
              sx={{
                backgroundColor: "white",
                color: "primary.main",
                minWidth: 140,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.9)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Started
            </Button>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
