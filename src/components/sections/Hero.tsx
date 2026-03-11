'use client';

import { motion, Variants } from 'framer-motion';
import { GlowingButton } from '@/components/ui/GlowingButton';
import { MockTerminal } from '@/components/ui/MockTerminal';
import { Github, Linkedin, Code2, ArrowRight, Code } from 'lucide-react';
import { portfolioData } from '@/lib/data';

const SNIPPET = `package main

type Developer struct {
\tName         string
\tRole         string
\tSkills       []string
}

func (d Developer) Learn() {}
func (d Developer) Build() {}
func (d Developer) Solve() {}

func main() {
\tdeveloper := Developer{
\t\tName: "Akash Tripathi",
\t\tRole: "Developer & Competitive Programmer",
\t\tSkills: []string{
\t\t\t"Web Development",
\t\t\t"Algorithms",
\t\t\t"Problem Solving",
\t\t},
\t}

\tfor {
\t\tdeveloper.Learn()
\t\tdeveloper.Build()
\t\tdeveloper.Solve()
\t}
}`;

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 2.2, staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const terminalVariants: Variants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 1.2, ease: "easeOut", delay: 2.6 },
    },
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8 z-10"
        >
          <div className="space-y-6">
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 w-fit">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full text-violet-400"
                style={{
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
              >
                Welcome to my universe
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black leading-tight text-white tracking-tight"
            >
              Turning{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 drop-shadow-[0_0_30px_rgba(167,139,250,0.4)]">
                Logic
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 drop-shadow-[0_0_20px_rgba(167,139,250,0.3)]">
                Into Reality
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
              I'm{' '}
              <span className="font-bold text-white">Akash Tripathi aka NEXUS</span>
              , a developer and competitive programmer who likes building web applications and solving problems with code.
            </motion.p>
          </div>

          {/* About Card — gradient glass shell */}
          <motion.div variants={itemVariants}>
            <div
              className="relative rounded-2xl p-px"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.3), transparent 60%, rgba(255,255,255,0.04))",
              }}
            >
              <div className="rounded-2xl bg-[#060008] px-6 py-5">
                {/* Top violet line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent rounded-full" />
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-violet-400 text-base animate-pulse">_</span>
                  <span className="tracking-tight">About me</span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  I enjoy building web applications and solving interesting problems through code. I like working on projects where I can combine functionality with good design, and I'm always looking for ways to improve how systems work. When I'm not building things, you'll probably find me practicing competitive programming or exploring new areas in tech.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <GlowingButton 
              variant="primary" 
              className="gap-2 group"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Let's Collaborate
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </GlowingButton>
            <GlowingButton variant="secondary" onClick={() => window.open('/resume.pdf', '_blank')}>
              Get Resume
            </GlowingButton>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-3">
            {[
              { href: portfolioData.social.github, icon: Github, label: "GitHub" },
              { href: portfolioData.social.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: portfolioData.social.leetcode, icon: Code2, label: "LeetCode" },
              { href: portfolioData.social.codeforces, icon: Code, label: "Codeforces" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="group p-3 rounded-xl text-gray-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(124,58,237,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 16px rgba(124,58,237,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Terminal */}
        <motion.div
          className="relative z-10 hidden lg:block"
          variants={terminalVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/08 rounded-full blur-[100px] pointer-events-none" />
          <div className="transform-gpu transition-transform duration-700 hover:-rotate-1 hover:scale-[1.01]">
            <MockTerminal
              title="greatness_calculator.go"
              codeSnippet={
                <span dangerouslySetInnerHTML={{
                  __html: SNIPPET
                    .replace(/func|var|for|if|return/g, m => `<span class='text-[#BB9AF7]'>${m}</span>`)
                    .replace(/float64/g, `<span class='text-[#7DCFFF]'>float64</span>`)
                    .replace(/math\.Log10|fmt\.Printf/g, m => `<span class='text-[#7AA2F7]'>${m}</span>`)
                    .replace(/"(.*?)"/g, m => `<span class='text-[#9ECE6A]'>${m}</span>`)
                    .replace(/\/\/.*/g, m => `<span class='text-[#565F89]'>${m}</span>`)
                }} />
              }
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5 text-violet-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
