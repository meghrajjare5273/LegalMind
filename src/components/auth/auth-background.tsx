"use client";

import { Box } from "@mui/material";

export default function AuthBackground() {
  return (
    <>
      {/* Main gradient background */}
      {/* <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 50%, #ffa8a8 100%)",
        }}
      /> */}

      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("../palace-4781577_1920.jpg")`,
          filter: "blur(3px)",
        }}
      />

      {/* Decorative shapes */}
      {/* <Box
        sx={{
          position: "absolute",
          top: -70,
          right: -100,
          width: 300,
          height: 200,
          background: "rgba(255,255,255,0.07)",
          borderRadius: "50%",
          filter: "blur(24px)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -80,
          width: 250,
          height: 180,
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
          filter: "blur(20px)",
          zIndex: 0,
        }}
      /> */}
    </>
  );
}
