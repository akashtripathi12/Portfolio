"use client";

import { motion, Variants } from "framer-motion";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiGreensock,
  SiFramer, SiSupabase, SiGit, SiGithub, SiPostman, SiVim,
  SiMysql, SiMongodb, SiPostgresql, SiJupyter, SiDocker, SiRedis,
  SiPython, SiCplusplus, SiNodedotjs, SiExpress, SiSvelte,
  SiBootstrap, SiPandas, SiNumpy, SiAndroidstudio, SiGo
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";

const SKILL_CATEGORIES = [
  {
    category: "LANGUAGES",
    accent: "#fff",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "SQL", icon: SiMysql, color: "#4479A1" },
      { name: "Java", icon: FaJava, color: "#007396" },
      { name: "C / C++", icon: SiCplusplus, color: "#00599C" },
    ]
  },
  {
    category: "FRONTEND",
    accent: "#fff",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "Svelte", icon: SiSvelte, color: "#FF3E00" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
      { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
    ]
  },
  {
    category: "BACKEND & DB",
    accent: "#fff",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#FFFFFF" },
      { name: "Fiber", icon: SiGo, color: "#00ADD8" },
      { name: "Asynq", icon: SiGo, color: "#00ADD8" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
    ]
  },
  {
    category: "ML & DATA",
    accent: "#fff",
    items: [
      { name: "Pandas", icon: SiPandas, color: "#e8e8e8" },
      { name: "NumPy", icon: SiNumpy, color: "#4ba3c7" },
      { name: "Jupyter", icon: SiJupyter, color: "#F37626" },
    ]
  },
  {
    category: "TOOLS",
    accent: "#fff",
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "Android Studio", icon: SiAndroidstudio, color: "#3DDC84" },
    ]
  }
];

export function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section id="skills" className="relative py-32 px-6">

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-24">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}
            className="text-gray-500 tracking-[0.25em] font-semibold uppercase text-xs mb-5">
            Arsenal
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
            className="text-5xl md:text-7xl font-black tracking-tight">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 drop-shadow-[0_0_24px_rgba(167,139,250,0.4)]">
              Stack
            </span>
          </motion.h2>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-16">
          {SKILL_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.category}
              className="flex flex-col gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-80px" }}
            >
              {/* Category Label */}
              <motion.div variants={itemVariants} className="flex items-center gap-3 px-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.accent, boxShadow: `0 0 8px ${cat.accent}` }} />
                <h2 className="text-lg md:text-xl font-bold tracking-widest text-gray-300">
                  {cat.category}
                </h2>
              </motion.div>

              {/* Items */}
              <div className="flex flex-wrap gap-x-6 gap-y-6 items-center px-2">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      whileHover={{ scale: 1.06, y: -3 }}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <div className="relative flex items-center justify-center p-2 rounded-lg transition-all duration-300">
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <Icon
                          size={30}
                          style={{ color: item.color }}
                          className="relative z-10 transition-all duration-300 opacity-70 group-hover:opacity-100"
                        />
                      </div>
                      <span className="text-base font-medium text-gray-500 group-hover:text-white transition-colors duration-300">
                        {item.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
