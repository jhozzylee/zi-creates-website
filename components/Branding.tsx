"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CTAButton from "./CTAButton";
import BookCall from "./BookCall";

interface BrandingProps {
  isOpen: boolean;
  onClose: () => void;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 30,
  stiffness: 250,
  mass: 1,
};

const BrandingModal = ({ isOpen, onClose }: BrandingProps) => {
  const [isBookCallOpen, setBookCallOpen] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const brandingDeliverables = [
    { title: "Visual Identity", desc: "Memorable logos and distinct iconography systems." },
    { title: "Design Language", desc: "Cohesive color palettes and custom typography." },
    { title: "Brand Voice", desc: "Messaging guidelines that speak to your audience." },
    { title: "Positioning", desc: "Strategic market differentiation and brand DNA." },
    { title: "Brand Guidelines", desc: "Comprehensive bibles for total visual consistency." },
    { title: "Collateral Design", desc: "Stationery, pitch decks, and digital touchpoints." }
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={onClose}
            />

            {/* Modal Shell */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={fluidTransition}
              className="relative w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] bg-background border border-neutral/10 shadow-2xl overflow-hidden flex flex-col"
            >

              {/* 🔒 FIXED HEADER */}
              <div className="flex-shrink-0 z-30 bg-background border-b border-neutral/10 px-8 md:px-16 pt-10 pb-8 flex items-start justify-between">
                <div className="max-w-3xl">
                  <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-primary block mb-2">
                    Identity & Strategy
                  </span>
                  <h2 className="text-[28px] md:text-[48px] font-bold leading-tight tracking-tight">
                    The Soul of <span className="text-primary italic font-serif font-light">Your Business</span>
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="mt-2 text-neutral/40 hover:text-primary transition-colors text-2xl leading-none"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* 📜 SCROLLABLE BODY */}
              <div className="overflow-y-auto px-8 md:px-16 pb-16 pt-10 no-scrollbar">
                {/* Intro */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-2xl text-neutral/70 font-light leading-relaxed max-w-3xl mb-16"
                >
                  Branding is more than just a logo—it’s the heart of your business.
                  We craft distinct identities that tell your unique story and connect{" "}
                  <span className="text-neutral font-medium">emotionally with your audience.</span>
                </motion.p>

                {/* Deliverables Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                  {brandingDeliverables.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...fluidTransition, delay: 0.1 + (i * 0.05) }}
                      whileHover={{ 
                        y: -5, 
                        backgroundColor: "rgba(255,255,255,0.04)", 
                        borderColor: "rgba(48,213,200,0.3)" 
                      }}
                      className="p-8 rounded-[2rem] bg-neutral/5 border border-neutral/5 transition-colors duration-300"
                    >
                      <h3 className="font-bold text-lg mb-3 tracking-tight">{item.title}</h3>
                      <p className="text-neutral/50 text-sm font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Value Prop */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row gap-12 items-center pt-12 border-t border-neutral/10"
                >
                  <div className="flex-1 space-y-4">
                    <h4 className="text-2xl font-bold tracking-tight">
                      Build an authentic brand.
                    </h4>
                    <p className="text-neutral/60 font-light leading-relaxed">
                      Whether you’re launching a startup or refreshing an existing brand,
                      Zi Creates ensures your identity reflects your vision with clarity
                      and impact, setting the stage for all future growth.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <CTAButton text="Book a Call" onClick={() => setBookCallOpen(true)} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Nested BookCall */}
      <BookCall
        isOpen={isBookCallOpen}
        onClose={() => setBookCallOpen(false)}
      />
    </>
  );
};

export default BrandingModal;