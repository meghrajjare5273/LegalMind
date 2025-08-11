"use client";
import AuthShell from "@/components/auth/auth-shell";
import OAuthButtons from "@/components/auth/oauth-buttons";
import EmailPasswordForm from "@/components/auth/email-password-form";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome to LegalMind"
      description="LegalMind is a fast, simple and secure way to get legal insights. Protect your privacy and get help anywhere, anytime."
      imageAlt="Sandstone canyon image on the left panel"
    >
      <OAuthButtons />

      {/* Divider */}
      <Box
        role="separator"
        sx={{
          my: 2.5,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 2,
          color: "text.secondary",
        }}
      >
        <Box sx={{ height: 1, bgcolor: "divider" }} />
        <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
          Or
        </Typography>
        <Box sx={{ height: 1, bgcolor: "divider" }} />
      </Box>

      <EmailPasswordForm mode="sign-in" />

      <Typography
        variant="body2"
        sx={{ textAlign: "center", mt: 2, color: "text.secondary" }}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/sign-up"
          style={{ color: "#ff4444", fontWeight: 600 }}
        >
          Create one
        </Link>
      </Typography>

      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          mt: 2.5,
          color: "text.secondary",
        }}
      >
        By signing in, you agree to our{" "}
        <a href="#" style={{ color: "#ff4444" }}>
          Terms of service
        </a>{" "}
        &{" "}
        <a href="#" style={{ color: "#ff4444" }}>
          Privacy policy
        </a>
        .
      </Typography>
    </AuthShell>
  );
}
