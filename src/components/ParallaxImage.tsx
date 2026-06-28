"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "cinematic" | "square" | "video";
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  aspectRatio = "cinematic",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Sophisticated subtle scroll translation
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const aspectClasses = {
    cinematic: "aspect-[21/9] md:aspect-[2.39/1]",
    video: "aspect-[16/9]",
    square: "aspect-square",
  };

  return (
    <div
      ref={containerRef}
      className={`${aspectClasses[aspectRatio]} overflow-hidden relative w-full bg-[#0d0d0d] border border-neutral-900 ${className}`}
    >
      <motion.div style={{ y, height: "124%", top: "-12%", position: "absolute", width: "100%" }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 85vw"
          className="object-cover brightness-[0.65] contrast-[1.1] grayscale hover:grayscale-0 transition-all duration-[1.2s] ease-out"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none opacity-60" />
    </div>
  );
}
