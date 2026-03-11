'use client';

import { portfolioData } from "@/lib/data";
import { motion, Variants } from "framer-motion";
import { Trophy, Users, Star } from "lucide-react";

export function Milestones() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section id="honors" className="relative py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Achievements Column */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}>
            <div className="mb-10 flex items-center gap-4">
               <div className="p-3 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/20">
                 <Trophy className="text-fuchsia-400" size={24} />
               </div>
               <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Achievements</h2>
            </div>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {portfolioData.achievements.map((achievement, idx) => (
                <motion.div key={idx} variants={itemVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#080404] text-fuchsia-400 group-hover:text-white group-hover:bg-fuchsia-500/20 group-hover:border-fuchsia-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(217,70,239,0.1)] shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <Star size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.04] transition-colors duration-300">
                    <p className="text-gray-300 text-sm leading-relaxed">{achievement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership Column */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}>
            <div className="mb-10 flex items-center gap-4">
               <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
                 <Users className="text-violet-400" size={24} />
               </div>
               <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Leadership</h2>
            </div>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {portfolioData.leadership.map((role, idx) => (
                <motion.div key={idx} variants={itemVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#080404] text-violet-400 group-hover:text-white group-hover:bg-violet-500/20 group-hover:border-violet-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.1)] shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <Star size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.04] transition-colors duration-300">
                    <p className="text-gray-300 text-sm leading-relaxed">{role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
