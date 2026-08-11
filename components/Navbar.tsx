"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = ["Home", "About", "Experience", "Skills", "Projects", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((name) => document.getElementById(name.toLowerCase()))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id[0].toUpperCase() + visible.target.id.slice(1));
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      className={`navbar-shell ${scrolled ? "navbar-scrolled" : ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <nav className="navbar container" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="Aditya Kumar, home">
          <span className="brand-mark">AK</span>
          <span>Aditya Kumar</span>
        </a>

        <div className="desktop-nav">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={active === link ? "nav-link active" : "nav-link"}
            >
              {link}
              {active === link && <motion.span layoutId="nav-dot" className="nav-dot" />}
            </a>
          ))}
        </div>

        <a href="#contact" className="nav-cta desktop-cta">
          Let&apos;s Talk <ArrowUpRight size={16} aria-hidden="true" />
        </a>

        <button
          className="icon-button mobile-menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobile-nav"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {links.map((link, index) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
              >
                <span>0{index + 1}</span> {link}
              </a>
            ))}
            <a href="#contact" className="button button-primary" onClick={() => setOpen(false)}>
              Let&apos;s Talk <ArrowUpRight size={17} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
