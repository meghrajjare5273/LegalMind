import { Box, Container, Typography, Link, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "secondary.main", color: "white", py: 8 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              LegalMind
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Mastering the Art of Legal Intelligence
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              Transforming legal practice through innovative AI technology and
              intelligent document analysis.
            </Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}
              >
                About Us
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}
              >
                Careers
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}
              >
                Blog
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}
              >
                Press
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Platform
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}
              >
                Features
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}
              >
                Security
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}
              >
                API
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}
              >
                Pricing
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Contact
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
              hello@legalmind.ai
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              1-800-LEGAL-AI
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: "rgba(255,255,255,0.1)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © 2025 LegalMind AI. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              href="#"
              color="inherit"
              sx={{ opacity: 0.6, "&:hover": { opacity: 1 } }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              sx={{ opacity: 0.6, "&:hover": { opacity: 1 } }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
