"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

// Note: Ensure these components are updated to the premium modal style we created!
import Branding from "./Branding";
import VisualDesign from "./AI";
import Marketing from "./Marketing";
import Website from "./Website";

interface PillarCardProps {
  title: string;
  items: string[];
  buttonText: string;
  onLearnMore: () => void;
}

const PillarCard = ({ title, items, buttonText, onLearnMore }: PillarCardProps) => {
  return (
    <div 
      className="group relative w-full flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] bg-neutral/[0.03] border border-neutral/10 transition-all duration-500 hover:bg-neutral/[0.06] hover:border-primary/30 hover:-translate-y-2 shadow-2xl shadow-transparent hover:shadow-primary/5"
    >
      <div>
        {/* Subtle Category Icon/Indicator */}
        <div className="mb-6 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral/40">Capability</span>
        </div>
        
        <h2 className="text-2xl font-bold mb-6 tracking-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h2>
        
        <ul className="space-y-4 mb-10">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-sm font-light text-neutral/50 group-hover:text-neutral/80 transition-colors">
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
    </div>
  );
};

const WhatWeDo = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const closeModal = () => setOpenModal(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (openModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [openModal]);

  return (
    <section id="services" className="bg-background text-neutral py-24 md:py-32 px-6 scroll-mt-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-primary text-[11px] font-bold uppercase tracking-[0.3em]">Our Ecosystem</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              What We Do for <span className="text-neutral/30 italic font-light">Brands Like Yours</span>
            </h2>
          </div>
          <p className="text-neutral/40 text-sm max-w-[300px] font-light leading-relaxed">
            Scalable creative solutions designed to elevate your market position instantly.
          </p>
        </div>

        {/* Changed Grid to be more stable on mobile while maintaining 4 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <PillarCard
            title="Branding"
            items={["Visual Identity", "Brand Strategy", "Brand Style Guide", "Storytelling"]}
            buttonText="Learn more"
            onLearnMore={() => setOpenModal("branding")}
          />
          <PillarCard
            title="AI Automation"
            items={["Custom Agents", "Workflow Automation", "Content Pipelines", "Predictive"]}
            buttonText="Learn more"
            onLearnMore={() => setOpenModal("visualDesign")}
          />
          <PillarCard
            title="Marketing"
            items={["Digital Marketing", "Email Strategy", "Content Creation", "Paid Ads"]}
            buttonText="Learn more"
            onLearnMore={() => setOpenModal("marketing")}
          />
          <PillarCard
            title="Website"
            items={["Web Development", "E-commerce", "SEO Optimization", "UX Prototypes"]}
            buttonText="Learn more"
            onLearnMore={() => setOpenModal("website")}
          />
        </div>
      </div>

      {/* Premium Modals (Ensure these components use the rounded-[2.5rem] style) */}
      {openModal === "branding" && <Branding isOpen={true} onClose={closeModal} />}
      {openModal === "visualDesign" && <VisualDesign isOpen={true} onClose={closeModal} />}
      {openModal === "marketing" && <Marketing isOpen={true} onClose={closeModal} />}
      {openModal === "website" && <Website isOpen={true} onClose={closeModal} />}
    </section>
  );
};

export default WhatWeDo;