"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, BookOpen, ChevronUp, Search, X, Loader2 } from "lucide-react";

export default function CheatsheetPage() {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadDoc() {
      try {
        const [mammoth, response] = await Promise.all([
          import("mammoth/mammoth.browser"),
          fetch("/fullstack-cheatsheet.docx"),
        ]);

        if (!response.ok) throw new Error(`Failed to fetch document (${response.status})`);

        const arrayBuffer = await response.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setHtml(result.value);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load document.");
      } finally {
        setLoading(false);
      }
    }
    loadDoc();
  }, []);

  // Highlight search matches in rendered content
  useEffect(() => {
    if (!contentRef.current) return;
    const container = contentRef.current;

    // Clear old highlights
    container.querySelectorAll("mark.cheat-highlight").forEach((el) => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ""), el);
        parent.normalize();
      }
    });

    if (!searchQuery.trim()) {
      setMatchCount(0);
      return;
    }

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    let count = 0;
    const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "gi");

    textNodes.forEach((textNode) => {
      const text = textNode.textContent || "";
      if (!regex.test(text)) return;
      regex.lastIndex = 0;

      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        count++;
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        const mark = document.createElement("mark");
        mark.className = "cheat-highlight";
        mark.textContent = match[0];
        fragment.appendChild(mark);
        lastIndex = match.index + match[0].length;
      }
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      textNode.parentNode?.replaceChild(fragment, textNode);
    });

    setMatchCount(count);
  }, [searchQuery, html]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-dark, #050000)" }}>
      {/* ── Hero Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden border-b"
        style={{ borderColor: "rgba(124,58,237,0.15)" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(124,58,237,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Icon */}
          <div
            className="p-4 rounded-2xl shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(124,58,237,0.08))",
              border: "1px solid rgba(124,58,237,0.3)",
              boxShadow: "0 0 30px rgba(124,58,237,0.15)",
            }}
          >
            <BookOpen size={32} className="text-violet-400" />
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-1">
              Reference Document
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Full‑Stack Cheatsheet
            </h1>
            <p className="text-gray-400 text-sm">
              A curated quick-reference guide for full-stack development — concepts, patterns &amp; snippets.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setSearchActive((s) => !s);
                setTimeout(() => searchInputRef.current?.focus(), 50);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Search size={15} />
              <span>Search</span>
            </button>
            <a
              href="/fullstack-cheatsheet.docx"
              download
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                border: "1px solid rgba(124,58,237,0.5)",
                boxShadow: "0 0 20px rgba(124,58,237,0.25)",
              }}
            >
              <Download size={15} />
              <span>Download</span>
            </a>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div
                className="max-w-5xl mx-auto px-6 pb-6 flex items-center gap-3"
              >
                <div
                  className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(124,58,237,0.25)",
                  }}
                >
                  <Search size={15} className="text-violet-400 shrink-0" />
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search in document..."
                    className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
                  />
                  {searchQuery && (
                    <span className="text-xs text-violet-400 shrink-0">{matchCount} result{matchCount !== 1 ? "s" : ""}</span>
                  )}
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="text-gray-500 hover:text-white transition-colors">
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 gap-4"
          >
            <Loader2 size={40} className="text-violet-400 animate-spin" />
            <p className="text-gray-400 text-sm">Loading document…</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-4 text-center"
          >
            <FileText size={48} className="text-red-400/60" />
            <p className="text-red-400 font-medium">{error}</p>
            <p className="text-gray-500 text-sm">Make sure <code className="text-violet-300">fullstack-cheatsheet.docx</code> is in the <code className="text-violet-300">public/</code> folder.</p>
          </motion.div>
        )}

        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(124,58,237,0.12)",
                boxShadow: "0 0 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <div
                ref={contentRef}
                className="cheatsheet-body p-6 md:p-10"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>

            {/* Bottom actions */}
            <div className="mt-8 flex items-center justify-between">
              <p className="text-xs text-gray-600">
                Rendered from <span className="text-violet-400/70">fullstack-cheatsheet.docx</span>
              </p>
              <button
                onClick={scrollTop}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <ChevronUp size={14} />
                Back to top
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Document styles ── */}
      <style jsx global>{`
        .cheatsheet-body {
          color: #d1d5db;
          font-size: 0.925rem;
          line-height: 1.75;
        }
        .cheatsheet-body h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #fff;
          margin: 1.5rem 0 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(124,58,237,0.2);
        }
        .cheatsheet-body h2 {
          font-size: 1.35rem;
          font-weight: 600;
          color: #c4b5fd;
          margin: 1.4rem 0 0.6rem;
        }
        .cheatsheet-body h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #a78bfa;
          margin: 1.2rem 0 0.4rem;
        }
        .cheatsheet-body h4, .cheatsheet-body h5, .cheatsheet-body h6 {
          font-size: 0.95rem;
          font-weight: 600;
          color: #8b5cf6;
          margin: 1rem 0 0.3rem;
        }
        .cheatsheet-body p {
          margin-bottom: 0.75rem;
          color: #9ca3af;
        }
        .cheatsheet-body strong, .cheatsheet-body b {
          color: #e5e7eb;
          font-weight: 600;
        }
        .cheatsheet-body em, .cheatsheet-body i {
          color: #c4b5fd;
          font-style: italic;
        }
        .cheatsheet-body ul, .cheatsheet-body ol {
          margin: 0.5rem 0 0.75rem 1.5rem;
          color: #9ca3af;
        }
        .cheatsheet-body li {
          margin-bottom: 0.3rem;
        }
        .cheatsheet-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0 1.25rem;
          font-size: 0.875rem;
          border-radius: 8px;
          overflow: hidden;
        }
        .cheatsheet-body th {
          background: rgba(124,58,237,0.15);
          color: #c4b5fd;
          font-weight: 600;
          padding: 0.6rem 1rem;
          text-align: left;
          border: 1px solid rgba(124,58,237,0.15);
        }
        .cheatsheet-body td {
          padding: 0.55rem 1rem;
          border: 1px solid rgba(255,255,255,0.05);
          color: #9ca3af;
        }
        .cheatsheet-body tr:nth-child(even) td {
          background: rgba(255,255,255,0.02);
        }
        .cheatsheet-body tr:hover td {
          background: rgba(124,58,237,0.05);
          transition: background 0.15s;
        }
        .cheatsheet-body code {
          font-family: "Geist Mono", monospace;
          background: rgba(124,58,237,0.12);
          color: #a78bfa;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-size: 0.82em;
          border: 1px solid rgba(124,58,237,0.15);
        }
        .cheatsheet-body pre {
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(124,58,237,0.15);
          border-radius: 10px;
          padding: 1rem 1.25rem;
          overflow-x: auto;
          margin: 0.75rem 0 1rem;
        }
        .cheatsheet-body pre code {
          background: none;
          border: none;
          padding: 0;
          color: #c4b5fd;
        }
        .cheatsheet-body a {
          color: #818cf8;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .cheatsheet-body a:hover {
          color: #a78bfa;
        }
        .cheatsheet-body blockquote {
          border-left: 3px solid rgba(124,58,237,0.5);
          padding: 0.5rem 1rem;
          margin: 0.75rem 0;
          background: rgba(124,58,237,0.05);
          border-radius: 0 8px 8px 0;
          color: #9ca3af;
          font-style: italic;
        }
        .cheatsheet-body hr {
          border: none;
          border-top: 1px solid rgba(124,58,237,0.15);
          margin: 1.5rem 0;
        }
        mark.cheat-highlight {
          background: rgba(124,58,237,0.45);
          color: #fff;
          border-radius: 2px;
          padding: 0 1px;
        }
      `}</style>
    </div>
  );
}
