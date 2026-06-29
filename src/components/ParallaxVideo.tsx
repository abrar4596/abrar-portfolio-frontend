"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface ParallaxVideoProps {
  src: string;
  className?: string;
  aspectRatio?: "cinematic" | "square" | "video";
}

export function ParallaxVideo({
  src,
  className = "",
  aspectRatio = "square",
}: ParallaxVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showInteractionHint, setShowInteractionHint] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax translation matching ParallaxImage
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const aspectClasses = {
    cinematic: "aspect-[21/9] md:aspect-[2.39/1]",
    video: "aspect-[16/9]",
    square: "aspect-square",
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      const newMuteState = !videoRef.current.muted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
      setShowInteractionHint(false);
    }
  };

  // Ensure autoplay triggers on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay was prevented by browser, waiting for user interaction:", err);
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleToggleMute}
      className={`${aspectClasses[aspectRatio]} overflow-hidden relative w-full bg-[#0d0d0d] border border-neutral-900 cursor-pointer group ${className}`}
    >
      <motion.div style={{ y, height: "124%", top: "-12%", position: "absolute", width: "100%" }}>
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          autoPlay
          playsInline
          className="w-full h-full object-cover brightness-[0.7] contrast-[1.05] grayscale group-hover:grayscale-0 transition-all duration-[1s] ease-out"
        />
      </motion.div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none opacity-60" />

      {/* Audio toggle UI overlay */}
      <div className="absolute bottom-4 right-4 z-30 bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/20 p-2.5 rounded-full text-white transition-all duration-300 shadow-lg">
        {isMuted ? (
          <VolumeX size={16} className="text-white/75" />
        ) : (
          <Volume2 size={16} className="text-white animate-pulse" />
        )}
      </div>

      {/* Floating text hint overlay */}
      {showInteractionHint && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/20 transition-colors pointer-events-none z-10">
          <div className="bg-black/60 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase text-white/90 shadow-2xl opacity-90 group-hover:opacity-100 transition-opacity">
            Click for sound
          </div>
        </div>
      )}
    </div>
  );
}
