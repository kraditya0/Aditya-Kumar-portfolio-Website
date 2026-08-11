"use client";

import { motion, useReducedMotion } from "framer-motion";

export function BackgroundEffects() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="background-effects" aria-hidden="true">
      <div className="background-grid" />
      <motion.div
        className="ambient-light ambient-light-one"
        animate={reduceMotion ? undefined : { x: [0, 55, 0], y: [0, 28, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="ambient-light ambient-light-two"
        animate={reduceMotion ? undefined : { x: [0, -38, 0], y: [0, -46, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="noise" />
    </div>
  );
}
