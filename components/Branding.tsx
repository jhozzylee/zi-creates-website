"use client";

import React, { useState } from "react";
import CTAButton from "./CTAButton";
import BookCall from "./BookCall";

interface BrandingProps {
  isOpen: boolean;
  onClose: () => void;
}

const HEADER_HEIGHT = 130; // px

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
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Modal Shell */}
        <div className="relative w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] bg-background border border-neutral/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

          {/* 🔒 FIXED HEADER */}
          <div
            className="absolute top-0 left-0 right-0 z-30 bg-background border-b border-neutral/10 px-6 md:px-12 pt-6 pb-6 flex items-start justify-between"
            style={{ height: HEADER_HEIGHT }}
          >
            <div className="max-w-3xl">
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary block mb-2">
                Identity & Strategy
              </span>
              <h2 className="text-[26px] md:text-[42px] font-bold leading-tight">
                The Soul of <span className="text-primary">Your Business</span>
              </h2>
            </div>

            <button
              onClick={onClose}
              className="text-neutral/40 hover:text-primary transition-colors text-2xl leading-none"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* 📜 SCROLLABLE BODY */}
          <div
            className="overflow-y-auto px-6 md:px-12 pb-16"
            style={{
              paddingTop: HEADER_HEIGHT + 24,
              maxHeight: "90vh",
            }}
          >
            {/* Intro */}
            <p className="text-lg md:text-xl text-neutral/70 font-light leading-relaxed max-w-3xl mb-16">
              Branding is more than just a logo—it’s the heart and soul of your business.
              We craft distinct identities that tell your unique story and connect
              <span className="text-neutral font-medium"> emotionally with your audience.</span>
            </p>

            {/* Deliverables Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {brandingDeliverables.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-neutral/5 border border-neutral/5 hover:border-primary/30 transition-all duration-300"
                >
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-neutral/60 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Value Prop */}
            <div className="flex flex-col md:flex-row gap-12 items-center pt-12 border-t border-neutral/10">
              <div className="flex-1 space-y-4">
                <h4 className="text-2xl font-bold">
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
            </div>
          </div>
        </div>
      </div>

      {/* Nested BookCall */}
      <BookCall
        isOpen={isBookCallOpen}
        onClose={() => setBookCallOpen(false)}
      />
    </>
  );
};

export default BrandingModal;
