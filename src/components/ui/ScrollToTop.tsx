"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(124,58,237,0.12))",
            border: "1px solid rgba(124,58,237,0.4)",
            boxShadow: "0 0 20px rgba(124,58,237,0.15)",
          }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(124,58,237,0.35)" }}
          whileTap={{ scale: 0.93 }}
        >
          <ChevronUp size={18} className="text-violet-400 group-hover:text-white transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
