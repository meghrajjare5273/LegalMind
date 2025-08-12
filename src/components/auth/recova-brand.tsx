"use client";
import { motion } from "framer-motion";

// Replace <svg ... /> below with your actual SVG logo or image
const LegalMindBrand = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }} // subtle scale-in
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center gap-4"
    >
      <motion.div
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Place your actual SVG or Image logo here */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="w-12 h-12"
        >
          {/* Example placeholder: replace with your real SVG/logo */}
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <circle cx="50" cy="50" r="48" stroke="#e53e3e" strokeWidth="4" />
            <text
              x="50%"
              y="35%"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="18"
              fill="#3c3c3c"
              dy=".3em"
            >
              LegalMind
            </text>
            <text
              x="50%"
              y="65%"
              textAnchor="middle"
              fontSize="8"
              fill="#e53e3e"
            >
              KNOW YOUR RIGHTS
            </text>
          </svg>
        </motion.div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-2xl font-semibold bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent"
      >
        LegalMind
      </motion.span>
    </motion.div>
  );
};
export default LegalMindBrand;
