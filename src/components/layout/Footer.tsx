'use client';

import { portfolioData } from "@/lib/data";
import { Github, Linkedin, Code2, Code, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 px-6 border-t border-white/[0.05] bg-black/20">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight mb-2">
              Akash Tripathi
            </h3>
            <p className="text-gray-400 text-sm max-w-sm">
              Full Stack Developer & Competitive Programmer.
            </p>
          </div>

          <div className="flex md:justify-end gap-4">
            {[
              { href: portfolioData.social.github, icon: Github, label: "GitHub" },
              { href: portfolioData.social.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: portfolioData.social.leetcode, icon: Code2, label: "LeetCode" },
              { href: portfolioData.social.codeforces, icon: Code, label: "Codeforces" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-gray-400 hover:text-white hover:bg-violet-500/10 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.05] text-sm text-gray-500">
          <p>© {currentYear} Akash Tripathi. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Built with <Heart size={14} className="text-fuchsia-400 animate-pulse" /> & Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
