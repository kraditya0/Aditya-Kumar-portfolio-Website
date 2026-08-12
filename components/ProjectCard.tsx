"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/content";
import { ProjectVisual } from "./ProjectVisuals";

export function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="project-card"
      initial={reduceMotion ? false : { opacity: 0, y: 38, scale: 0.985 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.72, delay: Math.min(index * 0.06, 0.12), ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-preview"><ProjectVisual type={project.id} /></div>
      <div className="project-content">
        <div className="project-meta"><span>{project.number}</span><p>{project.category}</p></div>
        <motion.h3 layoutId={`project-title-${project.id}`}>{project.title}</motion.h3>
        <p className="project-description">{project.description}</p>
        <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-actions">
          <button className="project-detail-button" onClick={onOpen} type="button" data-cursor-label="View">
            View Details <ArrowUpRight size={17} />
          </button>
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer" data-cursor-label="Open"><Github size={17} /> GitHub</a>
          ) : (
            <span className="repo-unavailable"><Github size={16} /> GitHub </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
