"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import CTAButton from "./CTAButton";

interface GraphicProductDesignProps {
  onOpenBookCall: () => void;
}

// 💫 The Spring Motion you requested
const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

const fadeUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: fluidTransition
  }
};

const viewportSettings = { once: true, margin: "-50px" };

export default function GraphicProductDesign({ onOpenBookCall }: GraphicProductDesignProps) {
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
        
        {/* --- INTRO SECTION --- */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportSettings}
            transition={fluidTransition}
            className="space-y-10 max-w-xl"
          >
            <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-primary">
              Graphic & Product Design
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tighter">
              Crafting Visuals <br />
              <span className="text-primary italic font-serif font-light">That Solve</span>
            </h1>

            <div className="space-y-6 text-neutral/50 text-xl font-light leading-relaxed">
              <p>
                Great design is more than an aesthetic choice—it’s a business strategy. We merge artistic expression with functional engineering.
              </p>
            </div>
          </motion.div>

          {/* Fixed-Twitch Image Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={viewportSettings}
            transition={fluidTransition}
            className="relative w-full h-[550px] rounded-[3rem] overflow-hidden border border-neutral/10 bg-neutral/5"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
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

        {/* --- SERVICES SECTION --- */}
        <div className="mb-40">
          <motion.div 
            {...fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Our <span className="text-neutral/20 italic font-serif font-light">Disciplines</span>
            </h2>
            <div className="h-px flex-1 bg-neutral/10 mx-8 mb-4 hidden md:block" />
            <p className="text-neutral/40 text-xs uppercase tracking-widest font-bold">
              Pixels with purpose.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                viewport={viewportSettings}
                transition={{ ...fluidTransition, delay: index * 0.15 }}
                whileHover={{ 
                  y: -12, 
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(48, 213, 200, 0.3)" 
                }}
                className="group p-12 rounded-[3rem] border border-neutral/5 bg-neutral/[0.01] transition-colors duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center font-bold mb-10 group-hover:bg-primary group-hover:text-background transition-all duration-500 rotate-3 group-hover:rotate-0">
                  {index + 1}
                </div>
                <h3 className="text-3xl font-bold mb-8 tracking-tight">{service.title}</h3>  
        
                <ul className="space-y-5">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex gap-4 items-center text-neutral/40 group-hover:text-neutral/80 transition-colors duration-300 font-light">
                      <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- WHY US SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportSettings}
          className="bg-neutral/[0.02] rounded-[4rem] p-12 lg:p-24 mb-40 border border-neutral/10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-20 tracking-tighter relative z-10">
            Why Choose <span className="text-primary italic font-serif">Zi Creates</span>?
          </h2>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-16 relative z-10">
            {[
              { title: "Human-Centric Design", desc: "We design for people, not pixels. Every choice is guided by empathy and user psychology." },
              { title: "Seamless Integration", desc: "Your designs feel like a natural extension of your brand's existing visual language." },
              { title: "Rapid Iteration", desc: "High-velocity workflows that keep your project moving without sacrificing quality." },
              { title: "Data-Backed", desc: "Informed by conversion principles to ensure your designs actually move the needle." },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <h4 className="text-2xl font-bold tracking-tight flex items-center gap-4">
                  <span className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(48,213,200,0.5)]" />
                  {feature.title}
                </h4>
                <p className="text-neutral/50 font-light leading-relaxed pl-6">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- BOTTOM CTA --- */}
        <motion.div 
          {...fadeUp}
          className="text-center max-w-4xl mx-auto py-24 border-t border-neutral/10"
        >
          <p className="text-3xl md:text-4xl font-light italic text-neutral/30 mb-16 tracking-tight leading-relaxed">
            “Design that doesn’t just look good — <br />
            <span className="text-neutral font-medium not-italic">it solves problems.</span>”
          </p>
          <CTAButton text="Book a Consultation" onClick={onOpenBookCall} />
        </motion.div>
      </div>
    </section>
  );
}