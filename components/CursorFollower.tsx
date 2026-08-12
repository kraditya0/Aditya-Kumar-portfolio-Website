"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorFollower() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 850, damping: 52, mass: 0.16 });
  const y = useSpring(pointerY, { stiffness: 850, damping: 52, mass: 0.16 });
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateAvailability = () => setEnabled(pointerQuery.matches && !reduceMotion);
    updateAvailability();
    pointerQuery.addEventListener("change", updateAvailability);
    return () => pointerQuery.removeEventListener("change", updateAvailability);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    let lastX = -100;
    let lastY = -100;

    const updateControl = (target: Element | null) => {
      const control = target?.closest<HTMLElement>("a, button, [data-cursor-interactive]");
      setInteractive(Boolean(control));
      setLabel(control?.dataset.cursorLabel ?? "");
    };

    const handlePointerMove = (event: PointerEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);
      updateControl(event.target as Element | null);
    };
    const updateAfterViewportChange = () => updateControl(document.elementFromPoint(lastX, lastY));
    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", updateAfterViewportChange, { passive: true });
    window.addEventListener("resize", updateAfterViewportChange, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", updateAfterViewportChange);
      window.removeEventListener("resize", updateAfterViewportChange);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`cursor-follower ${interactive ? "cursor-interactive" : ""} ${label ? "cursor-labeled" : ""}`}
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.15 } }}
      aria-hidden="true"
    >
      {label && <span>{label}</span>}
    </motion.div>
  );
}
