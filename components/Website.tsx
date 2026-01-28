"use client";

import React, { useState } from "react";
import CTAButton from "./CTAButton";
import BookCall from "./BookCall";

interface WebsiteProps {
  isOpen: boolean;
  onClose: () => void;
}

const WebsiteModal = ({ isOpen, onClose }: WebsiteProps) => {
  const [isBookCallOpen, setBookCallOpen] = useState(false);

  if (!isOpen) return null;

  const webServices = [
    { title: "Custom Design", desc: "Bespoke layouts tailored specifically to your brand DNA." },
    { title: "Responsive Build", desc: "Seamless performance across mobile, tablet, and desktop." },
    { title: "UI/UX Strategy", desc: "Interfaces focused on user clarity and ease of navigation." },
    { title: "SEO Architecture", desc: "Clean code optimized for high search engine visibility." },
    { title: "Conversion Focus", desc: "Strategic funnels designed to turn clicks into customers." },
    { title: "Tech Integration", desc: "Connecting your site with marketing and analytics tools." }
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
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary mb-4 block">Digital Presence</span>
            <h2 className="text-[36px] md:text-[52px] font-bold leading-tight mb-6">
              The Digital <span className="text-primary">Front Door</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral/70 font-light leading-relaxed">
              Your website is your most powerful brand asset. We build high-performance 
              digital experiences that are not only 
              <span className="text-neutral font-medium"> visually stunning </span> 
              but optimized for speed and results.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {webServices.map((service, i) => (
              <div key={i} className="p-6 rounded-2xl bg-neutral/5 border border-neutral/5 hover:border-primary/30 transition-all duration-300">
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-neutral/60 text-sm font-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Value Prop Section */}
          <div className="flex flex-col md:flex-row gap-12 items-center pt-12 border-t border-neutral/10">
            <div className="flex-1 space-y-4">
              <h4 className="text-2xl font-bold">Turning Clicks into Customers.</h4>
              <p className="text-neutral/60 font-light leading-relaxed">
                At Zi Creates, we ensure your online presence reflects the quality of 
                your vision, building trust from the very first interaction and 
                creating a scalable platform for your business to grow.
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

export default WebsiteModal;