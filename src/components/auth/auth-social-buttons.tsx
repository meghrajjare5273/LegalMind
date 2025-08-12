"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AuthSocialButtonsProps {
  onGoogleAuth: () => void;
  onMicrosoftAuth: () => void;
  isLoading: boolean;
}

export default function AuthSocialButtons({
  onGoogleAuth,
  onMicrosoftAuth,
  isLoading,
}: AuthSocialButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-2 mb-4"
    >
      <Button
        variant="social"
        size="lg"
        className="w-full h-10 text-sm font-medium"
        onClick={onGoogleAuth}
        disabled={isLoading}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </Button>

      <Button
        variant="social"
        size="lg"
        className="w-full h-10 text-sm font-medium"
        onClick={onMicrosoftAuth}
        disabled={isLoading}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M11.4 24H12.6V12.6H24V11.4H12.6V0H11.4V11.4H0V12.6H11.4V24Z"
            fill="#00BCF2"
          />
          <path d="M11.4 11.4H0V0H11.4V11.4Z" fill="#0078D4" />
          <path d="M24 11.4H12.6V0H24V11.4Z" fill="#00BCF2" />
          <path d="M11.4 24H0V12.6H11.4V24Z" fill="#40E0D0" />
          <path d="M24 24H12.6V12.6H24V24Z" fill="#FFB900" />
        </svg>
        Continue with Microsoft
      </Button>
    </motion.div>
  );
}
