"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

interface DigitalMarketingProps {
  onOpenBookCall: () => void;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

export default function DigitalMarketing({ onOpenBookCall }: DigitalMarketingProps) {
  const services = [
    {
      title: "Paid Advertising (PPC & Social Ads)",
      text: "High-intent campaigns on Google, Meta, and LinkedIn that stop the scroll and win the click. Retargeting ensures leads return to convert.",
    },
    {
      title: "High-Performance Email Marketing",
      text: "Automated drip sequences, data-driven newsletters, and cart abandonment recovery campaigns that reclaim revenue.",
    },
    {
      title: "Content & Social Management",
      text: "Growth-focused content calendars, community engagement, and platform-specific strategy to turn channels into communities.",
    },
    {
      title: "Holistic Growth Strategy",
      text: "Premium deep-dive sessions to align campaigns with long-term business goals, turning marketing spend into measurable ROI.",
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
              Digital Marketing
            </span>

            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tighter">
              Performance Growth Powered by <br />
              <span className="text-primary italic font-serif font-light">Creativity</span>
            </h1>

            <div className="space-y-6 text-neutral/60 text-lg font-light leading-relaxed">
              <p>
                Traffic is easy. Growth is hard. At Zi Creates, we build integrated
                marketing ecosystems that find your ideal customers and turn them into lifelong brand advocates.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={fluidTransition}
            className="relative w-full h-[450px] rounded-[2rem] overflow-hidden border border-neutral/10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="w-full h-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1600&q=80"
                alt="Digital marketing strategy"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* --- Services Pillars --- */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter max-w-md">
              Growth <span className="text-neutral/30 font-light italic font-serif">Channels</span>
            </h2>
            <div className="h-[1px] flex-1 bg-neutral/10 mx-8 mb-4 hidden md:block" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...fluidTransition, delay: index * 0.1 }}
                /* FIXED: Border always exists at border-neutral/5 to prevent twitch */
                whileHover={{ 
                  y: -8, 
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  borderColor: "rgba(48, 213, 200, 0.4)" 
                }}
                className="group p-10 rounded-[2.5rem] border border-neutral/5 bg-neutral/[0.02] transition-colors duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-8 group-hover:bg-primary group-hover:text-background transition-all duration-500">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-neutral/50 leading-relaxed font-light text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Why Choose Us --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={fluidTransition}
          className="bg-neutral/[0.02] rounded-[3rem] p-12 lg:p-20 mb-32 border border-neutral/10"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-16 tracking-tighter">
            Why Choose <span className="text-primary">Zi Creates</span>?
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                title: "Creative-Performance Synergy",
                desc: "We combine world-class design with data to optimize conversion and ROI.",
              },
              {
                title: "Integrated Ecosystem",
                desc: "Paid ads, SEO landing pages, and AI-driven sequences work together seamlessly.",
              },
              {
                title: "Data Over Guesswork",
                desc: "Every campaign is tracked, analyzed, and optimized in real-time.",
              },
              {
                title: "High-Velocity Execution",
                desc: "We launch, test, and scale faster than the competition to maximize growth.",
              },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-xl font-bold tracking-tight">{feature.title}</h4>
                  <p className="text-neutral/50 font-light leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- Bottom CTA --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center max-w-3xl mx-auto py-12 border-t border-neutral/5"
        >
          <p className="text-2xl md:text-3xl font-light italic text-neutral/40 mb-12 tracking-tight">
            “Growth is not luck—it’s strategy, <span className="text-neutral/90">design, and execution</span>.”
          </p>

          <CTAButton
            text="Start My Growth Plan"
            onClick={onOpenBookCall}
          />
        </motion.div>
      </div>
    </section>
  );
}