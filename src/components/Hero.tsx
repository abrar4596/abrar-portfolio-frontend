"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Configuration for frame sequence - easily adjustable
const FRAME_COUNT = 25; // Change this to 150 when adding more frames
const FRAME_START_INDEX = 1; // 1-based index (e.g. frame_0001 or ezgif-frame-001)
const FRAME_PADDING = 3; // 3 digits for "ezgif-frame-001", 4 digits for "frame_0001"
const FRAME_PREFIX = "ezgif-frame-"; // Prefix before the frame number
const FRAME_DIRECTORY = "/BG_frames"; // Path in public directory
const FRAME_EXTENSION = "jpg"; // File extension of frames

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameIndexRef = useRef<number>(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Helper function to build the frame URL
  const getFrameUrl = (index: number) => {
    const frameNum = index + FRAME_START_INDEX;
    const paddedNum = String(frameNum).padStart(FRAME_PADDING, "0");
    return `${FRAME_DIRECTORY}/${FRAME_PREFIX}${paddedNum}.${FRAME_EXTENSION}`;
  };

  // Resize canvas for sharp rendering and cover calculations
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    // Set backing store dimensions to match device display resolution
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Use CSS to keep visual size fitting viewport
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  };

  // Draw specific frame index to canvas with object-fit: cover math
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate dimensions for object-fit: cover behavior
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Phase 1: Preload frames in memory
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    // Register GSAP ScrollTrigger
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const handleImageLoad = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / FRAME_COUNT) * 100);
      setLoadProgress(progress);

      if (loadedCount === FRAME_COUNT) {
        imagesRef.current = loadedImages;
        setIsLoaded(true);
      }
    };

    const handleImageError = (index: number) => {
      console.warn(`Failed to load frame ${index + FRAME_START_INDEX} at: ${getFrameUrl(index)}`);
      // Count it anyway to prevent blocking the loader
      handleImageLoad();
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = handleImageLoad;
      img.onerror = () => handleImageError(i);
      loadedImages[i] = img;
    }

    // Clean up loading state if unmounted
    return () => {
      imagesRef.current = [];
    };
  }, []);

  // Phase 2: Canvas resizing and initial drawing on load
  useEffect(() => {
    if (!isLoaded) return;

    // Initial resize and draw first frame immediately
    resizeCanvas();
    drawFrame(0);

    const handleResize = () => {
      resizeCanvas();
      drawFrame(currentFrameIndexRef.current);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded]);

  // Phase 3: GSAP ScrollTrigger timeline for scroll-linked frame sequence
  useEffect(() => {
    if (!isLoaded) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const content = contentRef.current;

    if (!container || !canvas || !content) return;

    // Setup gsap context for easy scoping and cleanups
    const ctx = gsap.context(() => {
      const frameObj = { val: 0 };

      // Base Timeline with ScrollTrigger pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=3000", // Pinned scroll depth
          scrub: 0.5, // Smooth inertia
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.round(frameObj.val);
            const safeIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
            currentFrameIndexRef.current = safeIndex;
            drawFrame(safeIndex);
          },
        },
      });

      // Animate frame values linearly
      tl.to(
        frameObj,
        {
          val: FRAME_COUNT - 1,
          ease: "none",
        },
        0
      );

      // Apple-style: Fade out and slide up typography as the user scrolls
      tl.to(
        content,
        {
          opacity: 0,
          y: -100,
          ease: "power2.inOut",
        },
        0
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isLoaded]);

  const handleExploreClick = () => {
    const nextSection = document.getElementById("services") || document.getElementById("stats");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#050505] overflow-hidden">
      {/* Sleek, High-End Preloader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
          >
            <div className="max-w-xs w-full px-6">
              <div className="flex justify-between items-baseline mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a3a3a3]">
                <span>Initializing Experience</span>
                <span className="text-white font-bold">{loadProgress}%</span>
              </div>
              <div className="h-[2px] w-full bg-[#141414] overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadProgress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 block w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Premium Cinematic Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050505]/40 via-[#050505]/60 to-[#050505] pointer-events-none" />

      {/* Hero Content Overlay */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full min-h-screen flex flex-col justify-center pt-16"
      >
        <div className="max-w-4xl">
          {/* Subtle Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-[1px] bg-[#a3a3a3]"></span>
            <span className="text-[#a3a3a3] uppercase text-xs tracking-[0.2em] font-medium">
              Mohammad Abrar Khan &mdash; Portfolio
            </span>
          </motion.div>

          {/* Brutalist Hero Title */}
          <h1 className="font-syne font-extrabold text-[10vw] sm:text-[8vw] md:text-[6.5vw] leading-[0.9] text-white uppercase select-none tracking-tighter">
            <span className="block overflow-hidden py-1">
              <motion.span
                className="block origin-left"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                I don't just
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1">
              <motion.span
                className="block origin-left"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                write code.
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1 text-[#a3a3a3]">
              <motion.span
                className="block origin-left"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                I build presence.
              </motion.span>
            </span>
          </h1>

          {/* Subtext Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-lg md:text-xl text-[#a3a3a3] max-w-2xl font-light leading-relaxed"
          >
            Engineering scalable MERN architectures and directing high-end cinematic visuals for brands that refuse to be ordinary.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={handleExploreClick}
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
