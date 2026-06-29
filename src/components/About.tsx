"use client";

import { motion } from "framer-motion";
import { ShieldCheck, GraduationCap, Eye, FileSpreadsheet } from "lucide-react";
import { ParallaxVideo } from "./ParallaxVideo";
import { ScrollReveal } from "./ScrollReveal";

export function About() {
  return (
    <section id="about" className="relative bg-[#050505] text-white py-24 md:py-36 border-b border-neutral-900 z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Portrait Image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ScrollReveal direction="left">
              <ParallaxVideo
                src="/about-portrait1.mp4"
                aspectRatio="square"
                className="rounded-lg"
              />
            </ScrollReveal>
          </div>

          {/* Right Column: Bio */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            <ScrollReveal>
              <span className="text-[#a3a3a3] uppercase text-xs tracking-[0.2em] font-mono font-medium block mb-4">
                The Architect
              </span>
              <h2 className="font-syne font-bold text-4xl md:text-5xl uppercase tracking-tight mb-8">
                Mohammad Abrar Khan
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h3 className="font-syne font-semibold text-lg md:text-xl text-[#d4d4d4] mb-6 leading-relaxed">
                The Builder Who Screens. The Screener Who Builds.
              </h3>
              
              <div className="space-y-6 text-[#a3a3a3] font-light leading-relaxed text-sm md:text-base">
                <p>
                  I hold a <strong>BSc Hons in Computer Science</strong>, anchoring my development practices in core engineering principles: complexity analysis, scalable data structures, and clean code paradigms.
                </p>
                <p>
                  What makes my approach unique is my background in <strong>technical recruitment and screening</strong>. Having evaluated hundreds of developers, I know exactly where architectures fail and what separates mediocre code from production-grade engineering. I understand what companies actually look for, and I apply those strict quality bars to my own work.
                </p>
                <p>
                  This technical rigor is paired with a visual creative eye. As a <strong>cinematic videographer</strong>, I direct, shoot, and color-grade 4K footage. I don't just write functional APIs; I build visual presence, shaping user experiences from database schema up to high-fidelity layouts.
                </p>
              </div>
            </ScrollReveal>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-10 pt-10 border-t border-neutral-900">
              <ScrollReveal delay={0.2}>
                <div className="flex gap-4">
                  <div className="text-white/50 mt-1">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-sm uppercase text-white mb-1">QA & Screening Standards</h4>
                    <p className="text-xs text-[#a3a3a3] font-light">Deep understanding of enterprise code standards and security.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="flex gap-4">
                  <div className="text-white/50 mt-1">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-sm uppercase text-white mb-1">Academic Foundation</h4>
                    <p className="text-xs text-[#a3a3a3] font-light">BSc Hons in Computer Science ensures theoretical rigor.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex gap-4">
                  <div className="text-white/50 mt-1">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-sm uppercase text-white mb-1">Cinematic Precision</h4>
                    <p className="text-xs text-[#a3a3a3] font-light">Color grading, frame composition, and high-fidelity output.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.35}>
                <div className="flex gap-4">
                  <div className="text-white/50 mt-1">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-sm uppercase text-white mb-1">MERN Stack Mastery</h4>
                    <p className="text-xs text-[#a3a3a3] font-light">End-to-end complex database models and interactive states.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
