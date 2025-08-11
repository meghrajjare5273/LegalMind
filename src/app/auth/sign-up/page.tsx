"use client";
import AuthShell from "@/components/auth/auth-shell";
import OAuthButtons from "@/components/auth/oauth-buttons";
import EmailPasswordForm from "@/components/auth/email-password-form";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your LegalMind account"
      description="Sign up to unlock AI‑powered contract analysis, research, and compliance — securely and fast."
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

      <EmailPasswordForm mode="sign-up" />

      <Typography
        variant="body2"
        sx={{ textAlign: "center", mt: 2, color: "text.secondary" }}
      >
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          style={{ color: "#ff4444", fontWeight: 600 }}
        >
          Sign in
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
        By signing up, you agree to our{" "}
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
