import { Box, Container, Typography, Link, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "secondary.main",
        color: "white",
        py: 7,
        borderTop: "5px solid #ff4444",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              LegalMind
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, opacity: 0.85 }}>
              Mastering the Art of Legal Intelligence
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.65 }}>
              Transforming legal practice with innovative AI & intelligent
              analysis.
            </Typography>
          </Grid>
          {/* Columns for Company & Platform */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
              >
                About Us
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
              >
                Careers
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
              >
                Blog
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
              >
                Press
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Platform
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
              >
                Features
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
              >
                Security
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
              >
                API
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
              >
                Pricing
              </Link>
            </Box>
          </Grid>
          {/* Contact */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ textAlign: { xs: "left", md: "right" } }}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Contact
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
              hello@legalmind.ai
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              1-800-LEGAL-AI
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, backgroundColor: "rgba(255,255,255,0.13)" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.64 }}>
            © 2025 LegalMind AI. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              href="#"
              color="inherit"
              sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
