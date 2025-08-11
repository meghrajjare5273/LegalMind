"use client";
import { motion } from "framer-motion";

const RecovaBrand = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center gap-3"
    >
      <motion.div
        initial={{ rotate: -45 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 rounded-lg flex items-center justify-center shadow-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-4 h-4 bg-white rounded-sm transform rotate-45"
          />
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
      >
        Recova
      </motion.span>
    </motion.div>
  );
};

export default RecovaBrand;
