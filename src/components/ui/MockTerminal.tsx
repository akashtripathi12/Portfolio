import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MockTerminalProps {
  codeSnippet: ReactNode;
  title?: string;
}

export function MockTerminal({ codeSnippet, title = 'terminal' }: MockTerminalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto bg-[#1A1B26] rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20"
    >
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-[#16161E] border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F7768E]" />
          <div className="w-3 h-3 rounded-full bg-[#E0AF68]" />
          <div className="w-3 h-3 rounded-full bg-[#9ECE6A]" />
        </div>
        <div className="mx-auto text-xs text-gray-400 font-mono">
          {title}
        </div>
      </div>
      
      {/* Terminal Body */}
      <div className="p-6 overflow-x-auto font-mono text-sm leading-relaxed text-[#A9B1D6]">
        <div className="whitespace-pre">
          {codeSnippet}
        </div>
      </div>
    </motion.div>
  );
}
