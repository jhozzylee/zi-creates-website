"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

interface GraphicProductDesignProps {
  onOpenBookCall: () => void;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

export default function GraphicProductDesign({
  onOpenBookCall,
}: GraphicProductDesignProps) {
  const services = [
    {
      title: "High-Impact Graphic Design",
      items: [
        "Social Media Creative (Instagram, LinkedIn, X)",
        "Marketing & Sales Collateral",
        "Infographics & Data Visualization",
        "Advertising Creative (Digital & Outdoor)",
      ],
    },
    {
      title: "Strategic Product Design (UI/UX)",
      items: [
        "User Interface (UI) Design",
        "User Experience (UX) Strategy",
        "Prototyping & Interaction Design",
        "Packaging & Physical Product Design",
      ],
    },
  ];

  return (
    <section className="bg-background text-neutral py-24 px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        
        {/* --- Intro Section --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={fluidTransition}
            className="space-y-8 max-w-xl"
          >
            <span className="uppercase tracking-[0.4em] text-[11px] font-bold text-primary">
              Graphic & Product Design
            </span>

            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tighter">
              Crafting Visuals That <br />
              <span className="text-primary italic font-serif font-light">Solve Problems</span>
            </h1>

            <div className="space-y-6 text-neutral/60 text-lg font-light leading-relaxed">
              <p>
                Great design is more than an aesthetic choice—it’s a business
                strategy. We merge artistic expression with functional engineering
                to create designs that capture attention and drive engagement.
              </p>
            </div>
          </motion.div>

          {/* Image Container - Fixed Twitching by using overflow-hidden on the wrapper */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={fluidTransition}
            className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-neutral/10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="w-full h-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=80"
                alt="Design workflow"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* --- Services Section --- */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Our <span className="text-neutral/30 font-light italic font-serif">Disciplines</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...fluidTransition, delay: index * 0.1 }}
                /* FIXED: Using 'borderColor' in the animation instead of Tailwind hover to prevent layout jump */
                whileHover={{ 
                  y: -8, 
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  borderColor: "rgba(48, 213, 200, 0.4)" 
                }}
                className="group p-10 rounded-[2.5rem] border border-neutral/5 bg-neutral/[0.02] transition-colors duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-8 group-hover:bg-primary group-hover:text-background transition-colors duration-500">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-6 tracking-tight">{service.title}</h3>  
        
                <ul className="space-y-4 text-neutral/50 font-light text-sm">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex gap-4 items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Why Us Section --- */}
        <div className="bg-neutral/[0.02] rounded-[3rem] p-12 lg:p-20 mb-32 border border-neutral/10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-16 tracking-tighter">
            Why Choose <span className="text-primary">Zi Creates</span>?
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { title: "Human-Centric Design", desc: "We design for people, not pixels. Every choice is guided by empathy." },
              { title: "Seamless Brand Integration", desc: "Your designs feel like a natural extension of your brand." },
              { title: "Rapid Iteration & Delivery", desc: "High-velocity workflows that keep you ahead." },
              { title: "Data-Backed Creativity", desc: "Informed by CRO principles to ensure performance." },
            ].map((feature, i) => (
              <div key={i} className="flex gap-6">
                <div className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-xl font-bold tracking-tight">{feature.title}</h4>
                  <p className="text-neutral/50 font-light leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Bottom CTA --- */}
        <div className="text-center max-w-3xl mx-auto py-12 border-t border-neutral/5">
          <p className="text-2xl md:text-3xl font-light italic text-neutral/40 mb-12 tracking-tight">
            “Design that doesn’t just look good — <span className="text-neutral/90">it works</span>.”
          </p>
          <CTAButton text="Book a Consultation" onClick={onOpenBookCall} />
        </div>
      </div>
    </section>
  );
}