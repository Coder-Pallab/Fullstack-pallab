import {
  Building, Facebook, Instagram, Linkedin,
  Mail, MapPin, PhoneCall, Send, Twitter,
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const inputClass =
  "w-full bg-white/[0.03] border border-white/[0.08] rounded-[8px] px-3.5 py-3 text-[#e8e4dc] text-sm font-light placeholder:text-white/[0.18] outline-none focus:border-sky-400/40 focus:bg-sky-400/[0.04] transition-colors duration-200";

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label
      className="text-[0.7rem] font-bold uppercase tracking-[0.09em] text-white/35"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {label}
    </label>
    {children}
  </div>
);

const InfoItem = ({ icon: Icon, label, value, href }) => (
  <div className="flex items-start gap-3.5">
    <div className="w-10 h-10 flex-shrink-0 rounded-[10px] bg-sky-400/[0.08] border border-sky-400/15 flex items-center justify-center">
      <Icon className="h-4 w-4 text-sky-400" />
    </div>
    <div>
      <p
        className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-white/30 mb-0.5"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="text-[0.85rem] font-light text-white/55 hover:text-sky-400 transition-colors duration-200"
        >
          {value}
        </a>
      ) : (
        <span className="text-[0.85rem] font-light text-white/55">{value}</span>
      )}
    </div>
  </div>
);

const socials = [
  { href: "https://www.linkedin.com/in/pallab-duarah2006/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/__about_.pallab/", icon: Instagram, label: "Instagram" },
  { href: "https://www.facebook.com/PR4DYUT", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
];

const ContactSection = () => {
  const [result, setResult] = useState("");
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setResult("Sending…");
    const formData = new FormData(e.target);
    formData.append("access_key", "ba52bf24-ff53-422e-b614-da3d01f9a879");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Message sent!");
        e.target.reset();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setResult("");
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-[#080a0f]">
      <div className="container mx-auto max-w-5xl">

        {/* Label */}
        <motion.div className="flex items-center gap-3 mb-3" {...fadeUp(0.1)}>
          <span className="w-8 h-px bg-gradient-to-r from-sky-400 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Let's Talk
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-extrabold tracking-tight mb-4"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          {...fadeUp(0.2)}
        >
          Get In{" "}
          <span className="bg-gradient-to-br from-sky-400 to-orange-400 bg-clip-text text-transparent">
            Touch
          </span>
        </motion.h2>

        <motion.p
          className="text-white/38 font-light text-sm leading-relaxed max-w-md mb-14"
          {...fadeUp(0.3)}
        >
          Have a project in mind or want to collaborate? Feel free to reach out —
          I'm always open to discussing new opportunities.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Left — info */}
          <motion.div className="space-y-5" {...fadeUp(0.4)}>
            <h3
              className="text-[1.05rem] font-extrabold text-[#e8e4dc] mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Contact Information
            </h3>

            <InfoItem icon={Mail} label="Email" value="duarahpallab0@gmail.com" href="mailto:duarahpallab0@gmail.com" />
            <InfoItem icon={PhoneCall} label="Phone" value="+91 6001478031" href="tel:+916001478031" />
            <InfoItem icon={MapPin} label="Location" value="Sibsagar, Assam" />
            <InfoItem icon={Building} label="College" value="Sibsagar Commerce College, 785640" />

            {/* Socials */}
            <div className="pt-6">
              <p
                className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white/28 mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Connect With Me
              </p>
              <div className="flex gap-2.5">
                {socials.map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-[8px] border border-white/[0.08] bg-white/[0.025] flex items-center justify-center text-white/40 hover:text-sky-400"
                    whileHover={{ borderColor: "rgba(99,179,237,0.35)", backgroundColor: "rgba(99,179,237,0.08)", y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="relative rounded-[16px] border border-white/[0.07] bg-white/[0.025] p-8 overflow-hidden"
            {...fadeUp(0.5)}
          >
            {/* Gradient top line */}
            <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-sky-400 via-orange-400 to-transparent" />

            <h3
              className="text-[1.05rem] font-extrabold text-[#e8e4dc] mb-7"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Send a Message
            </h3>

            <form onSubmit={onSubmit} className="space-y-4">
              <Field label="Your Name">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Eg. Pallab..."
                  className={inputClass}
                />
              </Field>

              <Field label="Your Email">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Eg. pallab@gmail.com..."
                  className={inputClass}
                />
              </Field>

              <Field label="Your Message">
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Eg. Hello, How are you..."
                  className={inputClass}
                  style={{ resize: "none" }}
                />
              </Field>

              <motion.button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[8px] font-extrabold text-[0.8rem] uppercase tracking-widest text-[#080a0f] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: "linear-gradient(135deg, #63b3ed, #ed8936)",
                  boxShadow: "0 0 28px rgba(99,179,237,0.18)",
                }}
                whileHover={!isSending ? { y: -2, boxShadow: "0 0 44px rgba(99,179,237,0.38)" } : {}}
                whileTap={!isSending ? { scale: 0.98 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message <Send size={14} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;