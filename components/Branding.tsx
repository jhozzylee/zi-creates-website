"use client";

import React, { useState } from "react";
import CTAButton from "./CTAButton";
import BookCall from "./BookCall";

interface BrandingProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrandingModal = ({ isOpen, onClose }: BrandingProps) => {
  const [isBookCallOpen, setBookCallOpen] = useState(false);

  if (!isOpen) return null;

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
      <div className="fixed inset-0 z-[110] bg-background/80 backdrop-blur-xl flex items-center justify-center p-4">
        {/* Click outside to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <div className="relative bg-background border border-neutral/10 text-neutral w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8 md:p-16 shadow-2xl animate-in fade-in zoom-in duration-300">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-10 text-neutral/40 hover:text-primary transition-colors text-2xl"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary mb-4 block">Identity & Strategy</span>
            <h2 className="text-[36px] md:text-[52px] font-bold leading-tight mb-6">
              The Soul of <span className="text-primary">Your Business</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral/70 font-light leading-relaxed">
              Branding is more than just a logo—it’s the heart and soul of your business. 
              We craft distinct identities that tell your unique story and connect 
              <span className="text-neutral font-medium"> emotionally with your audience.</span>
            </p>
          </div>

          {/* Deliverables Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {brandingDeliverables.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-neutral/5 border border-neutral/5 hover:border-primary/30 transition-all duration-300">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-neutral/60 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Value Prop Section */}
          <div className="flex flex-col md:flex-row gap-12 items-center pt-12 border-t border-neutral/10">
            <div className="flex-1 space-y-4">
              <h4 className="text-2xl font-bold">Build an authentic brand.</h4>
              <p className="text-neutral/60 font-light leading-relaxed">
                Whether you’re launching a startup or refreshing an existing brand, 
                Zi Creates ensures your identity reflects your vision with clarity and impact, 
                setting the stage for all future growth.
              </p>
            </div>
            
            <div className="shrink-0">
              <CTAButton text="Book a Call" onClick={() => setBookCallOpen(true)} />
            </div>
          </div>
        </div>
      </div>

      {/* Nested BookCall modal */}
      <BookCall isOpen={isBookCallOpen} onClose={() => setBookCallOpen(false)} />
    </>
  );
};

export default BrandingModal;