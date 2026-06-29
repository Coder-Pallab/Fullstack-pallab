import { ArrowUp } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer
      className="py-7 px-8 bg-[#080a0f] border-t border-white/[0.06] flex flex-wrap justify-between items-center gap-4"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <p className="text-[0.75rem] font-light tracking-wide text-white/30">
        &copy; {new Date().getFullYear()} Pallab Duarah
        <span className="mx-2 text-white/[0.12]">·</span>
        All rights reserved.
      </p>

      <a
        href="#hero"
        aria-label="Back to top"
        className="w-9 h-9 rounded-full border border-sky-400/25 bg-sky-400/[0.06] flex items-center justify-center text-sky-400 transition-colors duration-200 hover:bg-sky-400/[0.14] hover:border-sky-400/40"
      >
        <ArrowUp size={15} strokeWidth={2} />
      </a>
    </footer>
  )
}

export default Footer