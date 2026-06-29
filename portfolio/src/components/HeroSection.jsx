import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-[#080a0f]"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Ambient orbs */}
      <motion.div
        className="absolute -top-24 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,179,237,0.12), transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 -right-16 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(237,137,54,0.1), transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Main content */}
      <div className="container max-w-4xl mx-auto text-center z-10">
        {/* Eyebrow badge */}
        <motion.div
          className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-4 py-1.5 rounded-full mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-sky-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-light">
            Available for work
          </span>
        </motion.div>

        {/* Heading */}
        <h1
          className="font-extrabold tracking-tight leading-none mb-7"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {[
            {
              text: "Hii, I am",
              className:
                "block text-white/30 font-normal text-2xl md:text-3xl tracking-normal mb-2",
              delay: 0.3,
            },
            {
              text: "Pallab",
              className:
                "block text-[clamp(3rem,9vw,6.5rem)] text-[#e8e4dc]",
              delay: 0.5,
            },
            {
              text: "Duarah",
              className:
                "block text-[clamp(3rem,9vw,6.5rem)] bg-gradient-to-br from-sky-400 to-orange-400 bg-clip-text text-transparent",
              delay: 0.7,
            },
          ].map(({ text, className, delay }) => (
            <motion.span
              key={text}
              className={className}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay,
              }}
            >
              {text}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-white/40 font-light leading-relaxed max-w-[560px] mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
        >
          I love building things on the web and exploring how ideas turn into
          real applications. Always learning, always experimenting, and
          constantly leveling up my skills.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1.1 }}
        >
          <motion.a
            href="#projects"
            className="inline-block px-9 py-3.5 rounded-[4px] text-[#080a0f] font-bold text-sm uppercase tracking-wider"
            style={{
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg, #63b3ed, #ed8936)",
              boxShadow: "0 0 30px rgba(99,179,237,0.2)",
            }}
            whileHover={{
              y: -2,
              boxShadow: "0 0 50px rgba(99,179,237,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            View My Works
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 origin-top"
          style={{
            background:
              "linear-gradient(to bottom, rgba(99,179,237,0.6), transparent)",
          }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.6,
          }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;