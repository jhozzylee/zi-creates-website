"use client";

import React, { useEffect, useRef, useState } from "react";
import CTAButton from "./CTAButton";
import Player from "@vimeo/player";

interface HeroProps {
  onOpenBookCall: () => void;
}

const Hero = ({ onOpenBookCall }: HeroProps) => {
  const [isOpen, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && iframeRef.current) {
      const player = new Player(iframeRef.current);
      player.setVolume(1);
    }
  }, [isOpen]);

  return (
    <section id="hero" className="bg-background text-neutral pt-24 md:pt-32 pb-2">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Premium Typography Overhaul */}
        <div className="lg:w-1/2 text-center lg:text-left max-w-[580px]">
          {/* Subtle Overline */}
          <span className="inline-block text-primary text-[10px] font-bold uppercase tracking-[0.5em] mb-6">
            Creative Strategy & Design
          </span>
          
          <h1 className="text-[38px] sm:text-[48px] lg:text-[68px] font-bold leading-[1] tracking-tighter mb-8">
            Transform your <br />
            <span className="text-neutral/20 italic font-light">Vision</span> into a <br />
            <span className="text-primary">Powerful Brand</span>
          </h1>

          {/* MOBILE VIDEO AREA - UNTOUCHED (as requested) */}
          <div className="block lg:hidden mb-2">
            <div className="relative max-w-[552px] mx-auto rounded-xl overflow-hidden shadow-lg px-2">
              <img src="/Hero-Grid.webp" alt="Video cover" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 flex justify-center items-center z-10">
                <div className="relative px-1" style={{ width: "clamp(176px, 55vw, 284px)" }}>
                  <video className="w-full h-auto rounded-[8px]" src="/Hero-video.mp4" autoPlay loop muted playsInline />
                  <button onClick={() => setOpen(true)} className="absolute inset-0 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                    <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="50" r="48" fill="rgba(15, 15, 15, 0.3)" />
                      <path d="M40 30L70 50L40 70V30Z" fill="#30D5C8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm md:text-lg font-light leading-relaxed text-neutral/40 mb-10 max-w-xl px-4 md:px-0">
            We bridge the gap between <span className="text-neutral/80 font-medium">ambition</span> and <span className="text-neutral/80 font-medium">reality</span>. 
            Launching, connecting, and growing businesses with innovative, cinematic creative solutions.
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-[40px]">
            <CTAButton text="Book a Call" onClick={onOpenBookCall} />
            <button
            onClick={() => setOpen(true)}
            className="group flex items-center text-[9px] font-semibold uppercase tracking-[0.5em] text-neutral-400 hover:text-primary transition-colors duration-500"
            >
              <span className="mr-4 transition-all duration-500 group-hover:tracking-[0.7em]">Watch Reel</span>
              
              <div className="relative flex items-center justify-center w-10 h-10 border border-neutral-700 rounded-full group-hover:border-primary transition-all duration-700 ease-out overflow-hidden">
                
                {/* Background fill effect */}
                <span className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                
                <svg 
                viewBox="0 0 24 24" 
                className="w-2 h-2 fill-current relative z-10 transition-transform duration-500 group-hover:scale-125"
                >
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
                </div>
            </button>
          </div>
        </div>

        {/* DESKTOP VIDEO AREA - UNTOUCHED (as requested) */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-end">
          <div className="relative max-w-[552px] rounded-xl overflow-hidden shadow-lg">
            <img src="/Hero-Grid.webp" alt="Video cover" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <div className="relative" style={{ width: "clamp(192px, 26vw, 306px)" }}>
                <video className="w-full h-auto rounded-[8px]" src="/Hero-video.mp4" autoPlay loop muted playsInline />
                <button onClick={() => setOpen(true)} className="absolute inset-0 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="48" fill="rgba(15, 15, 15, 0.3)" />
                    <path d="M40 30L70 50L40 70V30Z" fill="#30D5C8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Logos: Refined Spacing & Opacity */}
      <div className="mt-32 px-6">
        <div className="max-w-[1280px] mx-auto pt-12 border-t border-neutral/5 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral/20 whitespace-nowrap">Trusted by global innovators</p>
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-8 md:gap-12 opacity-30 hover:opacity-100 transition-opacity duration-700">
            <img src="/Crestville.png" alt="Client 1" className="h-5 md:h-6 object-contain grayscale brightness-200" />
            <img src="/Melganic.png" alt="Client 2" className="h-5 md:h-6 object-contain grayscale brightness-200" />
            <img src="/ByteBazaar.png" alt="Client 3" className="h-5 md:h-6 object-contain grayscale brightness-200" />
            <img src="/Webshapers.png" alt="Client 4" className="h-5 md:h-6 object-contain grayscale brightness-200" />
            <img src="/Emcok.png" alt="Client 5" className="h-5 md:h-6 object-contain grayscale brightness-200" />
            <img src="/Uplift.png" alt="Client 6" className="h-5 md:h-6 object-contain grayscale brightness-200" />
          </div>
        </div>
      </div>

      {/* --- MODAL (Kept Exactly Same but Refined Rounding) --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-2xl" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-[1100px] aspect-video animate-in zoom-in-95 duration-500">
            <button className="absolute -top-16 right-0 text-neutral/20 hover:text-primary transition-colors text-4xl font-light" onClick={() => setOpen(false)}>✕</button>
            <div className="w-full h-full rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border border-neutral/10 bg-black shadow-2xl">
              <iframe ref={iframeRef} src="https://player.vimeo.com/video/1102249418?autoplay=1" title="Our Works" className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;