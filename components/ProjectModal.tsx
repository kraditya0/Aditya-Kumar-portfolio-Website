"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Github, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/content";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeButton.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-backdrop"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="modal-topline">
              <span>{project.number} / PROJECT DETAIL</span>
              <button ref={closeButton} className="icon-button" onClick={onClose} aria-label="Close project details">
                <X size={19} />
              </button>
            </div>
            <div className="modal-heading">
              <p>{project.category}</p>
              <motion.h2 layoutId={`project-title-${project.id}`} id="project-modal-title">{project.title}</motion.h2>
            </div>
            <div className="modal-grid">
              <motion.div
                className="modal-main"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.4 }}
              >
                <DetailBlock title="Overview"><p>{project.description}</p></DetailBlock>
                <DetailBlock title="Problem"><p>{project.problem}</p></DetailBlock>
                <DetailBlock title="Solution"><p>{project.solution}</p></DetailBlock>
                <DetailBlock title="Technical Implementation"><p>{project.implementation}</p></DetailBlock>
                <DetailBlock title="Results"><p className="result-copy">{project.result}</p></DetailBlock>
              </motion.div>
              <motion.aside
                className="modal-aside"
                initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.18, duration: 0.4 }}
              >
                <h3>Key Features</h3>
                <ul>{project.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
                <h3>Technology Stack</h3>
                <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                {project.github ? (
                  <a className="button button-secondary modal-github" href={project.github} target="_blank" rel="noreferrer">
                    <Github size={17} /> View on GitHub <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <p className="repository-note"><Github size={16} /> Repository link not provided</p>
                )}
              </motion.aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="detail-block"><h3>{title}</h3>{children}</section>;
}
