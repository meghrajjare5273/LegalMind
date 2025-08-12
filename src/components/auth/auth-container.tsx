"use client";

import { Box, useTheme, useMediaQuery } from "@mui/material";
import type { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
}

export default function AuthContainer({ children }: AuthContainerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: {
          xs: "100%", // Full width on mobile
          sm: "500px",
          md: "900px",
          lg: "1100px",
          xl: "1200px",
        },
        height: {
          xs: "100vh", // Full viewport height on mobile
          sm: "95vh",
          md: "90vh",
        },
        mx: "auto", // This centers the container
        px: { xs: 0, sm: 2, md: 3, lg: 4 }, // No padding on mobile
        py: { xs: 0, sm: 3, md: 4, lg: 5 }, // No padding on mobile
        position: "relative",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Ensure content is centered
      }}
    >
      {children}
    </Box>
  );
}
