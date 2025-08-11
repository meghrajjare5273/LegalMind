"use client";
import { useState } from "react";
import type React from "react";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const baseSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(200, "Email is too long."),
});

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128, "Password is too long.")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d).+$/,
    "Use at least one letter and one number."
  );

const signInSchema = baseSchema.extend({
  password: passwordSchema,
});

const signUpSchema = baseSchema.extend({
  password: passwordSchema,
});

export default function EmailPasswordForm({
  mode,
}: {
  mode: "sign-in" | "sign-up";
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const schema = mode === "sign-in" ? signInSchema : signUpSchema;
      schema.parse({ email, password: pw });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0]?.message || "Invalid input.");
        return;
      }
    }

    setBusy(true);
    try {
      if (mode === "sign-in") {
        const res = await authClient.signIn.email({
          email,
          password: pw,
          callbackURL: "/chat",
        });
        if (res?.url) {
          window.location.href = res.url as string;
        } else {
          router.push("/chat");
        }
      } else {
        const res = await authClient.signUp.email({
          name,
          email,
          password: pw,
          callbackURL: "/chat",
        });
        if (res?.url) {
          window.location.href = res.url as string;
        } else {
          router.push("/chat");
        }
      }
    } catch (e) {
      console.error(e);
      setError("We couldn’t complete the request. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "grid", gap: 1.25 }}
    >
      <FormControl>
        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john.doe@email.com"
          inputMode="email"
          autoComplete="email"
          fullWidth
          variant="outlined"
          aria-label="Email address"
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 44,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail size={18} />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <FormControl>
        <TextField
          type={showPw ? "text" : "password"}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder={
            mode === "sign-in" ? "Your password" : "Create a password"
          }
          autoComplete={
            mode === "sign-in" ? "current-password" : "new-password"
          }
          fullWidth
          variant="outlined"
          aria-label="Password"
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 44,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock size={18} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPw ? "Hide password" : "Show password"}
                  onClick={() => setShowPw((s) => !s)}
                  edge="end"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error ? (
          <FormHelperText error sx={{ mt: 1 }}>
            {error}
          </FormHelperText>
        ) : null}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        disabled={busy}
        sx={{
          mt: 0.5,
          height: 44,
          borderRadius: 1.5,
          fontWeight: 700,
          backgroundColor: "primary.light",
          color: "white",
          textTransform: "none",
          "&:hover": { backgroundColor: "primary.main" },
        }}
      >
        {busy
          ? mode === "sign-in"
            ? "Signing in…"
            : "Creating account…"
          : mode === "sign-in"
          ? "Continue with email"
          : "Create account"}
      </Button>
    </Box>
  );
}
