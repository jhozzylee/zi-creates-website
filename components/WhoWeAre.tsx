"use client";

import React, { useState, useEffect } from "react";
import { Infinity, Check, ChevronsRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Added Variants
import CTAButton from "./CTAButton";

const WhoWeAre = () => {
  const [isOpen, setOpen] = useState(false);

  // Added 'as const' to fix the TypeScript "string" error
  const fluidTransition = {
    type: "spring" as const,
    damping: 30,
    stiffness: 150,
    mass: 0.8,
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  return (
    <section
      id="expertise"
      className="bg-background text-neutral py-24 md:py-32 px-6 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* --- HEADER SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={fluidTransition}
          className="mb-20 space-y-4"
        >
          <span className="text-primary text-[11px] font-bold uppercase tracking-[0.3em]">
            Who We are
          </span>
          <p className="text-neutral/60 text-lg font-light max-w-[500px] pt-4">
            Scaling a brand shouldn't be a struggle. We replace manual bottlenecks with intelligent systems that ensure your identity stands out and stays consistent.
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] max-w-[700px] tracking-tight">
            High impact branding, crafted by <span className="text-neutral/30 italic font-light">creativity and intelligence.</span>
          </h2>
        </motion.div>

        {/* --- THE PILLARS --- */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 mb-32">
          {[ 
            {
              icon: <Infinity className="w-5 h-5 text-primary" />,
              title: "Intelligent & Adaptive",
              text: "Custom branding and creative systems tailored to your business, continuously optimized with automated workflows until it’s exactly right."
            },
            {
              icon: <Check className="w-5 h-5 text-primary" />,
              title: "Connect & Automate",
              text: "Integrate expert motion, design, and AI automation into your workflow instantly. No hiring lag, no manual bottlenecks, just high-performance output ready when you are."
            },
            {
              icon: <ChevronsRight className="w-5 h-5 text-primary" />,
              title: "Efficient & Precise",
              text: "Premium creative work delivered with speed and accuracy, supported by intelligent systems that keep your brand ahead of the curve."
            }
          ].map(({ icon, title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...fluidTransition, delay: i * 0.1 }}
              whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.05)" }} 
              className="group relative bg-neutral/[0.03] border border-neutral/10 rounded-[2.5rem] p-10"
            >
              <div className="bg-background border border-neutral/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                {icon}
              </div>
              <h4 className="text-xl font-bold mb-4 tracking-tight">{title}</h4>
              <p className="text-neutral/50 text-sm leading-relaxed font-light">
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- FEATURE SECTION --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={fluidTransition}
            onClick={() => setOpen(true)}
            className="group relative aspect-video lg:aspect-square xl:aspect-video rounded-[2.5rem] overflow-hidden cursor-pointer border border-neutral/10 shadow-2xl"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              src="/WhoWeAre.mp4" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/80 backdrop-blur-xl p-6 rounded-full border border-white/10 shadow-2xl">
                <svg className="w-8 h-8 translate-x-0.5" viewBox="0 0 100 100" fill="none">
                  <path d="M40 30L75 50L40 70V30Z" fill="#30D5C8" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...fluidTransition, delay: 0.1 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
              Your Partner for Powerful Automated Creativity
            </h2>
            <p className="text-neutral/60 text-lg font-light leading-relaxed">
              We are more than a creative agency we design intelligent brand systems that 
              combine stunning visuals, strategic thinking, and AI powered automation 
              giving your brand the edge it needs to grow and thrive.
            </p>
            <div className="pt-4">
              <CTAButton text="Explore our work" onClick={() => window.location.href='/portfolio'} />
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-2xl" 
              onClick={() => setOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="relative w-full max-w-[1100px] aspect-video"
            >
              <div className="w-full h-full rounded-[2rem] overflow-hidden border border-neutral/10 bg-black">
                <video src="/WhoWeAre.mp4" autoPlay controls className="w-full h-full object-contain" />
              </div>
              <button className="absolute -top-14 right-4 text-neutral/40 text-4xl" onClick={() => setOpen(false)}>✕</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WhoWeAre;