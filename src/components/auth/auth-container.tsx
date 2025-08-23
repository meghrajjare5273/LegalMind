"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";
import { useRouter } from "next/navigation";
import { AnimatedThemeToggler } from "../magicui/animated-theme-toggler";

type WhichForm = "signin" | "signup";

export default function AuthContainer({ whichForm }: { whichForm: WhichForm }) {
  const router = useRouter();

  const slideVariants = useMemo(
    () => ({
      enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
      center: { zIndex: 1, x: 0, opacity: 1 },
      exit: (dir: number) => ({
        zIndex: 0,
        x: dir < 0 ? 300 : -300,
        opacity: 0,
      }),
    }),
    []
  );

  const dir = whichForm === "signin" ? 1 : -1;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute top-4 right-4 z-50">
        <AnimatedThemeToggler />
      </div>

      <div className="w-full max-w-md relative px-4">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={whichForm}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            {whichForm === "signin" ? (
              <SignInForm onSwitchToSignUp={() => router.push("/sign-up")} />
            ) : (
              <SignUpForm onSwitchToSignIn={() => router.push("/sign-in")} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
