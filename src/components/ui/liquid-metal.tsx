"use client";

import { LiquidMetal } from "@paper-design/shaders-react";
import { motion } from "framer-motion";

export default function ShadersBackground() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          className="w-screen h-screen"
          initial={{ opacity: 0.15, scale: 1 }}
          animate={{ opacity: 0.25, scale: 1.01 }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        >
          <LiquidMetal
            style={{
              width: "100vw",
              height: "100vh",
              filter: "blur(10px)",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            colorBack="hsl(0, 0%, 0%, 0)"
            colorTint="hsl(29, 45%, 35%)"
            repetition={3}
            softness={0.8}
            shiftRed={0.15}
            shiftBlue={0.15}
            distortion={0.08}
            contour={0.7}
            shape="none"
            offsetX={0}
            offsetY={0}
            scale={1}
            rotation={0}
            speed={1.5}
          />
        </motion.div>
      </div>
    </div>
  );
}
