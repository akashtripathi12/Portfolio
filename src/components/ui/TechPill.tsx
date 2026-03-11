import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface TechPillProps extends HTMLMotionProps<'span'> {
  children: ReactNode;
  className?: string;
}

export function TechPill({ children, className, ...props }: TechPillProps) {
  return (
    <motion.span
      className={cn(
        'inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium',
        'bg-white/5 border border-white/10 text-gray-300',
        'hover:border-primary/50 hover:text-white hover:bg-white/10 transition-all duration-300',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.span>
  );
}
