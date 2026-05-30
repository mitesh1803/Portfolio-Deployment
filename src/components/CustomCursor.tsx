'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useSpring(0, { stiffness: 800, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 800, damping: 40 });
  const ringX = useSpring(0, { stiffness: 200, damping: 25 });
  const ringY = useSpring(0, { stiffness: 200, damping: 25 });

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 5);
      cursorY.set(e.clientY - 5);
      ringX.set(e.clientX - 20);
      ringY.set(e.clientY - 20);
    };

    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, [data-hover]')) {
        setIsHovering(true);
      }
    };
    const out = () => setIsHovering(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
    };
  }, [isMobile, cursorX, cursorY, ringX, ringY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className={`${styles.cursor} ${isHovering ? styles.hovering : ''} ${isClicking ? styles.clicking : ''}`}
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className={`${styles.ring} ${isHovering ? styles.ringHovering : ''} ${isClicking ? styles.ringClicking : ''}`}
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
