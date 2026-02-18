"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Added
import Branding from "./Branding";
import VisualDesign from "./AI";
import Marketing from "./Marketing";
import Website from "./Website";

interface PillarCardProps {
  title: string;
  items: string[];
  buttonText: string;
  onLearnMore: () => void;
  index: number; // Added for stagger
}

// Fixed Transition for Build
const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

const PillarCard = ({ title, items, buttonText, onLearnMore, index }: PillarCardProps) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { ...fluidTransition, delay: index * 0.1 } 
    },
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.06)" }}
      className="group relative w-full flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] bg-neutral/[0.03] border border-neutral/10 shadow-2xl shadow-transparent hover:shadow-primary/5 transition-colors duration-500"
    >
      <div>
        <div className="mb-6 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral/40">Capability</span>
        </div>
        
        <h2 className="text-2xl font-bold mb-6 tracking-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h2>
        
        <ul className="space-y-4 mb-10">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm font-light text-neutral/50 group-hover:text-neutral/80 transition-colors">
              <span className="text-primary/40 group-hover:text-primary transition-colors text-[10px]">/</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button 
        onClick={onLearnMore}
        className="relative overflow-hidden group/btn w-full py-4 px-6 rounded-full border border-neutral/10 flex items-center justify-between transition-all duration-500 hover:border-primary hover:bg-primary/5"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-neutral group-hover/btn:text-primary">
          {buttonText}
        </span>
        <div className="bg-neutral/5 p-2 rounded-full group-hover/btn:bg-primary group-hover/btn:text-background transition-all duration-500">
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </motion.div>
  );
};

const WhatWeDo = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const closeModal = () => setOpenModal(null);

  useEffect(() => {
    if (openModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [openModal]);

  return (
    <section id="services" className="bg-background text-neutral py-24 md:py-32 px-6 scroll-mt-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={fluidTransition}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="space-y-4">
            <span className="text-primary text-[11px] font-bold uppercase tracking-[0.3em]">Our Ecosystem</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              What We Do for <span className="text-neutral/30 italic font-light">Brands Like Yours</span>
            </h2>
          </div>
          <p className="text-neutral/40 text-sm max-w-[300px] font-light leading-relaxed">
            Intelligent creative pipelines designed to scale your market position instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { id: "branding", title: "Branding", items: ["Visual Identity", "Brand Strategy", "Brand Style Guide", "Storytelling"] },
            { id: "visualDesign", title: "AI Automation", items: ["Custom Agents", "Workflow Automation", "Content Pipelines", "Predictive Analytics"] },
            { id: "marketing", title: "Marketing", items: ["Digital Marketing", "Email Strategy", "Content Automation", "Paid Ads"] },
            { id: "website", title: "Website", items: ["Web Development", "E-commerce", "SEO Automation", "UX Prototypes"] }
          ].map((service, index) => (
            <PillarCard
              key={service.id}
              index={index}
              title={service.title}
              items={service.items}
              buttonText="Learn more"
              onLearnMore={() => setOpenModal(service.id)}
            />
          ))}
        </div>
      </div>

      {/* Using AnimatePresence for the Modals to ensure smooth exit */}
      <AnimatePresence>
        {openModal === "branding" && <Branding isOpen={true} onClose={closeModal} />}
        {openModal === "visualDesign" && <VisualDesign isOpen={true} onClose={closeModal} />}
        {openModal === "marketing" && <Marketing isOpen={true} onClose={closeModal} />}
        {openModal === "website" && <Website isOpen={true} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  );
};

export default WhatWeDo;