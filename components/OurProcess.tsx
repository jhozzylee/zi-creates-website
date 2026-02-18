"use client";

import React from "react";
import { motion } from "framer-motion";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  image: string;
}

const OurProcess = () => {
  // Reusable spring for build stability
  const fluidTransition = {
    type: "spring" as const,
    damping: 35,
    stiffness: 200,
    mass: 1,
  };

  const StepCard = ({ number, title, description, image }: StepCardProps) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={fluidTransition}
      className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-[800px] w-full border-b border-primary/40 group"
    >
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
        <div className="relative overflow-hidden rounded-t-[1.5rem] shadow-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="process" className="bg-background text-neutral py-24 px-6 scroll-mt-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Heading - Motion added while keeping your alignment */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={fluidTransition}
          className="mb-24 md:text-right"
        >
          <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em] block mb-4">Our Method</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            How We Build Your <br />
            <span className="text-neutral/30 italic font-light">Brand Engine</span>
          </h2>
        </motion.div>

        {/* Staircase Steps Container */}
        <div className="flex flex-col gap-3 md:gap-32">
          
          {/* Step 1 - Aligned Right */}
          <div className="flex justify-end">
            <StepCard
              number="01"
              title="Audit & Architect"
              description="We analyze your brand goals and operational bottlenecks to architect a strategy that merges high-level vision with intelligent automation."
              image="/Step01.png"
            />
          </div>

          {/* Step 2 - Centered */}
          <div className="flex justify-center">
            <StepCard
              number="02"
              title="Engineer & Automate"
              description="We move beyond static design to build your brand engine. Through precise engineering, we develop the automated systems that bring your vision to life."
              image="/Step02.png"
            />
          </div>

          {/* Step 3 - Aligned Left */}
          <div className="flex justify-start">
            <StepCard
              number="03"
              title="Deploy & Scale"
              description="We launch your ecosystem and activate your growth pipelines, ensuring your brand stays ahead through continuous, data-driven optimization."
              image="/Step03.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;