import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);

      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (scrollY / total) * 100 : 0);

      const sections = navItems.map((i) => i.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed w-full z-40 transition-all duration-500",
          isScrolled
            ? "py-3 bg-[#080a0f]/80 backdrop-blur-[20px] border-b border-white/[0.04]"
            : "py-5"
        )}
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto max-w-5xl px-6 flex items-center justify-center">

          {/* Desktop nav — centered pill cluster */}
          <div
            className={cn(
              "hidden md:flex items-center gap-0.5 rounded-full border transition-all duration-500 px-1.5 py-1.5",
              isScrolled
                ? "border-white/[0.07] bg-white/[0.03] backdrop-blur-sm"
                : "border-transparent bg-transparent"
            )}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-5 py-2 rounded-full text-[0.78rem] font-bold tracking-[0.06em] uppercase transition-colors duration-200",
                    isActive
                      ? "text-sky-400"
                      : "text-white/35 hover:text-white/70"
                  )}
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  whileTap={{ scale: 0.94 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-sky-400/[0.08] border border-sky-400/20"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </motion.a>
              );
            })}
          </div>

          {/* Mobile hamburger — right aligned */}
          <div className="flex items-center justify-end w-full md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen((p) => !p)}
              className="w-9 h-9 rounded-[8px] border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/50"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={17} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={17} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-orange-400"
          style={{ width: `${scrollProgress}%` }}
          transition={{ ease: "linear" }}
        />
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-39 bg-[#080a0f]/97 backdrop-blur-[20px] flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* Decorative ring */}
            <motion.div
              className="absolute w-64 h-64 rounded-full border border-sky-400/[0.05]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute w-96 h-96 rounded-full border border-white/[0.03]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            />

            <nav className="relative flex flex-col items-center gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[2rem] font-extrabold text-white/20 hover:text-white/90 transition-colors duration-200 py-1.5 tracking-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.06 + i * 0.07,
                  }}
                  whileHover={{ x: 8, color: "rgba(56,189,248,0.9)" }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            <motion.p
              className="absolute bottom-10 text-[0.65rem] uppercase tracking-[0.2em] text-white/15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Pallab Duarah · Portfolio
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;