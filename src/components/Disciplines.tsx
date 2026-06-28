"use client";

import { motion } from "framer-motion";
import { Code2, Video, Database, Layout, Eye, Cpu } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function Disciplines() {
  const [hovered, setHovered] = useState<null | 1 | 2>(null);

  return (
    <section id="services" className="relative bg-[#050505] text-white py-24 md:py-32 border-b border-neutral-900 z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <ScrollReveal>
          <span className="text-[#a3a3a3] uppercase text-xs tracking-[0.2em] font-medium block mb-3">
            Core Focus Areas
          </span>
          <h2 className="font-syne font-bold text-4xl md:text-6xl tracking-tight uppercase">
            Core Disciplines
          </h2>
        </ScrollReveal>
      </div>

      {/* Dual Perspective Split View Container */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[600px] border-t border-neutral-900">
        
        {/* Discipline 01: Full-Stack Engineering */}
        <motion.div
          className={`relative p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-900 transition-all duration-700 ease-out cursor-pointer overflow-hidden ${
            hovered === 1 ? "bg-neutral-950" : hovered === 2 ? "opacity-30" : "bg-transparent"
          }`}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Background Numeral */}
          <div className="absolute right-6 top-6 md:right-12 md:top-12 select-none pointer-events-none">
            <span className="font-syne font-extrabold text-[12vw] md:text-[8vw] text-neutral-900/40 leading-none">
              01
            </span>
          </div>

          <div className="relative z-10 max-w-lg">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-10">
              <Code2 className="text-white" size={22} />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#a3a3a3] font-mono block mb-2">
              Engineering & Architecture
            </span>
            <h3 className="font-syne font-bold text-3xl md:text-4xl uppercase mb-6 tracking-tight">
              Full-Stack Engineering
            </h3>
            <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed font-light mb-8">
              Designing scalable database schemas, building highly robust APIs, and constructing fluid, interactive frontends. Specialized in production-ready MERN stacks that handle heavy application logic without breaking.
            </p>

            {/* Feature Bullet Points */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-white/70">
              <div className="flex items-center gap-2">
                <Database size={14} className="text-white/40" />
                <span>MongoDB & Schemas</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-white/40" />
                <span>Node.js / Express</span>
              </div>
              <div className="flex items-center gap-2">
                <Layout size={14} className="text-white/40" />
                <span>React / Next.js</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 size={14} className="text-white/40" />
                <span>REST & GraphQL APIs</span>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-0 relative z-10 flex gap-2 flex-wrap">
            {["MongoDB", "Express", "React", "Node.js", "Next.js", "TypeScript", "Tailwind"].map((tech) => (
              <span key={tech} className="bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-mono rounded-full text-white/80">
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom highlight bar */}
          <div className={`absolute bottom-0 left-0 w-full h-1 bg-white transition-transform duration-500 origin-left ${
            hovered === 1 ? "scale-x-100" : "scale-x-0"
          }`} />
        </motion.div>

        {/* Discipline 02: Cinematic Videography */}
        <motion.div
          className={`relative p-8 md:p-16 flex flex-col justify-between transition-all duration-700 ease-out cursor-pointer overflow-hidden ${
            hovered === 2 ? "bg-neutral-950" : hovered === 1 ? "opacity-30" : "bg-transparent"
          }`}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Background Numeral */}
          <div className="absolute right-6 top-6 md:right-12 md:top-12 select-none pointer-events-none">
            <span className="font-syne font-extrabold text-[12vw] md:text-[8vw] text-neutral-900/40 leading-none">
              02
            </span>
          </div>

          <div className="relative z-10 max-w-lg">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-10">
              <Video className="text-white" size={22} />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#a3a3a3] font-mono block mb-2">
              Visual Direction & Production
            </span>
            <h3 className="font-syne font-bold text-3xl md:text-4xl uppercase mb-6 tracking-tight">
              Cinematic Videography
            </h3>
            <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed font-light mb-8">
              Crafting premium visual stories with a focus on lighting, spatial structure, and mood. Managing end-to-end productions, editing, color grading, and delivering 4K cinematic assets that amplify brand presence.
            </p>

            {/* Feature Bullet Points */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-white/70">
              <div className="flex items-center gap-2">
                <Video size={14} className="text-white/40" />
                <span>4K Camera Direction</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-white/40" />
                <span>Color Grading</span>
              </div>
              <div className="flex items-center gap-2">
                <Layout size={14} className="text-white/40" />
                <span>Storyboarding & Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-white/40" />
                <span>DaVinci Resolve Pro</span>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-0 relative z-10 flex gap-2 flex-wrap">
            {["Direction", "4K Capture", "DaVinci Resolve", "Color Correction", "Visual Narrative"].map((skill) => (
              <span key={skill} className="bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-mono rounded-full text-white/80">
                {skill}
              </span>
            ))}
          </div>

          {/* Bottom highlight bar */}
          <div className={`absolute bottom-0 left-0 w-full h-1 bg-white transition-transform duration-500 origin-left ${
            hovered === 2 ? "scale-x-100" : "scale-x-0"
          }`} />
        </motion.div>
        
      </div>
    </section>
  );
}
