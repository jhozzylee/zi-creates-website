"use client";

import React, { useEffect, useRef, useState } from "react";
import CTAButton from "./CTAButton";
import Player from "@vimeo/player";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Added Variants

interface HeroProps {
  onOpenBookCall: () => void;
}

const Hero = ({ onOpenBookCall }: HeroProps) => {
  const [isOpen, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reusable fluid transition with 'as const' to fix Type error
  const fluidTransition = {
    type: "spring" as const,
    damping: 35,
    stiffness: 200,
  };

  // Variants for staggered text reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: fluidTransition 
    },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && iframeRef.current) {
      const player = new Player(iframeRef.current);
      player.setVolume(1);
    }
  }, [isOpen]);

  return (
    <section id="hero" className="bg-background text-neutral pt-24 md:pt-32 pb-2">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16"
      >
        
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left max-w-[580px]">
          <motion.span variants={itemVariants} className="inline-block text-primary text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
            INTELLIGENT CREATIVE SYSTEMS
          </motion.span>
          
          <motion.h1 variants={itemVariants} className="text-[38px] sm:text-[48px] lg:text-[68px] font-bold leading-[1] tracking-tighter mb-8">
            Transform your <br />
            <span className="text-neutral/20 italic font-light">Vision</span> into an <br />
            <span className="text-primary">Intelligent Brand</span>
          </motion.h1>

          {/* MOBILE VIDEO AREA */}
          <motion.div variants={itemVariants} className="block lg:hidden mb-2">
            <div className="relative max-w-[552px] mx-auto rounded-xl overflow-hidden shadow-lg px-2">
              <img src="/Hero-Grid.webp" alt="Video cover" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 flex justify-center items-center z-10">
                <div className="relative px-1" style={{ width: "clamp(176px, 55vw, 284px)" }}>
                  <video className="w-full h-auto rounded-[8px]" src="/Hero-video.mp4" autoPlay loop muted playsInline />
                  <button onClick={() => setOpen(true)} className="absolute inset-0 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                    <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="50" r="48" fill="rgba(15, 15, 15, 0.3)" />
                      <path d="M40 30L70 50L40 70V30Z" fill="#30D5C8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-sm md:text-lg font-light leading-relaxed text-neutral/40 mb-10 max-w-xl px-4 md:px-0">
            We bridge the gap between <span className="text-neutral/80 font-medium">ambition</span> and <span className="text-neutral/80 font-medium">reality</span> 
            by Launching, connecting, scaling businesses through intelligent systems and automated creative pipelines.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-[40px]">
            <CTAButton text="Book a Call" onClick={onOpenBookCall} />
            <button
              onClick={() => setOpen(true)}
              className="group flex items-center text-[9px] font-semibold uppercase tracking-[0.5em] text-neutral-400 hover:text-primary transition-colors duration-500"
            >
              <span className="mr-4 transition-all duration-500 group-hover:tracking-[0.7em]">Watch Reel</span>
              <div className="relative flex items-center justify-center w-10 h-10 border border-neutral-700 rounded-full group-hover:border-primary transition-all duration-700 ease-out overflow-hidden">
                <span className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current relative z-10 transition-transform duration-500 group-hover:scale-125">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
            </button>
          </motion.div>
        </div>

        {/* DESKTOP VIDEO AREA */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ ...fluidTransition, delay: 0.6 }}
          className="hidden lg:flex lg:w-1/2 items-center justify-end"
        >
          <div className="relative max-w-[552px] rounded-xl overflow-hidden shadow-lg">
            <img src="/Hero-Grid.webp" alt="Video cover" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <div className="relative" style={{ width: "clamp(192px, 26vw, 306px)" }}>
                <video className="w-full h-auto rounded-[8px]" src="/Hero-video.mp4" autoPlay loop muted playsInline />
                <button onClick={() => setOpen(true)} className="absolute inset-0 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="48" fill="rgba(15, 15, 15, 0.3)" />
                    <path d="M40 30L70 50L40 70V30Z" fill="#30D5C8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Client Logos Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="mt-32 px-6"
      >
        <div className="max-w-[1280px] mx-auto pt-12 border-t border-neutral/5 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral/20 whitespace-nowrap">Trusted by global innovators</p>
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-8 md:gap-12 opacity-30 hover:opacity-100 transition-opacity duration-700">
            {["Crestville", "Melganic", "ByteBazaar", "Webshapers", "Emcok", "Uplift"].map((client) => (
              <img key={client} src={`/${client}.png`} alt={client} className="h-5 md:h-6 object-contain grayscale brightness-200" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/60 backdrop-blur-2xl" 
              onClick={() => setOpen(false)} 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={fluidTransition}
              className="relative w-full max-w-[1100px] aspect-video"
            >
              <button className="absolute -top-16 right-0 text-neutral/20 hover:text-primary transition-colors text-4xl font-light" onClick={() => setOpen(false)}>✕</button>
              <div className="w-full h-full rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border border-neutral/10 bg-black shadow-2xl">
                <iframe ref={iframeRef} src="https://player.vimeo.com/video/1102249418?autoplay=1" title="Our Works" className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;