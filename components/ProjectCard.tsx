"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/content";
import { ProjectVisual } from "./ProjectVisuals";

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="project-card"
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65 }}
    >
      <div className="project-preview"><ProjectVisual type={project.id} /></div>
      <div className="project-content">
        <div className="project-meta"><span>{project.number}</span><p>{project.category}</p></div>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-actions">
          <button className="project-detail-button" onClick={onOpen} type="button">
            View Details <ArrowUpRight size={17} />
          </button>
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
          ) : (
            <span className="repo-unavailable"><Github size={16} /> GitHub link pending</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
