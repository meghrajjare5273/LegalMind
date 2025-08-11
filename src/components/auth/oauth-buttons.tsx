"use client";
import { Button, Stack, Tooltip } from "@mui/material";
import { Chrome, Grid2X2 } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function OAuthButtons() {
  const [loading, setLoading] = useState<"google" | "microsoft" | null>(null);

  const signInWithGoogle = async () => {
    try {
      setLoading("google");
      // Better-Auth social sign-in (Google configured in the project)
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/chat",
      });
      // If the client does not auto-redirect, fall back:
      if (res?.url) window.location.href = res.url as string;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  };

  const signInWithMicrosoft = async () => {
    // Not configured in auth.ts; provide gentle feedback.
    setLoading("microsoft");
    setTimeout(() => setLoading(null), 600);
    alert(
      "Microsoft sign-in is not configured. Add the provider in src/lib/auth.ts to enable."
    );
  };

  return (
    <Stack spacing={1.25}>
      <Button
        onClick={signInWithGoogle}
        disabled={loading === "google"}
        startIcon={<Chrome size={18} />}
        variant="outlined"
        sx={{
          borderColor: "divider",
          justifyContent: "flex-start",
          height: 44,
          fontWeight: 600,
          "&:hover": { borderColor: "primary.main", backgroundColor: "white" },
        }}
      >
        {loading === "google"
          ? "Connecting to Google..."
          : "Continue with Google"}
      </Button>

      <Tooltip title="Configure Microsoft in auth.ts to enable" placement="top">
        <span>
          <Button
            onClick={signInWithMicrosoft}
            disabled
            startIcon={<Grid2X2 size={18} />}
            variant="outlined"
            sx={{
              borderColor: "divider",
              justifyContent: "flex-start",
              height: 44,
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            Continue with Microsoft
          </Button>
        </span>
      </Tooltip>
    </Stack>
  );
}
