import { ArrowRight, ExternalLink, Github } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

// Skeleton card
const SkeletonCard = () => (
  <div className="rounded-[14px] border border-white/[0.05] bg-white/[0.02] overflow-hidden animate-pulse">
    <div className="h-[190px] bg-white/[0.04]" />
    <div className="p-5 space-y-3">
      <div className="flex gap-2">
        <div className="h-5 w-16 rounded-full bg-white/[0.06]" />
        <div className="h-5 w-12 rounded-full bg-white/[0.06]" />
      </div>
      <div className="h-4 w-3/4 bg-white/[0.06] rounded" />
      <div className="h-3 w-full bg-white/[0.04] rounded" />
      <div className="h-3 w-2/3 bg-white/[0.04] rounded" />
    </div>
  </div>
);

const ProjectCard = ({ project, index }) => (
  <motion.div
    key={project.title}
    className="group relative rounded-[14px] border border-white/[0.06] bg-white/[0.025] overflow-hidden"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
    whileHover={{ y: -4, borderColor: "rgba(99,179,237,0.22)", boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}
  >
    {/* Shimmer border top */}
    <motion.span
      className="absolute top-0 left-0 right-0 h-px z-10 bg-gradient-to-r from-sky-400 via-orange-400 to-transparent"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />

    {/* Image */}
    <div className="h-[190px] overflow-hidden relative">
      <motion.img
        src={project.image || undefined}
        alt={project.title}
        className="w-full h-full object-cover brightness-75"
        whileHover={{ scale: 1.07, filter: "brightness(0.95)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-transparent pointer-events-none" />
      {/* Index badge */}
      <span
        className="absolute top-3.5 right-3.5 z-10 text-[0.68rem] font-extrabold tracking-wide text-white/50 border border-white/10 bg-[#080a0f]/70 backdrop-blur-md px-2.5 py-0.5 rounded-full"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        0{index + 1}
      </span>
    </div>

    {/* Body */}
    <div className="p-5">
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[0.67rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-sky-400/20 text-sky-400 bg-sky-400/[0.06]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {tag}
          </span>
        ))}
      </div>

      <h3
        className="text-[1.05rem] font-extrabold text-[#e8e4dc] mb-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {project.title}
      </h3>
      <p className="text-[0.82rem] font-light leading-relaxed text-white/38 mb-5">
        {project.description}
      </p>

      {/* Links */}
      <div className="flex items-center gap-2.5">
        <motion.a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-[6px] text-[0.72rem] font-bold uppercase tracking-wider text-[#080a0f]"
          style={{
            fontFamily: "'Syne', sans-serif",
            background: "linear-gradient(135deg, #63b3ed, #ed8936)",
          }}
          whileHover={{ boxShadow: "0 0 24px rgba(99,179,237,0.3)" }}
          whileTap={{ scale: 0.96 }}
        >
          <ExternalLink size={12} />
          Live
        </motion.a>

        <motion.a
          href={project.code}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-[6px] border border-white/[0.1] bg-white/[0.03] text-[0.72rem] font-bold uppercase tracking-wider text-white/45 hover:text-white/80 hover:border-sky-400/30"
          style={{ fontFamily: "'Syne', sans-serif" }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
        >
          <Github size={12} />
          Code
        </motion.a>
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-4 relative bg-[#080a0f]">
      <div className="container mx-auto max-w-5xl">

        {/* Section label */}
        <motion.div className="flex items-center justify-center gap-3 mb-3" {...fadeUp(0.1)}>
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-sky-400" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">My Work</span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-sky-400" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-extrabold tracking-tight text-center mb-4"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          {...fadeUp(0.2)}
        >
          Featured{" "}
          <span className="bg-gradient-to-br from-sky-400 to-orange-400 bg-clip-text text-transparent">
            Projects
          </span>
        </motion.h2>

        <motion.p
          className="text-center text-white/38 font-light text-sm leading-relaxed max-w-lg mx-auto mb-14"
          {...fadeUp(0.3)}
        >
          Here are some of my recent projects, crafted with attention to detail,
          performance, and user experience.
        </motion.p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence>
              {projects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* GitHub CTA */}
        <motion.div className="text-center mt-14" {...fadeUp(0.5)}>
          <motion.a
            href="https://github.com/Coder-Pallab"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] text-[#080a0f] font-extrabold text-sm uppercase tracking-wider"
            style={{
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg, #63b3ed, #ed8936)",
              boxShadow: "0 0 28px rgba(99,179,237,0.18)",
            }}
            whileHover={{ y: -2, boxShadow: "0 0 44px rgba(99,179,237,0.38)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Checkout My GitHub <ArrowRight size={15} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;