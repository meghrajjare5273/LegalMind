/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { Button } from "../button";
import { useTheme } from "next-themes";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get current theme state
  const isDarkMode = mounted ? resolvedTheme === "dark" : false;

  const changeTheme = async () => {
    if (!buttonRef.current || !mounted) return;

    const newTheme = theme === "dark" ? "light" : "dark";

    // Use view transition API if supported
    if (document.startViewTransition) {
      await document.startViewTransition(() => {
        flushSync(() => {
          setTheme(newTheme);
        });
      }).ready;

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const y = top + height / 2;
      const x = left + width / 2;

      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRad}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } else {
      // Fallback for browsers that don't support view transitions
      setTheme(newTheme);
    }
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-accent/50 transition-all duration-200 relative"
      >
        <div className="w-4 h-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      ref={buttonRef}
      onClick={changeTheme}
      className="h-9 w-9 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-accent/50 transition-all duration-200 relative"
      style={{
        transformOrigin: "center center",
      }}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformOrigin: "center center",
          }}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </motion.div>
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
