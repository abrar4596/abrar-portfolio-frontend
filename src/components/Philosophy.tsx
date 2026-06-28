"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "Deep Discovery & Business Logic",
    desc: "Before a single line of code is written, we map out data models and workflows. I define system boundaries, discover bottleneck risks, and establish logical architecture boundaries that prevent technical debt.",
  },
  {
    num: "02",
    title: "Structural Code & Schema Design",
    desc: "This is where performance meets clean code. We implement optimized MongoDB schemas, robust API routes with Express/Node, type safety with TypeScript, and clean, decoupled state architecture on the frontend.",
  },
  {
    num: "03",
    title: "Cinematic Polish & Delivery",
    desc: "We finish by marrying software scalability with visual grandeur. This means integrating fluid animations, high-contrast imagery, and optimized assets to create a fast, premium experience that captivates and converts.",
  },
];

export function Philosophy() {
  return (
    <section id="architecture" className="relative bg-[#050505] text-white py-24 md:py-36 border-b border-neutral-900 z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Column: Sticky Title */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
          <span className="text-[#a3a3a3] uppercase text-xs tracking-[0.2em] font-mono font-medium block mb-4">
            Architecture Philosophy
          </span>
          <h2 className="font-syne font-extrabold text-3xl md:text-5xl uppercase leading-[1.15] tracking-tighter select-none">
            Every application starts with one question: <span className="text-[#a3a3a3] block mt-2">Does the architecture scale?</span>
          </h2>
          <motion.div 
            className="mt-8 w-16 h-[2px] bg-white origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        {/* Right Column: Scrollable Steps */}
        <div className="lg:col-span-7 flex flex-col gap-16 md:gap-24">
          {STEPS.map((step, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.15}>
              <div className="group relative border-l border-neutral-800 pl-6 md:pl-12 py-2 hover:border-white transition-colors duration-500">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-3">
                  Phase {step.num}
                </span>
                <h3 className="font-syne font-bold text-2xl md:text-3xl uppercase tracking-tight mb-4 text-[#d4d4d4] group-hover:text-white transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-[#a3a3a3] font-light leading-relaxed text-sm md:text-base">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
