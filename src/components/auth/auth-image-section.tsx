"use client";

import { Box } from "@mui/material";
// import Image from "next/image";

export default function AuthImageSection() {
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
      {/* Placeholder for main image - replace with your actual image */}
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
        {/* You can replace this with an actual Image component */}
        <Box
          sx={{
            width: "80%",
            height: "80%",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 600,
            textAlign: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          Legal Intelligence
          <br />
          Platform
        </Box>
      </Box>

      {/* Decorative overlay */}
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
            px: 4,
          }}
        >
          <Box sx={{ fontSize: "1.1rem", fontWeight: 600, mb: 1 }}>
            Transform Your Legal Practice
          </Box>
          <Box sx={{ fontSize: "0.9rem", opacity: 0.7 }}>
            AI-powered legal intelligence for modern law firms
          </Box>
        </Box>
      </Box>

      {/* Optional: Replace with actual image */}
      {/* 
      <Image
        src="/path-to-your-auth-image.jpg"
        alt="Legal platform illustration"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      */}
    </Box>
  );
}
