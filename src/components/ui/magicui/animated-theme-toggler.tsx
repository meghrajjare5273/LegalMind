/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Moon, Sun, SunDim } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { flushSync } from "react-dom";
// import { cn } from "@/lib/utils";
import { Button } from "../button";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const dark = document.documentElement.classList.toggle("dark");
        setIsDarkMode(dark);
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
  };
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
