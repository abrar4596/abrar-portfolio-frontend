"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUp } from "lucide-react";
import { ContactForm } from "./ContactForm";

const SOCIALS = [
  { label: "Email", icon: <Mail size={16} />, href: "mailto:abrar.khan@example.com" },
  { label: "LinkedIn", icon: <Linkedin size={16} />, href: "https://linkedin.com" },
  { label: "GitHub", icon: <Github size={16} />, href: "https://github.com" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-[#050505] text-white pt-24 pb-12 border-t border-neutral-900 overflow-hidden z-20">

      {/* Decorative massive background typography statement */}
      <div className="w-full overflow-hidden select-none pointer-events-none mb-12 md:mb-20">
        <motion.h2
          className="font-syne font-extrabold text-[12vw] sm:text-[10vw] leading-[0.8] text-center uppercase tracking-tighter text-[#141414] whitespace-nowrap"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          There is no limitation.
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-neutral-900">

          {/* Left Column: Multi-step Lead Gen Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Contact Links & Socials */}
          <div className="lg:col-span-5 flex flex-col lg:items-end justify-between gap-8 lg:h-full lg:min-h-[350px]">
            <div className="flex flex-col lg:items-end gap-4">
              <span className="text-[#a3a3a3] uppercase text-xs tracking-[0.2em] font-mono font-medium block">
                Connect
              </span>
              <p className="text-sm text-neutral-500 font-light max-w-sm lg:text-right mb-4">
                Have a standard inquiry or just want to chat? Reach out through any of these platforms.
              </p>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#a3a3a3] hover:text-white transition-colors duration-300 font-mono text-xs uppercase tracking-wider border border-neutral-900 hover:border-neutral-700 px-4 py-2.5 rounded-sm"
                  >
                    {social.icon}
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-mono uppercase text-[#a3a3a3] hover:text-white transition-colors group cursor-pointer lg:mt-auto"
            >
              <span>Back to Top</span>
              <div className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center group-hover:border-neutral-500 transition-colors">
                <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>

        </div>

        {/* Footer Meta Details */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 text-neutral-600 font-mono text-[10px] uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} Mohammad Abrar Khan. All rights reserved.</span>
          <span>Designed &amp; Coded with Next.js &amp; Tailwind</span>
        </div>

      </div>
    </footer>
  );
}
