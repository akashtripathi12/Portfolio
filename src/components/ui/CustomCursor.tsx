'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring spring
  const springConfigRing = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfigRing);
  const cursorYSpring = useSpring(mouseY, springConfigRing);

  // Inner dot spring (faster)
  const springConfigDot = { damping: 30, stiffness: 400, mass: 0.1 };
  const dotXSpring = useSpring(mouseX, springConfigDot);
  const dotYSpring = useSpring(mouseY, springConfigDot);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Hide cursor on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-violet-500/50 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(124, 58, 237, 0.8)' : 'rgba(124, 58, 237, 0.5)',
        }}
        transition={{ duration: 0.2 }}
      />
      
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-fuchsia-400 pointer-events-none z-[10000] mix-blend-screen"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />
    </>
  );
}
