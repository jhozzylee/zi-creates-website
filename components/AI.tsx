"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CTAButton from "./CTAButton";
import BookCall from "./BookCall";

interface AIAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 30,
  stiffness: 250,
  mass: 1,
};

const AIAutomationModal = ({ isOpen, onClose }: AIAutomationModalProps) => {
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

  const aiServices = [
    { title: "Custom AI Agents", desc: "Tailored agents designed around your specific business rules." },
    { title: "Workflow Automation", desc: "Intelligent systems connecting all your favorite tools." },
    { title: "Content Pipelines", desc: "Scaling your marketing output with AI-powered production." },
    { title: "Predictive Analytics", desc: "Turning data into actionable insights for better decisions." },
    { title: "Operational Scaling", desc: "Reducing manual tasks to focus your team on high-value work." },
    { title: "Tool Integration", desc: "Seamlessly weaving AI into your existing software stack." }
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
                    Future-Proof Operations
                  </span>
                  <h2 className="text-[28px] md:text-[48px] font-bold leading-tight tracking-tight">
                    AI <span className="text-primary italic font-serif font-light">Automation</span>
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
                  Efficiency is the ultimate competitive advantage. We design and deploy{" "}
                  <span className="text-neutral font-medium">bespoke AI systems</span>{" "}
                  that streamline operations and scale your business faster than ever.
                </motion.p>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                  {aiServices.map((service, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...fluidTransition, delay: 0.1 + (i * 0.05) }}
                      whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(48,213,200,0.3)" }}
                      className="p-8 rounded-[2rem] bg-neutral/5 border border-neutral/5 transition-colors duration-300"
                    >
                      <h3 className="font-bold text-lg mb-3 tracking-tight">{service.title}</h3>
                      <p className="text-neutral/50 text-sm font-light leading-relaxed">
                        {service.desc}
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
                      Intelligent, Human-First Systems.
                    </h4>
                    <p className="text-neutral/60 font-light leading-relaxed">
                      Zi Creates builds intelligent systems that save time and reduce errors,
                      letting your team focus on innovation while we automate the repetitive
                      heavy lifting.
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

export default AIAutomationModal;