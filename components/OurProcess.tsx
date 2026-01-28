"use client";

import React from "react";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  image: string;
}

const OurProcess = () => {
  // ✅ Reusable Step Component - Layout maintained, Style upgraded
  const StepCard = ({ number, title, description, image }: StepCardProps) => (
    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-[800px] w-full border-b border-primary/40 group">
      {/* Text Content - Always on the Left */}
      <div className="flex-1 text-center md:text-right">
        <div className="flex items-center gap-3 mb-4 justify-center md:justify-end">
          <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase">Phase {number}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-base md:text-lg font-light leading-relaxed text-neutral/60 max-w-[360px] ml-auto">
          {description}
        </p>
      </div>

      {/* Image - Always on the Right */}
      <div className="flex-1 w-full max-w-[380px]">
        <div className="relative overflow-hidden rounded-[1.5rem] shadow-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        </div>
      </div>
    </div>
  );

  return (
    <section id="process" className="bg-background text-neutral py-24 px-6 scroll-mt-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Heading - Re-aligned to match your preferred layout */}
        <div className="mb-24 md:text-right">
          <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em] block mb-4">Our Method</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            How We Bring Your <br />
            <span className="text-neutral/30 italic font-light">Brand to Life</span>
          </h2>
        </div>

        {/* Staircase Steps Container */}
        <div className="flex flex-col gap-3 md:gap-32">
          
          {/* Step 1 - Aligned Right */}
          <div className="flex justify-end">
            <StepCard
              number="01"
              title="Discover & Strategize"
              description="We start with a deep dive into your brand—understanding your goals, audience, and vision to craft the perfect creative strategy."
              image="/Step01.png"
            />
          </div>

          {/* Step 2 - Centered */}
          <div className="flex justify-center">
            <StepCard
              number="02"
              title="Design & Develop"
              description="From designs to development, we bring your brand to life. Through constant collaboration, we refine the work until it's perfect."
              image="/Step02.png"
            />
          </div>

          {/* Step 3 - Aligned Left */}
          <div className="flex justify-start">
            <StepCard
              number="03"
              title="Launch & Grow"
              description="With everything ready, we launch your project and continue supporting your brand's growth in the digital landscape."
              image="/Step03.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;