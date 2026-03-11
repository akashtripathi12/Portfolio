'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { TechPill } from '@/components/ui/TechPill';
import { Briefcase, GraduationCap } from 'lucide-react';

const EXPERIENCES = [
  {
    id: 1,
    role: "Full-stack Web Developer Intern",
    company: "Web Wizards",
    date: "September 2024 – December 2024",
    accent: "#7c3aed",
    icon: Briefcase,
    points: [
      "Developed a pixel-perfect, interactive UI, managing over 100 interactive elements for visualizing and analyzing complex systems, such as water management processes.",
      "Designed a drag-and-drop industrial process design tool using JointJS, enabling monitoring of 100+ interactive elements and including a minimap for efficient canvas navigation.",
      "Enabled customization for 100+ element properties, added undo/redo functionality and integrated JSON-based export/import, reducing configuration time by 80%."
    ],
    techStack: ["React.js", "Node.js", "JointJS", "Tailwind CSS"]
  },
  {
    id: 2,
    role: "B.Tech in Information Technology",
    company: "Indian Institute of Information Technology Gwalior",
    date: "August 2023 - Expected May 2027",
    accent: "#d946ef",
    icon: GraduationCap,
    points: [
      "CGPA: 8.23"
    ],
    techStack: ["Data Structures & Algorithms", "DBMS", "OOP", "Operating Systems", "Computer Networks"]
  }
];

export function ExperienceLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section id="journey" className="relative py-32 px-6" ref={containerRef}>

      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-24 relative z-10">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}
            className="text-gray-500 tracking-[0.25em] font-semibold uppercase text-xs mb-5">
            Career Path
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
            className="text-5xl md:text-7xl font-black tracking-tight">
            Professional{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 drop-shadow-[0_0_24px_rgba(167,139,250,0.4)]">
              Journey
            </span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Background line */}
          <div className="absolute left-4 md:left-1/2 -ml-[1px] top-0 bottom-0 w-0.5 bg-white/5" />

          {/* Animated red line */}
          <motion.div
            style={{ scaleY, originY: 0, background: "linear-gradient(to bottom, #8b5cf6, #d946ef)", boxShadow: "0 0 12px rgba(139,92,246,0.5)" }}
            className="absolute left-4 md:left-1/2 -ml-[1px] top-0 bottom-0 w-0.5 z-0"
          />

          <div className="space-y-24 relative z-10">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;
              const Icon = exp.icon;
              return (
                <div key={exp.id} className="relative flex flex-col md:flex-row items-center w-full">
                  {/* Node */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="absolute left-[3px] md:left-1/2 -ml-4 w-8 h-8 rounded-xl z-20 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(139,92,246,0.5), rgba(139,92,246,0.15))",
                      border: "1px solid rgba(139,92,246,0.5)",
                      boxShadow: "0 0 20px rgba(139,92,246,0.4)",
                    }}
                  >
                    <Icon size={14} className="text-violet-300" />
                  </motion.div>

                  {/* Date Badge */}
                  <div className={`hidden md:flex w-1/2 ${isEven ? 'justify-end pr-16' : 'justify-start pl-16 order-last'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.3 }}
                      className="text-xs font-mono font-medium px-4 py-2 rounded-full text-gray-400"
                      style={{
                        background: "rgba(139,92,246,0.06)",
                        border: "1px solid rgba(139,92,246,0.2)",
                      }}
                    >
                      {exp.date}
                    </motion.div>
                  </div>

                  {/* Content Card — gradient shell */}
                  <div className={`w-full pl-12 md:pl-0 pt-8 md:pt-0 md:w-1/2 ${isEven ? 'md:pr-16 order-first' : 'md:pl-16'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {/* Gradient shell */}
                      <div
                        className="relative rounded-2xl p-px transition-all duration-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.12)]"
                        style={{
                          background: "linear-gradient(135deg, rgba(124,58,237,0.25), transparent 65%, rgba(255,255,255,0.04))",
                        }}
                      >
                        <div className="rounded-2xl bg-[#080404] p-5 md:p-8">
                          {/* Red top edge */}
                          <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

                          {/* Header */}
                          <div className="flex items-start gap-3 md:gap-4 mb-5">
                            <div
                              className="p-2 md:p-3 rounded-xl shrink-0"
                              style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)" }}
                            >
                              <Icon className="w-4 h-4 md:w-6 md:h-6 text-violet-400" />
                            </div>
                            <div>
                              <h3 className="text-lg md:text-2xl font-bold text-white leading-tight tracking-tight">{exp.role}</h3>
                              <p className="text-violet-400 mt-1 text-sm md:text-base font-medium">{exp.company}</p>
                              {/* Mobile date */}
                              <p className="text-gray-600 text-xs mt-1 md:hidden font-mono">{exp.date}</p>
                            </div>
                          </div>

                          {/* Points */}
                          <ul className="space-y-2 md:space-y-3 mb-6">
                            {exp.points.map((point, i) => (
                              <li key={i} className="text-gray-400 text-xs md:text-sm flex items-start gap-2 md:gap-3 leading-relaxed">
                                <span className="text-violet-400/70 mt-0.5 shrink-0">▸</span>
                                {point}
                              </li>
                            ))}
                          </ul>

                          {/* Tech pills */}
                          <div className="flex flex-wrap gap-2">
                            {exp.techStack.map(t => (
                              <TechPill key={t} className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs">{t}</TechPill>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
