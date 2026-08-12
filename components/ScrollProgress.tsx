"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.18,
  });
  const reduceMotion = useReducedMotion();

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.span
        style={{ scaleX: reduceMotion ? scrollYProgress : smoothProgress }}
      />
    </div>
  );
}
