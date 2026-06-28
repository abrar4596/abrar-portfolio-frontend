"use client";

import { motion } from "framer-motion";

const STATS = [
  "MERN Stack Architecture",
  "Technical Recruitment & Screening",
  "Cinematic Visuals",
  "BSc Hons Computer Science",
];

export function StatsBanner() {
  // Duplicate array multiple times to fill screen width and loop seamlessly
  const marqueeItems = [...STATS, ...STATS, ...STATS, ...STATS];

  return (
    <section className="relative w-full overflow-hidden bg-white text-black py-8 border-y border-neutral-800 z-20">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-20 pr-20 text-sm md:text-base font-syne font-extrabold uppercase tracking-[0.2em] select-none"
          animate={{ x: ["0%", "-25%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
        >
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex items-center gap-10">
              <span>{item}</span>
              <span className="w-2.5 h-2.5 bg-black rotate-45 inline-block" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
