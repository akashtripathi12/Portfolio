'use client';

import { motion } from 'framer-motion';
import { TechPill } from '@/components/ui/TechPill';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  githubFrontend?: string;
  githubBackend?: string;
  live?: string;
}

const FEATURED_PROJECTS: Project[] = [
  {
    id: "voyage-event-manager",
    title: "Voyage Event Manager",
    description: "Enterprise-grade SaaS platform for MICE events and destination weddings. Features a unified booking ecosystem, multi-round price negotiation engine, and deterministic auto-allocation algorithm for room assignments.",
    techStack: ["Next.js", "Go", "Fiber", "PostgreSQL", "Redis"],
    githubFrontend: "https://github.com/akashtripathi12/Voyage_Event_Manager",
    githubBackend: "https://github.com/akashtripathi12/VEM_Backend",
    live: "https://tbo-ten.vercel.app/"
  },
  {
    id: "twaran",
    title: "Twaran - INTER IIIT",
    description: "Production-scaled website for the registration of different IIITs for various sports events. Managed frontend development and integrated with 10+ API endpoints for real-time data handling. Implemented a multi-step registration system replacing Google Forms.",
    techStack: ["React.js", "Tailwind CSS", "Framer Motion", "GSAP", "REST APIs"],
    live: "https://twaran25.iiitm.ac.in/"
  },
  {
    id: "traveltoor",
    title: "TravelToor",
    description: "Full-fledged travel tour booking platform with package listings, detailed itineraries, and secure payments via Stripe integration. Features user profiles, order history tracking, and an automated newsletter subscription system.",
    techStack: ["Vanilla JS", "Node.js", "Express", "MongoDB", "Stripe"],
    githubFrontend: "https://github.com/akashtripathi12/TravelTicketFrontend",
    githubBackend: "https://github.com/akashtripathi12/TravelTicketBackend",
    live: "https://traveltoor.netlify.app/"
  }
];

const GRID_PROJECTS: Project[] = [
  {
    id: "interview-mate",
    title: "Interview Lit",
    description: "Real-time interview platform with a Docker-based sandbox environment for code execution. Features a multi-language IDE, live code sharing, and video call capabilities.",
    techStack: ["React", "Node.js", "Socket.io", "Docker", "MongoDB"],
    github: "https://github.com/akashtripathi12/InterviewMate"
  },
  {
    id: "restaurant-analytics",
    title: "Restaurant Analytics",
    description: "Data-driven analysis of restaurant orders featuring demand forecasting via Random Forest Regressor and a Streamlit dashboard for interactive insights.",
    techStack: ["Python", "Pandas", "Scikit-Learn", "Streamlit"],
    github: "https://github.com/akashtripathi12/Restaurant-Analysis"
  },
  {
    id: "smart-pdf-extractor",
    title: "Smart PDF Extractor",
    description: "Robust extraction engine using PyMuPDF and Tesseract OCR to intelligently detect and hierarchically classify document headings via advanced spatial heuristics.",
    techStack: ["Python", "PyMuPDF", "Pytesseract", "Docker"],
    github: "https://github.com/akashtripathi12/Smart-PDF-Extractor"
  }
];

// Shared action button
function ActionBtn({ href, icon: Icon, label }: { href: string; icon: typeof Github; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 flex justify-center items-center gap-2 py-2.5 text-xs font-medium text-gray-400 hover:text-white rounded-xl transition-all duration-300"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(124,58,237,0.4)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af"; }}
    >
      <Icon size={14} className="shrink-0" />
      <span>{label}</span>
    </a>
  );
}

