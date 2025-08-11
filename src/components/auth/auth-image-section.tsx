"use client";

import { Box, useTheme, useMediaQuery } from "@mui/material";

export default function AuthImageSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  if (isMobile) {
    // Return a compact header version for tablets
    return (
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          height: { md: "120px", lg: "100%" },
          background: "linear-gradient(135deg, #ff4444 0%, #ff6b6b 100%)",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            color: "white",
            textAlign: "center",
            px: 3,
            zIndex: 2,
          }}
        >
          <Box sx={{ fontSize: "1.5rem", fontWeight: 700, mb: 1 }}>
            LegalMind
          </Box>
          <Box sx={{ fontSize: "0.9rem", opacity: 0.9 }}>
            AI-powered legal intelligence
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "block" },
        position: "relative",
        minHeight: "100%",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        overflow: "hidden",
      }}
    >
      {/* Main content area */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ff4444 0%, #ff6b6b 100%)",
          color: "white",
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "80%",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: { lg: "1.3rem", xl: "1.5rem" },
            fontWeight: 600,
            textAlign: "center",
            backdropFilter: "blur(10px)",
            p: 3,
          }}
        >
          Legal Intelligence
          <br />
          Platform
        </Box>
      </Box>

      {/* Bottom description */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          background: "linear-gradient(to top, rgba(0,0,0,0.1), transparent)",
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
          pb: 4,
        }}
      >
        <Box
          sx={{
            color: "#666",
            textAlign: "center",
            px: { lg: 3, xl: 4 },
          }}
        >
          <Box
            sx={{
              fontSize: { lg: "1rem", xl: "1.1rem" },
              fontWeight: 600,
              mb: 1,
            }}
          >
            Transform Your Legal Practice
          </Box>
          <Box
            sx={{
              fontSize: { lg: "0.8rem", xl: "0.9rem" },
              opacity: 0.7,
            }}
          >
            AI-powered legal intelligence for modern law firms
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
