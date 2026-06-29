import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

// Individual testimonial card
const TestimonialCard = ({ t, index }) => (
  <motion.div
    className="relative p-6 rounded-[14px] border border-white/[0.06] bg-white/[0.025] overflow-hidden"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    whileHover={{ y: -3, borderColor: "rgba(99,179,237,0.22)", backgroundColor: "rgba(255,255,255,0.04)" }}
  >
    {/* shimmer top */}
    <motion.span
      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-sky-400 via-orange-400 to-transparent"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />

    {/* Big quote mark */}
    <div
      className="text-[3.5rem] leading-none font-extrabold text-sky-400/[0.14] mb-2 select-none"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      "
    </div>

    {/* Stars */}
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-orange-400 text-[13px]">★</span>
      ))}
    </div>

    <p className="text-[0.87rem] font-light italic leading-[1.85] text-white/45 mb-6">
      {t.comment}
    </p>

    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full bg-sky-400/[0.08] border border-sky-400/20 flex items-center justify-center text-sky-400 font-extrabold text-sm shrink-0"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {t.name.charAt(0)}
      </div>
      <div>
        <h4
          className="text-[0.88rem] font-bold text-[#e8e4dc]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {t.name}
        </h4>
        <span className="text-[0.7rem] uppercase tracking-wider text-white/28">
          {t.role}
        </span>
      </div>
    </div>
  </motion.div>
);

// Skeleton card
const SkeletonCard = () => (
  <div className="p-6 rounded-[14px] border border-white/[0.05] bg-white/[0.02] animate-pulse space-y-4">
    <div className="h-8 w-8 bg-white/[0.06] rounded" />
    <div className="space-y-2">
      <div className="h-3 bg-white/[0.06] rounded w-full" />
      <div className="h-3 bg-white/[0.04] rounded w-5/6" />
      <div className="h-3 bg-white/[0.04] rounded w-3/4" />
    </div>
    <div className="flex items-center gap-3 pt-2">
      <div className="w-10 h-10 rounded-full bg-white/[0.06]" />
      <div className="space-y-1.5">
        <div className="h-3 w-24 bg-white/[0.06] rounded" />
        <div className="h-2 w-16 bg-white/[0.04] rounded" />
      </div>
    </div>
  </div>
);

// Styled input/textarea
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label
      className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-white/35"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {label}
    </label>
    {children}
  </div>
);

const inputClass =
  "bg-white/[0.03] border border-white/[0.08] rounded-[8px] px-3.5 py-3 text-[#e8e4dc] text-sm font-light placeholder:text-white/20 outline-none focus:border-sky-400/40 focus:bg-sky-400/[0.04] transition-colors duration-200 w-full";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", role: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/testimonials`);
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Testimonial submitted! It'll appear after approval.");
        setFormData({ name: "", role: "", comment: "" });
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-24 px-4 relative bg-[#080a0f]">
      <div className="container mx-auto max-w-5xl">

        {/* Label */}
        <motion.div className="flex items-center justify-center gap-3 mb-3" {...fadeUp(0.1)}>
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-sky-400" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Kind Words</span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-sky-400" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-extrabold tracking-tight text-center mb-4"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          {...fadeUp(0.2)}
        >
          What People{" "}
          <span className="bg-gradient-to-br from-sky-400 to-orange-400 bg-clip-text text-transparent">
            Say
          </span>
        </motion.h2>

        <motion.p
          className="text-center text-white/38 font-light text-sm leading-relaxed max-w-md mx-auto mb-14"
          {...fadeUp(0.3)}
        >
          Read some testimonials from clients and colleagues, or leave one yourself!
        </motion.p>

        {/* Testimonials grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
            <AnimatePresence>
              {testimonials.map((t, i) => (
                <TestimonialCard key={t._id ?? i} t={t} index={i} />
              ))}
            </AnimatePresence>
          </div>
        ) : null}

        {/* Form */}
        <motion.div
          className="relative max-w-[600px] mx-auto rounded-[16px] border border-white/[0.07] bg-white/[0.025] p-8 overflow-hidden"
          {...fadeUp(0.5)}
        >
          {/* Gradient top line */}
          <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-sky-400 via-orange-400 to-transparent" />

          <h3
            className="text-[1.1rem] font-extrabold text-[#e8e4dc] mb-1"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Leave a Testimonial
          </h3>
          <p className="text-[0.8rem] font-light text-white/35 mb-7">
            Your words mean a lot — share your experience working with me.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Name">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className={inputClass}
                />
              </Field>
              <Field label="Role / Company">
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Client, Colleague"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Your Comment">
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Your experience working with me..."
                className={inputClass}
                style={{ resize: "none" }}
              />
            </Field>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-[8px] font-extrabold text-[0.8rem] uppercase tracking-widest text-[#080a0f] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(135deg, #63b3ed, #ed8936)",
                boxShadow: "0 0 28px rgba(99,179,237,0.18)",
              }}
              whileHover={!isSubmitting ? { y: -2, boxShadow: "0 0 44px rgba(99,179,237,0.38)" } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Submitting…
                </span>
              ) : (
                "Submit Testimonial"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;