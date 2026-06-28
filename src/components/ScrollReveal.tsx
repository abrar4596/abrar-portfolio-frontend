"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 1.0,
}: ScrollRevealProps) {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom ultra-premium cubic-bezier curve (similar to easeOutExpo)
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p";
  delay?: number;
}

export function RevealText({ text, className = "", tag = "p", delay = 0 }: RevealTextProps) {
  const Tag = tag;
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      y: "110%",
      transition: { ease: [0.16, 1, 0.3, 1] as [number, number, number, number], duration: 0.8 },
    },
    visible: {
      y: "0%",
      transition: { ease: [0.16, 1, 0.3, 1] as [number, number, number, number], duration: 0.8 },
    },
  };

  return (
    <Tag className={`${className} overflow-hidden inline-flex flex-wrap leading-tight`}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
        className="inline-flex flex-wrap"
      >
        {words.map((word, idx) => (
          <span key={idx} className="overflow-hidden inline-block mr-[0.25em] py-[0.1em] -my-[0.1em]">
            <motion.span variants={child} className="inline-block select-none">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
