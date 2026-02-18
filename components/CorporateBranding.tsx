"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

interface CorporateBrandingProps {
  onOpenBookCall: () => void;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

export default function CorporateBranding({ onOpenBookCall }: CorporateBrandingProps) {
  const pillars = [
    {
      title: "Brand Strategy & Positioning",
      text: `We dive deep into your "Why." We analyze your competitors and identify the unique gap in the market that only your business can fill.`,
    },
    {
      title: "Visual Identity Systems",
      text: `From iconic logo marks to custom-curated color psychology and typography, we create a visual language that speaks first.`,
    },
    {
      title: "Brand Voice & Messaging",
      text: `We define how your brand sounds—bold disruptor or trusted advisor—crafting a consistent tone across all platforms.`,
    },
    {
      title: "Brand Guidelines",
      text: `A complete Brand Bible ensuring consistency across print, digital, social, and future brand extensions.`,
    },
    {
      title: "Collateral & Touchpoints",
      text: `Business cards, pitch decks, and brand environments—every touchpoint aligned into one seamless experience.`,
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
            className="space-y-8"
          >
            <span className="uppercase tracking-[0.4em] text-[11px] font-bold text-primary">Corporate Branding</span>
            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tighter">
              Building Identities That <br />
              <span className="text-primary italic font-serif font-light">Command Authority</span>
            </h1>
            <div className="space-y-6 text-neutral/60 text-lg font-light leading-relaxed max-w-xl">
              <p>
                A brand is more than a logo—it is the soul of your business. It’s the
                gut feeling a customer has when they hear your name.
              </p>
              <p>
                At <strong className="text-neutral font-semibold">Zi Creates</strong>, we specialize in Corporate Branding
                that transforms businesses into industry leaders through intentional
                design and psychological strategy.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...fluidTransition, delay: 0.2 }}
            className="relative w-full h-[450px] group"
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-neutral/10 bg-neutral/5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
              >
                <Image
                  src="https://images.unsplash.com/photo-1559028012-481c04fa702d"
                  alt="Corporate branding strategy session"
                  fill
                  className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* --- Pillars Section --- */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter max-w-md">
              Identity <span className="text-neutral/30 font-light italic font-serif">Pillars</span>
            </h2>
            <div className="h-[1px] flex-1 bg-neutral/10 mx-8 mb-4 hidden md:block"></div>
            <p className="text-neutral/40 md:max-w-xs text-sm uppercase tracking-widest font-bold">The foundation of authority.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...fluidTransition, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(48, 213, 200, 0.4)" 
                }}
                className="group p-10 rounded-[2.5rem] border border-neutral/10 bg-neutral/[0.02] transition-colors duration-500"
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

        {/* --- Why Us Grid --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={fluidTransition}
          className="bg-neutral/[0.02] rounded-[3rem] p-12 lg:p-20 mb-32 border border-neutral/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-16 tracking-tighter">
            Why Partner with <span className="text-primary">Zi Creates</span>?
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 relative z-10">
            {[
              { title: "Strategy-First Design", desc: "Design without strategy is just art. Every decision we make is rooted in market data and consumer behavior." },
              { title: "Radical Consistency", desc: "Consistency builds trust. We ensure your brand is recognizable even without a logo." },
              { title: "Scalable Foundations", desc: "We build for where you’re going. Our systems grow with your business as you expand." },
              { title: "True Partnership", desc: "Work directly with creative strategists who treat your brand like their own—no shortcuts." }
            ].map((feature, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
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
            “Your brand is the single most important investment you can make in
            your business.”
          </p>

          <CTAButton text="Book a Strategy Call" onClick={onOpenBookCall} />
        </motion.div>
      </div>
    </section>
  );
}