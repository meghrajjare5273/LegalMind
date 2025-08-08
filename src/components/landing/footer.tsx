"use client";

import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const linkSx = { opacity: 0.8, "&:hover": { opacity: 1 } };

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0b0b14",
        color: "white",
        pt: 4,
        pb: 8,
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container maxWidth="lg">
        {/* Top bar with version/search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 5,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.2)",
              textTransform: "none",
              "&:hover": { borderColor: "rgba(255,255,255,0.35)" },
            }}
          >
            See latest version
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <TextField
            placeholder="Search…"
            size="small"
            sx={{
              minWidth: 260,
              "& .MuiOutlinedInput-root": {
                color: "white",
                bgcolor: "rgba(255,255,255,0.06)",
                "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                "&:hover fieldset": { borderColor: "rgba(255,255,255,0.25)" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Links grid */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3, sm: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              LegalMind
            </Typography>
            <Box sx={{ display: "grid", gap: 1 }}>
              <MuiLink href="#features" color="inherit" sx={linkSx}>
                Features
              </MuiLink>
              <MuiLink href="#about" color="inherit" sx={linkSx}>
                About
              </MuiLink>
              <MuiLink href="/contract-review" color="inherit" sx={linkSx}>
                Contract Review
              </MuiLink>
              <MuiLink href="/chat" color="inherit" sx={linkSx}>
                Chat
              </MuiLink>
              <MuiLink href="#faqs" color="inherit" sx={linkSx}>
                FAQs
              </MuiLink>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3, sm: 6 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Resources
            </Typography>
            <Box sx={{ display: "grid", gap: 1 }}>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                Documentation
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                Blog
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                Community
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                Case studies
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                Changelog
              </MuiLink>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3, sm: 6 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Company
            </Typography>
            <Box sx={{ display: "grid", gap: 1 }}>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                Team
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                Careers
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                Press
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                Contact
              </MuiLink>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3, sm: 6 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Socials
            </Typography>
            <Box sx={{ display: "grid", gap: 1 }}>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                X
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                LinkedIn
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                YouTube
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                Instagram
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={linkSx}>
                Pinterest
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom row */}
        <Box
          sx={{
            mt: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            borderTop: "1px dashed rgba(255,255,255,0.12)",
            pt: 3,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} LegalMind. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <MuiLink href="#" color="inherit" sx={linkSx}>
              Privacy Policy
            </MuiLink>
            <MuiLink href="#" color="inherit" sx={linkSx}>
              Terms
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
