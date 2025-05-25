"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900"
        >
          <div className="relative" style={{ height: "200px" }}>
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: "url(/images/lawyer-professional.png)",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div className="absolute inset-0 animate-pulse z-10 bg-neutral-900" />
            <span
              className="font-black absolute inset-0 z-20 text-center bg-clip-text text-transparent pointer-events-none"
              style={{
                backgroundImage: "url(/images/lawyer-professional.png)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                fontSize: "clamp(3rem, 12vw, 6rem)",
                lineHeight: "200px",
              }}
            >
              LegalMind
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
