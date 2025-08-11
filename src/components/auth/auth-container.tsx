"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
}

export default function AuthContainer({ children }: AuthContainerProps) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        height: { xs: "98vh", md: "95vh" },
        mx: "auto",
        px: { xs: 1, md: 2 },
        position: "relative",
        zIndex: 1,
      }}
    >
      {children}
    </Box>
  );
}
