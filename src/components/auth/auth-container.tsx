"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../theme-toggle";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";

export default function AuthContainer() {
  const pathname = usePathname();
  const [isSignIn, setIsSignIn] = useState(pathname === "/sign-in");

  useEffect(() => {
    setIsSignIn(pathname === "/sign-in");
  }, [pathname]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md relative p-2 overflow-visible">
        <AnimatePresence mode="wait" custom={isSignIn ? 1 : -1}>
          <motion.div
            key={isSignIn ? "signin" : "signup"}
            custom={isSignIn ? 1 : -1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                setIsSignIn(false);
              } else if (swipe > swipeConfidenceThreshold) {
                setIsSignIn(true);
              }
            }}
            className="w-full"
          >
            {isSignIn ? (
              <SignInForm onSwitchToSignUp={() => setIsSignIn(false)} />
            ) : (
              <SignUpForm onSwitchToSignIn={() => setIsSignIn(true)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
