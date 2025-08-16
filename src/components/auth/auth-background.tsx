"use client";

import { Box, useTheme, useMediaQuery } from "@mui/material";

export default function AuthBackground() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: isMobile
            ? "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 50%, #ffa8a8 100%)"
            : `url("../pexels-francesco-ungaro-998641.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: isMobile ? "none" : "blur(3px)",
        }}
      />

      {/* Simple overlay for mobile */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: isMobile ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.1)",
        }}
      />
    </>
  );
}