export function ProjectGrid() {
  return (
    <section id="projects" className="relative py-32">

      {/* ── Section Header ── */}
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-24 relative z-10">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}
            className="text-gray-500 tracking-[0.25em] font-semibold uppercase text-xs mb-5">
            Portfolio
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
            className="text-5xl md:text-7xl font-black tracking-tight">
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 drop-shadow-[0_0_24px_rgba(167,139,250,0.4)]">
              Creations
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.1 }}
            className="text-gray-500 mt-5 max-w-2xl mx-auto text-sm">
            A selection of high-impact digital solutions built with focus on scalability, performance, and exceptional user experience.
          </motion.p>
        </div>
      </div>

      {/* ── Featured Projects ── */}
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24 mb-32 relative z-10">
        <div className="space-y-28">
          {FEATURED_PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className={`flex flex-col-reverse lg:flex-row items-stretch lg:items-center gap-0 lg:gap-16 w-full ${!isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-[38%] flex flex-col z-10"
                >
                  {/* Mobile: gradient card wrapper */}
                  <div
                    className="lg:hidden rounded-2xl p-px"
                    style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.25), transparent 70%, rgba(255,255,255,0.03))" }}
                  >
                    <div className="rounded-2xl bg-[#080404] p-5">
                      <p className="text-violet-400 font-semibold text-xs uppercase tracking-widest mb-1">Featured Project</p>
                      <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.techStack.map(t => <TechPill key={t} className="text-[10px] px-2 py-0.5">{t}</TechPill>)}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.github && <ActionBtn href={project.github} icon={Github} label="Source" />}
                        {project.githubFrontend && <ActionBtn href={project.githubFrontend} icon={Github} label="Frontend" />}
                        {project.githubBackend && <ActionBtn href={project.githubBackend} icon={Github} label="Backend" />}
                        {project.live && <ActionBtn href={project.live} icon={ExternalLink} label="Demo" />}
                      </div>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden lg:flex flex-col gap-6">
                    <div>
                      <p className="text-violet-400 font-semibold text-xs uppercase tracking-widest mb-3">Featured Project</p>
                      <h3 className="text-6xl xl:text-7xl font-black text-white leading-tight tracking-tight">{project.title}</h3>
                    </div>

                    {/* Desc card with gradient shell */}
                    <div
                      className="relative rounded-2xl p-px"
                      style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), transparent 70%, rgba(255,255,255,0.03))" }}
                    >
                      <div className="rounded-2xl bg-[#080404] p-6">
                        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                        <ul className="space-y-3">
                          {project.description.split('. ').filter(Boolean).map((s, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm lg:text-base leading-relaxed">
                              <span className="text-violet-400/60 mt-1 shrink-0">▸</span>
                              {s.trim()}{s.endsWith('.') ? '' : '.'}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(t => <TechPill key={t} className="px-3 py-1 text-xs">{t}</TechPill>)}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {project.github && <ActionBtn href={project.github} icon={Github} label="Source Code" />}
                      {project.githubFrontend && <ActionBtn href={project.githubFrontend} icon={Github} label="Frontend" />}
                      {project.githubBackend && <ActionBtn href={project.githubBackend} icon={Github} label="Backend" />}
                      {project.live && <ActionBtn href={project.live} icon={ExternalLink} label="Live Demo" />}
                    </div>
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-[62%] group cursor-pointer relative"
                >
                  {/* Glow behind image */}
                  <div className="absolute inset-0 bg-violet-500/8 rounded-2xl blur-3xl -z-10 hidden lg:block" />

                  <div
                    className="relative rounded-2xl overflow-hidden bg-[#080404]"
                    style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {/* Top gradient accent line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent z-10" />
                    <Image
                      src={
                        project.id === "voyage-event-manager" ? "/images/projects/tbo.webp" :
                        project.id === "twaran" ? "/images/projects/twaran.webp" :
                        project.id === "traveltoor" ? "/images/projects/traveltoor.webp" :
                        `https://placehold.co/1200x800/0a0505/3f3f3f?text=${project.title.replace(' ', '+')}`
                      }
                      alt={project.title}
                      width={1200}
                      height={800}
                      className="w-full h-[220px] md:h-[420px] lg:h-[560px] xl:h-[640px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Grid Projects ── */}
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}
          className="text-gray-500 tracking-[0.25em] font-semibold uppercase text-xs mb-12 text-center">
          More Projects
        </motion.p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {GRID_PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Gradient shell */}
              <div
                className="relative rounded-2xl p-px h-full transition-all duration-500 group"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.15), transparent 65%, rgba(255,255,255,0.03))",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                <div className="rounded-2xl bg-[#080404] overflow-hidden flex flex-col h-full">
                  {/* Red top accent */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

                  {/* Image */}
                  <div className="relative overflow-hidden border-b border-white/5">
                    <Image
                      src={`https://placehold.co/600x400/0a0505/2a2a2a?text=${project.title.replace(' ', '+')}`}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080404]/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{project.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-5">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.map(t => <TechPill key={t} className="px-2 py-0.5 text-[10px]">{t}</TechPill>)}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.github && <ActionBtn href={project.github} icon={Github} label="Source" />}
                      {project.githubFrontend && <ActionBtn href={project.githubFrontend} icon={Github} label="Frontend" />}
                      {project.githubBackend && <ActionBtn href={project.githubBackend} icon={Github} label="Backend" />}
                      {project.live && <ActionBtn href={project.live} icon={ExternalLink} label="Demo" />}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
