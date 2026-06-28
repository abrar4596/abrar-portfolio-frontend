"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "Performance Supplement Platform",
    tag: "MERN Stack · E-Commerce Architecture · Complex State Management",
    image: "/project-supplement.png",
  },
  {
    id: 2,
    num: "02",
    title: "Real-Time Weather Alert System",
    tag: "API Integration · React · Live Data Fetching",
    image: "/project-weather.png",
  },
  {
    id: 3,
    num: "03",
    title: "Technical Interview Reporting Tool",
    tag: "Candidate Screening · Assessment Logic",
    image: "/project-interview.png",
  },
];

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Relative coordinates can be used, but clientX/Y with fixed positioning is smoother
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <section
      id="projects"
      className="relative bg-[#050505] text-white py-24 md:py-32 border-b border-neutral-900 z-20"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <ScrollReveal>
          <span className="text-[#a3a3a3] uppercase text-xs tracking-[0.2em] font-medium block mb-3">
            Selected Works
          </span>
          <h2 className="font-syne font-bold text-4xl md:text-6xl tracking-tight uppercase">
            Featured Projects
          </h2>
        </ScrollReveal>
      </div>

      {/* Projects List View */}
      <div className="w-full border-t border-neutral-900">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="border-b border-neutral-900 group"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer">
              {/* Left Column: Number and Title */}
              <div className="flex items-start md:items-center gap-6 md:gap-12">
                <span className="font-mono text-sm md:text-base text-neutral-600 group-hover:text-white transition-colors duration-500 pt-1 md:pt-0">
                  {project.num}
                </span>
                <h3 className="font-syne font-extrabold text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight text-[#a3a3a3] group-hover:text-white transition-colors duration-500 leading-tight">
                  {project.title}
                </h3>
              </div>

              {/* Right Column: Tags and Arrow */}
              <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12">
                <span className="text-xs md:text-sm text-neutral-600 group-hover:text-neutral-400 transition-colors duration-500 font-light max-w-xs md:text-right">
                  {project.tag}
                </span>
                <div className="w-10 h-10 border border-neutral-800 rounded-full flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                  <ArrowUpRight
                    size={18}
                    className="text-[#a3a3a3] group-hover:text-black transition-colors duration-500"
                  />
                </div>
              </div>

              {/* Mobile Only: Inline Image Preview */}
              <div className="md:hidden mt-4 w-full aspect-[16/9] relative overflow-hidden rounded-md border border-neutral-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover brightness-[0.7] contrast-[1.1]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Floating Image Follower */}
      <AnimatePresence>
        {hoveredProject !== null && (
          <motion.div
            style={{
              x: mousePosition.x + 20, // offset right from cursor
              y: mousePosition.y + 20, // offset down from cursor
              position: "fixed",
              pointerEvents: "none",
              zIndex: 40,
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 3 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              mass: 0.5,
            }}
            className="hidden md:block w-[360px] aspect-[16/9] overflow-hidden border border-neutral-800 bg-[#0d0d0d] shadow-2xl rounded-lg"
          >
            {PROJECTS.map(
              (project) =>
                project.id === hoveredProject && (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="360px"
                      className="object-cover brightness-[0.8] contrast-[1.1] grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </motion.div>
                )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
