"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ff4444", // Coral red from the design
      light: "#ff6b6b",
      dark: "#d32f2f",
    },
    secondary: {
      main: "#1a1a1a", // Deep black
      light: "#333333",
      dark: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#f8fafc",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.875rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1.125rem",
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: 600,
        },
      },
    },
  },
});
