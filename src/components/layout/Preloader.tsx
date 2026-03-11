"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  // Unmount after animation finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 1.5s delay + 1.2s wipe animation + small buffer

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#3b0764]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }} // Fade out the whole container after panels finish covering
        >
          {/* Text Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white text-6xl md:text-8xl font-bold tracking-widest uppercase z-10"
          >
            NEXUS
          </motion.h1>

          {/* Staggered Wipe Panels container */}
          <div className="absolute inset-0 flex z-20 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1/5 h-full dark:bg-[#050007] bg-zinc-50"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for a snappy wipe
                  delay: 1.5 + i * 0.1, // Staggered start after 1.5s
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
