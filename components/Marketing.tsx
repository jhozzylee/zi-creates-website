"use client";

import React, { useState } from "react";
import CTAButton from "./CTAButton";
import BookCall from "./BookCall";

interface MarketingProps {
  isOpen: boolean;
  onClose: () => void;
}

const MarketingModal = ({ isOpen, onClose }: MarketingProps) => {
  const [isBookCallOpen, setBookCallOpen] = useState(false);

  if (!isOpen) return null;

  const marketingServices = [
    { title: "Digital Strategy", desc: "Full-scale planning and market positioning." },
    { title: "Social Management", desc: "Content creation and community engagement." },
    { title: "Paid Advertising", desc: "High-ROI campaigns across Meta and Google." },
    { title: "Email Automation", desc: "Lead nurturing and retention workflows." },
    { title: "SEO & Content", desc: "Organic growth and authority building." },
    { title: "Analytics", desc: "Data-driven insights to measure every win." }
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
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary mb-4 block">Drive Growth</span>
            <h2 className="text-[36px] md:text-[52px] font-bold leading-tight mb-6">
              Strategic <span className="text-primary">Marketing</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral/70 font-light leading-relaxed">
              Marketing is about connecting your brand with the right audience at the right time. 
              We combine data-driven insights with compelling storytelling to create 
              campaigns that deliver <span className="text-neutral font-medium">measurable results.</span>
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {marketingServices.map((service, i) => (
              <div key={i} className="p-6 rounded-2xl bg-neutral/5 border border-neutral/5 hover:border-primary/30 transition-all duration-300">
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-neutral/60 text-sm font-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Value Prop Section */}
          <div className="flex flex-col md:flex-row gap-12 items-center pt-12 border-t border-neutral/10">
            <div className="flex-1 space-y-4">
              <h4 className="text-2xl font-bold">Why partner with us?</h4>
              <p className="text-neutral/60 font-light leading-relaxed">
                Whether you’re launching a new product or boosting brand visibility, 
                Zi Creates builds creative infrastructure so your marketing stays 
                consistent, scalable, and—most importantly—profitable.
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

export default MarketingModal;