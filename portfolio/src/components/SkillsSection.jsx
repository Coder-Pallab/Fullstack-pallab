import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "../lib/utils";

const levelLabel = (n) =>
  n >= 90 ? "Expert" : n >= 75 ? "Advanced" : n >= 55 ? "Intermediate" : "Learning";

// Animated progress bar — triggers fill only when in view
const SkillBar = ({ level }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref}>
      <div className="w-full h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="h-full rounded-full origin-left"
          style={{
            background: "linear-gradient(to right, #63b3ed, #ed8936)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? level / 100 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span
          className="text-[0.68rem] font-bold uppercase tracking-widest text-white/30"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {levelLabel(level)}
        </span>
        <span className="text-[0.72rem] text-white/35">{level}%</span>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, index }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
    whileHover={{ y: -3, borderColor: "rgba(99,179,237,0.22)", backgroundColor: "rgba(255,255,255,0.04)" }}
    className="relative p-5 rounded-xl border border-white/[0.06] bg-white/[0.025] overflow-hidden group"
  >
    {/* Top shimmer on hover */}
    <motion.span
      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-sky-400 via-orange-400 to-transparent"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />

    <div className="flex items-center gap-3 mb-4">
      {skill.icon ? (
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-9 h-9 object-contain rounded-lg"
          onError={(e) => (e.target.style.display = "none")}
        />
      ) : (
        <div
          className="w-9 h-9 rounded-[8px] bg-sky-400/[0.08] border border-sky-400/15 flex items-center justify-center text-sky-400 text-sm font-extrabold shrink-0"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {skill.name.charAt(0)}
        </div>
      )}
      <div>
        <h4
          className="text-[0.9rem] font-bold text-[#e8e4dc] leading-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {skill.name}
        </h4>
        <span className="text-[0.7rem] uppercase tracking-wide text-white/30">
          {skill.category}
        </span>
      </div>
    </div>

    <SkillBar level={skill.level} />
  </motion.div>
);

// Loading skeleton
const SkeletonCard = () => (
  <div className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.02] animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-[8px] bg-white/[0.06]" />
      <div className="space-y-1.5">
        <div className="h-3 w-24 bg-white/[0.06] rounded" />
        <div className="h-2 w-16 bg-white/[0.04] rounded" />
      </div>
    </div>
    <div className="h-[3px] bg-white/[0.06] rounded-full" />
  </div>
);

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/skills`);
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const categories = ["All", ...new Set(skills.map((s) => s.category))];
  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 relative bg-[#080a0f]">
      <div className="container mx-auto max-w-5xl">

        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-sky-400" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            What I Work With
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-sky-400" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-extrabold tracking-tight text-center mb-10"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          My{" "}
          <span className="bg-gradient-to-br from-sky-400 to-orange-400 bg-clip-text text-transparent">
            Skills
          </span>
        </motion.h2>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2.5 mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-[4px] text-xs font-bold uppercase tracking-widest border transition-colors duration-200",
                activeCategory === cat
                  ? "border-transparent text-[#080a0f]"
                  : "border-white/[0.08] bg-white/[0.03] text-white/40 hover:border-sky-400/30 hover:text-white/70 hover:bg-sky-400/[0.06]"
              )}
              style={
                activeCategory === cat
                  ? {
                      fontFamily: "'Syne', sans-serif",
                      background: "linear-gradient(135deg, #63b3ed, #ed8936)",
                    }
                  : { fontFamily: "'Syne', sans-serif" }
              }
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Skills grid */}
        {!loading && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;