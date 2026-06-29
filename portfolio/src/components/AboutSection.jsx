import { Briefcase, Code, User } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const cards = [
  {
    icon: <Code className="h-[18px] w-[18px] text-sky-400" />,
    title: "Software Development",
    desc: "Creating responsive websites and web & mobile apps with modern frameworks.",
  },
  {
    icon: <User className="h-[18px] w-[18px] text-sky-400" />,
    title: "UI/UX Design",
    desc: "Designing intuitive user interfaces and seamless user experiences.",
  },
  {
    icon: <Briefcase className="h-[18px] w-[18px] text-sky-400" />,
    title: "Project Management",
    desc: "Leading projects from conception to completion with agile methodologies.",
  },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-24 px-4 relative overflow-hidden bg-[#080a0f]"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 mb-3"
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="w-8 h-px bg-gradient-to-r from-sky-400 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Who I Am
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-extrabold tracking-tight leading-tight mb-14"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
          }}
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          About{" "}
          <span
            className="bg-gradient-to-br from-sky-400 to-orange-400 bg-clip-text text-transparent"
          >
            Me
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            className="space-y-5"
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="inline-block px-3.5 py-1 rounded-full border border-sky-400/30 text-sky-400 text-[11px] tracking-wide">
              FullStack · AI Enthusiast · BCA '26
            </span>

            <h3
              className="text-[1.3rem] font-bold leading-snug text-[#e8e4dc]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Passionate FullStack Developer &amp; Aspiring AI Engineer
            </h3>

            <p className="text-sm font-light leading-[1.85] text-white/40">
              Pallab is a focused and thoughtful BCA student who balances
              ambition with sincerity. At just 19, he's deeply invested in
              learning core CS subjects like Java, DSA, operating systems, and
              backend development — always understanding concepts deeply, not
              just for exams.
            </p>
            <p className="text-sm font-light leading-[1.85] text-white/40">
              Disciplined about his goals, curious, hardworking, and emotionally
              honest — Pallab keeps moving forward, learning, improving, and
              figuring things out step by step.
            </p>

            <div className="flex flex-wrap gap-3 pt-3">
              <motion.a
                href="#contact"
                className="px-7 py-3 rounded-[4px] text-[#080a0f] font-bold text-xs uppercase tracking-wider"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: "linear-gradient(135deg, #63b3ed, #ed8936)",
                  boxShadow: "0 0 24px rgba(99,179,237,0.15)",
                }}
                whileHover={{ y: -2, boxShadow: "0 0 40px rgba(99,179,237,0.35)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Get in Touch
              </motion.a>

              <motion.a
                href="/projects/resume.pdf"
                target="_blank"
                className="px-7 py-3 rounded-[4px] border border-sky-400/35 text-sky-400 font-semibold text-xs uppercase tracking-wider"
                style={{ fontFamily: "'Syne', sans-serif" }}
                whileHover={{ backgroundColor: "rgba(99,179,237,0.08)", borderColor: "rgba(99,179,237,0.6)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>

          {/* Right — Cards */}
          <div className="flex flex-col gap-4">
            {cards.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.025] relative overflow-hidden group"
                custom={0.5 + i * 0.15}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ x: 4, borderColor: "rgba(99,179,237,0.2)", backgroundColor: "rgba(255,255,255,0.04)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Top shimmer line */}
                <motion.span
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-sky-400 via-orange-400 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="flex-shrink-0 w-11 h-11 rounded-[10px] border border-sky-400/15 bg-sky-400/[0.08] flex items-center justify-center">
                  {icon}
                </div>

                <div>
                  <h4
                    className="text-[0.95rem] font-bold text-[#e8e4dc] mb-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {title}
                  </h4>
                  <p className="text-[0.82rem] font-light leading-relaxed text-white/40">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;