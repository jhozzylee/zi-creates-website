"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const EmailCaptureSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Demo requested");
  };

  return (
    <section className="bg-background text-neutral px-6 py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        
        {/* Cinematic Asset Container */}
        <div className="w-full mb-20 group relative">
          {/* Decorative Glow behind video */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-neutral/10 bg-neutral/5 shadow-2xl">
            <video
              src="/Hero-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
            />
            {/* Darkened overlay to pull text focus if needed, or leave clean for high impact */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </div>

        {/* Content Block */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="max-w-[600px] space-y-6">
            <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em]">Efficiency at Scale</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1]">
              Whether you’re an entrepreneur, or an <span className="text-neutral/30 italic font-light">established business</span>, we’ll help you save time and money.
            </h2>
          </div>

          {/* Premium Email Form */}
          <form className="w-full max-w-[480px]" onSubmit={handleSubmit}>
            <div className="group relative">
              {/* Animated Border Gradient on Focus */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-transparent rounded-full opacity-0 group-focus-within:opacity-10 transition-opacity duration-500 blur-[2px]" />
              
              <div className="relative p-1.5 rounded-full border border-neutral/20 bg-neutral/[0.03] backdrop-blur-md flex items-center transition-all duration-300 hover:border-neutral/40 focus-within:border-primary">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your professional email"
                  required
                  className="w-full pl-8 pr-4 py-4 bg-transparent text-neutral text-base placeholder:text-neutral/30 focus:outline-none"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap px-8 py-4 rounded-full bg-neutral text-background text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-background transition-all duration-300 flex items-center gap-3"
                >
                  <span className="hidden sm:block">Request Demo</span>
                  <svg
    viewBox="0 0 1024 1024"
    className="w-5 h-5"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M41.353846 876.307692l86.646154-320.984615h366.276923c9.846154 0 19.692308-9.846154 19.692308-19.692308v-39.384615c0-9.846154-9.846154-19.692308-19.692308-19.692308H128l-84.676923-315.076923C41.353846 157.538462 39.384615 151.630769 39.384615 145.723077c0-13.784615 13.784615-27.569231 29.538462-25.6 3.938462 0 5.907692 1.969231 9.846154 1.969231l886.153846 364.307692c11.815385 3.938462 19.692308 15.753846 19.692308 27.569231s-7.876923 21.661538-17.723077 25.6L78.769231 913.723077c-3.938462 1.969231-7.876923 1.969231-11.815385 1.969231-15.753846-1.969231-27.569231-13.784615-27.569231-29.538462 0-3.938462 0-5.907692 1.969231-9.846154z" />
  </svg>
                </button>
                
              </div>
            </div>
            <p className="mt-4 ml-6 text-[10px] text-neutral/30 uppercase tracking-widest font-medium">
              Join 50+ brands scaling with us.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmailCaptureSection;