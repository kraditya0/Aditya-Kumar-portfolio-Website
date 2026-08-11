"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { contact } from "@/data/content";
import { ResumeLink } from "./ResumeLink";

const nodes = [
  { label: "AI / ML", type: "01", className: "system-node node-ai" },
  { label: "Data", type: "02", className: "system-node node-data" },
  { label: "Models", type: "03", className: "system-node node-models" },
  { label: "APIs", type: "04", className: "system-node node-api" },
  { label: "Web Apps", type: "05", className: "system-node node-web" },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="hero container" id="home">
      <div className="hero-copy">
        <motion.div className="availability" {...enter(0.12)}>
          <span className="status-dot" /> Open to opportunities
        </motion.div>
        <motion.p className="eyebrow" {...enter(0.18)}>
          AI/ML Engineer <span>/</span> Full-Stack Developer
        </motion.p>
        <motion.h1 {...enter(0.24)}>
          Building intelligent systems <span>&amp; scalable digital experiences.</span>
        </motion.h1>
        <motion.p className="hero-intro" {...enter(0.31)}>
          I&apos;m Aditya Kumar, a Data Science student at IIT Madras focused on AI/ML,
          data-driven solutions, and full-stack development.
        </motion.p>
        <motion.div className="hero-actions" {...enter(0.38)}>
          <a className="button button-primary" href="#projects">
            View Projects <ArrowDownRight size={18} />
          </a>
          <a className="button button-secondary" href="#contact">
            Let&apos;s Connect <ArrowUpRight size={18} />
          </a>
        </motion.div>
        <motion.div className="hero-links" {...enter(0.44)}>
          <ResumeLink compact />
          <span className="hero-link-divider" />
          <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <Github size={18} />
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            <Linkedin size={18} />
          </a>
        </motion.div>
      </div>

      <motion.div
        className="system-visual"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        aria-label="A visual network connecting AI, data, models, APIs, and web applications"
        role="img"
      >
        <div className="visual-topbar">
          <div><span /> <span /> <span /></div>
          <p>system.architecture</p>
          <span className="visual-live"><i /> live</span>
        </div>
        <div className="system-canvas">
          <div className="coordinate coordinate-x">X 042.81</div>
          <div className="coordinate coordinate-y">Y 117.40</div>
          <svg className="connections" viewBox="0 0 600 520" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M300 80 L162 205 L215 365 L430 380 L470 205 Z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.65 }}
            />
            <motion.path
              d="M300 80 L470 205 M162 205 L430 380 M215 365 L470 205 M300 80 L215 365"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.9 }}
            />
          </svg>
          {nodes.map((node, index) => (
            <motion.div
              key={node.label}
              className={node.className}
              animate={reduceMotion ? undefined : { y: [0, index % 2 ? 5 : -5, 0] }}
              transition={{ duration: 4 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
            >
              <span>{node.type}</span>
              <strong>{node.label}</strong>
            </motion.div>
          ))}
          <div className="system-core">
            <div className="core-ring" />
            <strong>AK</strong>
            <span>ENGINEERING</span>
          </div>
          <motion.i className="data-particle particle-one" animate={reduceMotion ? undefined : { offsetDistance: ["0%", "100%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
          <motion.i className="data-particle particle-two" animate={reduceMotion ? undefined : { offsetDistance: ["0%", "100%"] }} transition={{ duration: 5.2, repeat: Infinity, ease: "linear", delay: 0.8 }} />
        </div>
        <div className="visual-footer">
          <span>AI + DATA + SOFTWARE</span>
          <span>05 CONNECTED SYSTEMS</span>
        </div>
      </motion.div>

      <a className="scroll-cue" href="#about">
        <span>Scroll to explore</span>
        <ArrowDownRight size={16} />
      </a>
    </section>
  );
}
