"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "About", href: "#about" },
  { name: "Journey", href: "#journey" },
  { name: "Skills", href: "#skills" },
  { name: "Honors", href: "#honors" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.href.replace("#", ""));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 pt-5 px-6 pointer-events-none">
        <div className="max-w-[1920px] mx-auto flex items-center justify-center pointer-events-auto">
          {/* Desktop pill */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-1 px-2 py-2 rounded-full backdrop-blur-xl relative"
            style={{
              background: "rgba(5,0,0,0.75)",
              border: "1px solid rgba(124,58,237,0.2)",
              boxShadow: "0 0 24px rgba(124,58,237,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent rounded-full" />
            {links.map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(124,58,237,0.08))",
                        border: "1px solid rgba(124,58,237,0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </motion.div>

          {/* Mobile hamburger */}
          <motion.button
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden ml-auto p-2.5 rounded-xl text-gray-300 hover:text-white transition-colors"
            style={{
              background: "rgba(5,0,0,0.8)",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-[72px] left-4 right-4 z-40 md:hidden rounded-2xl overflow-hidden"
            style={{
              background: "rgba(5,0,0,0.92)",
              border: "1px solid rgba(124,58,237,0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Red top accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            <div className="p-3 flex flex-col gap-1">
              {links.map((link, i) => {
                const isActive = active === link.href.replace("#", "");
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-white bg-violet-500/10 border border-violet-500/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      )}
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
