"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BrainCircuit,
  ChevronDown,
  Code2,
  Database,
  Github,
  GraduationCap,
  Languages,
  Linkedin,
  MapPin,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { contact, experience, projects, skillGroups, type Project } from "@/data/content";
import { BackgroundEffects } from "./BackgroundEffects";
import { Contact } from "./Contact";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";

const buildCards = [
  {
    icon: BrainCircuit,
    index: "01",
    title: "Intelligent Systems",
    copy: "Machine learning and NLP solutions that turn data into useful predictions and classifications.",
  },
  {
    icon: Code2,
    index: "02",
    title: "Full-Stack Applications",
    copy: "Modern web applications with robust backends, APIs, databases, authentication, and scalable architecture.",
  },
  {
    icon: Database,
    index: "03",
    title: "Data-Driven Products",
    copy: "Applications and analysis workflows that transform raw data into meaningful insights.",
  },
];

const workflow = ["Problem", "Data", "Analysis", "Model / Backend", "Application", "Deployment"];

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [notice, setNotice] = useState("");

  const closeProject = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    const showNotice = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      setNotice(message);
      window.setTimeout(() => setNotice(""), 5000);
    };
    window.addEventListener("portfolio-notice", showNotice);
    return () => window.removeEventListener("portfolio-notice", showNotice);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <BackgroundEffects />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <WhatIBuild />
        <Skills />
        <Projects onSelect={setSelectedProject} />
        <Workflow />
        <Education />
        <Social />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
      <ProjectModal project={selectedProject} onClose={closeProject} />
      <AnimatePresence>
        {notice && (
          <motion.div className="notice" role="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
            <span>{notice}</span>
            <button className="icon-button" onClick={() => setNotice("")} aria-label="Dismiss notice"><X size={16} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SectionHeading({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <Reveal className="section-heading">
      <p className="section-kicker">{kicker}</p>
      <h2>{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <SectionHeading kicker="01 / About" title="Engineering across data, AI and the web." />
        <div className="about-grid">
          <Reveal className="about-copy">
            <p>
              I&apos;m pursuing a <strong>BS in Data Science and Applications at IIT Madras</strong>,
              with hands-on experience building machine learning models, web applications, APIs,
              and data-driven solutions.
            </p>
            <p>
              My work spans machine learning, NLP, full-stack development, data analysis,
              REST APIs, database systems, and AI-powered applications.
            </p>
            <div className="location-line"><MapPin size={17} /> Greater Noida, Uttar Pradesh</div>
          </Reveal>
          <Reveal className="focus-panel" delay={0.12}>
            <div className="focus-head"><span>Currently focused on</span><i /></div>
            {["AI / ML", "Full-Stack Engineering", "Data Science", "Real-world Products"].map((item, index) => (
              <div className="focus-row" key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowUpRight size={16} /></div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);
  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <SectionHeading kicker="02 / Experience" title="Building, analyzing, and shipping." lead="Professional experience across product engineering and data-driven research." />
        <div className="timeline">
          {experience.map((item, index) => {
            const open = expanded === index;
            return (
              <Reveal className={`timeline-entry ${open ? "expanded" : ""}`} key={item.company} delay={index * 0.08}>
                <div className="timeline-date"><span>{item.period}</span><small>{item.mode}</small></div>
                <div className="timeline-track"><i /></div>
                <div className="timeline-content">
                  <button className="timeline-trigger" type="button" onClick={() => setExpanded(open ? null : index)} aria-expanded={open}>
                    <div><p>{item.company}</p><h3>{item.role}</h3></div>
                    <span className="expand-icon"><ChevronDown size={19} /></span>
                  </button>
                  <p className="timeline-summary">{item.description}</p>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div className="timeline-details" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        <ul>{item.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
                        <div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhatIBuild() {
  return (
    <section className="section build-section">
      <div className="container">
        <SectionHeading kicker="Capabilities" title="What I build." />
        <div className="build-grid">
          {buildCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal className="build-card" key={card.title} delay={index * 0.08}>
                <div className="build-card-head"><Icon size={22} /><span>{card.index}</span></div>
                <h3>{card.title}</h3><p>{card.copy}</p><i className="build-accent" />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <SectionHeading kicker="03 / Skills" title="A practical engineering toolkit." lead="Technologies used across machine learning, data work, product engineering, and deployment." />
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <Reveal className={`skill-group skill-group-${index + 1}`} key={group.title} delay={(index % 3) * 0.06}>
              <div className="skill-title"><span>{group.index}</span><h3>{group.title}</h3></div>
              <div className="skill-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ onSelect }: { onSelect: (project: Project) => void }) {
  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <SectionHeading kicker="04 / Selected Work" title="Selected Projects" lead="Projects spanning machine learning, full-stack engineering, and data-driven applications." />
        <div className="projects-list">{projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={() => onSelect(project)} />)}</div>
      </div>
    </section>
  );
}

function Workflow() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="section workflow-section">
      <div className="container">
        <SectionHeading kicker="Engineering flow" title="From ambiguity to deployment." lead="A connected workflow across data science and full-stack delivery." />
        <Reveal className="workflow">
          <motion.div className="workflow-progress" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 1.4 }} />
          {workflow.map((step, index) => (
            <div className="workflow-step" key={step}><span>0{index + 1}</span><i /><strong>{step}</strong>{index < workflow.length - 1 && <ArrowRight size={16} />}</div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Education() {
  const details = [
    { icon: Award, label: "Certification", value: "SQL Basic Certification - HackerRank" },
    { icon: Users, label: "Volunteer Experience", value: "Electronics System Volunteer - IIT Madras", note: "November 2023 - December 2023" },
    { icon: Languages, label: "Languages", value: "English - Fluent  /  Hindi - Native" },
    { icon: Trophy, label: "Interests", value: "Competitive Badminton / Open Source Contribution / Web Development" },
  ];
  return (
    <section className="section education-section">
      <div className="container">
        <SectionHeading kicker="05 / Education" title="Foundation and continued learning." />
        <Reveal className="education-hero">
          <div className="education-mark"><GraduationCap size={30} /></div>
          <div className="education-copy"><p>Indian Institute of Technology Madras</p><h3>Bachelor of Science in Data Science and Applications</h3><div><span>Expected 2027</span><span><MapPin size={14} /> Chennai, India</span></div></div>
          <span className="education-code">IITM / BS</span>
        </Reveal>
        <div className="detail-grid">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            return <Reveal className="detail-card" key={detail.label} delay={index * 0.05}><Icon size={19} /><span>{detail.label}</span><strong>{detail.value}</strong>{detail.note && <small>{detail.note}</small>}</Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}

function Social() {
  return (
    <section className="social-section">
      <div className="container social-inner">
        <Reveal><p className="section-kicker">Connect / Collaborate</p><h2>Explore my work</h2></Reveal>
        <Reveal className="social-links" delay={0.08}>
          <a href={contact.github} target="_blank" rel="noreferrer"><Github size={21} /><span><small>GitHub</small>github.com/kraditya0</span><ArrowUpRight size={18} /></a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer"><Linkedin size={21} /><span><small>LinkedIn</small>linkedin.com/in/aditya-kumar-1a43b91b1</span><ArrowUpRight size={18} /></a>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <div className="cta-grid" aria-hidden="true" />
      <div className="container final-cta-inner">
        <p>AI <span>/</span> Data <span>/</span> Software</p>
        <h2>Ideas are better<br />when they&apos;re built.</h2>
        <a className="button button-dark" href="#contact">Get in Touch <ArrowUpRight size={18} /></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div><a className="footer-brand" href="#home">Aditya Kumar</a><p>AI/ML Engineer <span>/</span> Full-Stack Developer</p></div>
        <div className="footer-links"><a href={contact.github} target="_blank" rel="noreferrer">GitHub</a><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${contact.email}`}>Email</a></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Aditya Kumar. All rights reserved.</span><a href="#home">Back to top ↑</a></div>
    </footer>
  );
}
