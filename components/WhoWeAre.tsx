"use client";

import React, { useState, useEffect } from "react";
import { Infinity, Check, ChevronsRight } from "lucide-react";
import CTAButton from "./CTAButton";

const WhoWeAre = () => {
  const [isOpen, setOpen] = useState(false);

  // Sync scroll lock with the premium modal
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
        <div className="mb-20 space-y-4">
          <span className="text-primary text-[11px] font-bold uppercase tracking-[0.3em]">
            Who We are
          </span>
          <p className="text-neutral/60 text-lg font-light max-w-[500px] pt-4">
            Struggling to build a brand identity that stands out? We deliver stunning visuals and strategic marketing.
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] max-w-[700px] tracking-tight">
            High-impact branding, crafted by <span className="text-neutral/30 italic font-light">expert creatives.</span>
          </h2>
          
        </div>

        {/* --- THE PILLARS (Refined Card Design) --- */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 mb-32">
          {[ 
            {
              icon: <Infinity className="w-5 h-5 text-primary" />,
              title: "Flexible & Unlimited",
              text: "Custom branding and visuals tailored to your business, with unlimited refinements until it's just right."
            },
            {
              icon: <Check className="w-5 h-5 text-primary" />,
              title: "Subscribe & Start",
              text: "Get expert branding, motion design, and digital visuals without the wait—ready when you are."
            },
            {
              icon: <ChevronsRight className="w-5 h-5 text-primary" />,
              title: "Fast & Reliable",
              text: "Premium designs, delivered with speed and precision to keep your brand ahead of the curve."
            }
          ].map(({ icon, title, text }, i) => (
            <div
              key={i}
              className="group relative bg-neutral/[0.03] border border-neutral/10 rounded-[2.5rem] p-10 transition-all duration-500 hover:bg-neutral/[0.05] hover:border-primary/20"
            >
              <div className="bg-background border border-neutral/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:border-primary/50 transition-colors">
                {icon}
              </div>
              <h4 className="text-xl font-bold mb-4 tracking-tight">{title}</h4>
              <p className="text-neutral/50 text-sm leading-relaxed font-light">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* --- FEATURE SECTION (Video + Info) --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Cinematic Video Box */}
          <div 
            onClick={() => setOpen(true)}
            className="group relative aspect-video lg:aspect-square xl:aspect-video rounded-[2.5rem] overflow-hidden cursor-pointer border border-neutral/10 shadow-2xl"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              src="/WhoWeAre.mp4" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            
            {/* Play Trigger */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/80 backdrop-blur-xl p-6 rounded-full border border-white/10 scale-90 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                <svg className="w-8 h-8 translate-x-0.5" viewBox="0 0 100 100" fill="none">
                  <path d="M40 30L75 50L40 70V30Z" fill="#30D5C8" />
                </svg>
              </div>
            </div>
          </div>

          {/* Text Block */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
              Your Go-To Agency for Powerful Visuals
            </h2>
            <p className="text-neutral/60 text-lg font-light leading-relaxed">
              At Zi Creates, we’re not just a vendor — we’re an extension of your creative team. We work side-by-side with you to ensure every project is exactly what your brand needs to scale.
            </p>
            <div className="pt-4">
              <CTAButton text="Explore our work" onClick={() => window.location.href='/portfolio'} />
            </div>
          </div>
        </div>
      </div>

      {/* --- PREMIUM VIDEO MODAL --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-12">
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-2xl animate-in fade-in duration-500" 
            onClick={() => setOpen(false)} 
          />
          <div className="relative w-full max-w-[1100px] aspect-video animate-in zoom-in-95 duration-500 shadow-[0_0_100px_rgba(48,213,200,0.1)]">
            <div className="w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-neutral/10 bg-black">
              <video
                src="/WhoWeAre.mp4"
                autoPlay
                controls
                className="w-full h-full object-contain"
              />
            </div>
            <button
              className="absolute -top-14 right-4 text-neutral/40 hover:text-primary transition-colors text-4xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhoWeAre;