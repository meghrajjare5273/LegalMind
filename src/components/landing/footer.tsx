"use client";
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  IconButton,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import {
  LinkedIn,
  Twitter,
  GitHub,
  Email,
  Phone,
  LocationOn,
  Send,
  Scale,
  Security,
  Speed,
} from "@mui/icons-material";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "secondary.main",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background:
              "linear-gradient(90deg, #ff4444 0%, #ff6b6b 50%, #ff4444 100%)",
          },
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Newsletter Section */}
        <Box sx={{ py: 6, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 1, color: "white" }}
                >
                  Stay Updated with Legal Tech
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, mb: 2 }}>
                  Get the latest insights on AI in legal practice, product
                  updates, and industry trends.
                </Typography>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  component="form"
                  onSubmit={handleNewsletterSubmit}
                  sx={{ display: "flex", gap: 2, maxWidth: 400, ml: "auto" }}
                >
                  <TextField
                    placeholder="Enter your email"
                    type="email"
                    variant="outlined"
                    size="small"
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "rgba(255,255,255,0.3)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#ff4444",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "white",
                        "&::placeholder": {
                          color: "rgba(255,255,255,0.7)",
                        },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#ff4444",
                      borderRadius: 2,
                      minWidth: "auto",
                      px: 3,
                      "&:hover": {
                        backgroundColor: "#ff6b6b",
                      },
                    }}
                  >
                    <Send sx={{ fontSize: 20 }} />
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Main Footer Content */}
        <Box sx={{ py: 8 }}>
          <Grid container spacing={6}>
            {/* Company Info */}
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#ff4444",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <Scale sx={{ color: "white", fontSize: 24 }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "white" }}
                  >
                    LegalMind
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, opacity: 0.9, lineHeight: 1.6 }}
                >
                  Transforming legal practice with innovative AI technology and
                  intelligent analysis.
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
                  Trusted by 10,000+ legal professionals worldwide.
                </Typography>

                {/* Social Links */}
                <Stack direction="row" spacing={1}>
                  {[
                    { icon: <LinkedIn />, href: "#", label: "LinkedIn" },
                    { icon: <Twitter />, href: "#", label: "Twitter" },
                    { icon: <GitHub />, href: "#", label: "GitHub" },
                  ].map((social, index) => (
                    <IconButton
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#ff4444",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Product Links */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 3, color: "white" }}
                >
                  Product
                </Typography>
                <Stack spacing={2}>
                  {[
                    "Features",
                    "Contract Analysis",
                    "Legal Research",
                    "Compliance Tools",
                    "API Access",
                    "Integrations",
                  ].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      color="inherit"
                      sx={{
                        opacity: 0.8,
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        "&:hover": {
                          opacity: 1,
                          color: "#ff4444",
                          transform: "translateX(4px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {item}
                    </Link>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Company Links */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 3, color: "white" }}
                >
                  Company
                </Typography>
                <Stack spacing={2}>
                  {[
                    "About Us",
                    "Careers",
                    "Blog",
                    "Press Kit",
                    "Partners",
                    "Investors",
                  ].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      color="inherit"
                      sx={{
                        opacity: 0.8,
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        "&:hover": {
                          opacity: 1,
                          color: "#ff4444",
                          transform: "translateX(4px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {item}
                    </Link>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Resources Links */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 3, color: "white" }}
                >
                  Resources
                </Typography>
                <Stack spacing={2}>
                  {[
                    "Documentation",
                    "Help Center",
                    "Community",
                    "Webinars",
                    "Case Studies",
                    "White Papers",
                  ].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      color="inherit"
                      sx={{
                        opacity: 0.8,
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        "&:hover": {
                          opacity: 1,
                          color: "#ff4444",
                          transform: "translateX(4px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {item}
                    </Link>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Contact Info */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 3, color: "white" }}
                >
                  Contact
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Email sx={{ fontSize: 16, color: "#ff4444" }} />
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      hello@legalmind.ai
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Phone sx={{ fontSize: 16, color: "#ff4444" }} />
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      1-800-LEGAL-AI
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOn sx={{ fontSize: 16, color: "#ff4444" }} />
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      San Francisco, CA
                    </Typography>
                  </Box>
                </Stack>

                {/* Trust Badges */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="body2" sx={{ opacity: 0.6, mb: 2 }}>
                    Trusted & Secure
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      <Security sx={{ fontSize: 14, color: "#4caf50" }} />
                      <Typography variant="caption">SOC 2</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      <Speed sx={{ fontSize: 14, color: "#2196f3" }} />
                      <Typography variant="caption">99.9%</Typography>
                    </Box>
                  </Stack>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Bottom Section */}
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
        <Box sx={{ py: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                © 2025 LegalMind AI. All rights reserved. | Built with ❤️ for
                legal professionals.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                  flexWrap: "wrap",
                }}
              >
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Security",
                ].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    color="inherit"
                    sx={{
                      opacity: 0.7,
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      "&:hover": {
                        opacity: 1,
                        color: "#ff4444",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
