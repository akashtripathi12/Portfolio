'use client';

import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps, useMotionValue, useSpring } from 'framer-motion';

interface GlowingButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function GlowingButton({ 
  children, 
  className, 
  variant = 'primary',
  ...props 
}: GlowingButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-colors duration-300";
  
  const variants = {
    primary: "bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:shadow-[0_0_28px_rgba(124,58,237,0.6)]",
    secondary: "bg-white/5 text-white border border-white/10 hover:border-violet-500/50 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.2)]"
  };

  return (
    <motion.button
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
