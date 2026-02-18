"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import CTAButton from "./CTAButton";

interface WebsiteDevelopmentProps {
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

export default function WebsiteDevelopment({ onOpenBookCall }: WebsiteDevelopmentProps) {
  const capabilities = [
    {
      title: "Custom Responsive Design",
      items: ["Mobile-first screen adaptation", "Conversion-focused UI systems", "Accessible, modern patterns"],
    },
    {
      title: "E-Commerce Excellence",
      items: ["Shopify & Custom builds", "Cart optimization flows", "Payment system integration"],
    },
    {
      title: "Headless CMS Solutions",
      items: ["Webflow & CMS architecture", "Fast, secure deployments", "Easy internal updates"],
    },
    {
      title: "Web Apps & SaaS",
      items: ["UI/UX-driven applications", "Functional MVPs", "Problem-solving interfaces"],
    },
    {
      title: "Performance Engine",
      items: ["Core Web Vitals optimization", "Clean, SEO-friendly code", "Next-gen load speeds"],
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
              Full-Stack Development
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tighter">
              Digital Hubs for <br />
              <span className="text-primary italic font-serif font-light">Modern Brands</span>
            </h1>

            <div className="space-y-6 text-neutral/50 text-xl font-light leading-relaxed">
              <p>
                Your website is your 24/7 salesperson. We develop fast, secure, and conversion-driven experiences engineered to turn traffic into revenue.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={fluidTransition}
            className="relative w-full h-[550px] rounded-[3rem] overflow-hidden border border-neutral/10 group bg-neutral/5"
          >
            <Image
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
              alt="Code and development workspace"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
              priority
            />
            {/* Terminal-style overlay for tech vibes */}
            <div className="absolute bottom-8 left-8 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-neutral/10 font-mono text-[10px] text-primary/70">
              <p>{"{ status: 'ready', engine: 'Next.js' }"}</p>
            </div>
          </motion.div>
        </div>

        {/* --- CAPABILITIES SECTION --- */}
        <div className="mb-40">
          <motion.div 
            {...fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Core <span className="text-neutral/20 italic font-serif font-light">Capabilities</span>
            </h2>
            <div className="h-px flex-1 bg-neutral/10 mx-8 mb-4 hidden md:block" />
            <p className="text-neutral/40 text-xs uppercase tracking-widest font-bold">
              Scalable by design.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((block, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="initial"
                whileInView="whileInView"
                viewport={viewportSettings}
                transition={{ ...fluidTransition, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(48, 213, 200, 0.4)" 
                }}
                className="group p-10 rounded-[2.5rem] border border-neutral/5 bg-neutral/[0.01] transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-mono text-sm mb-8 group-hover:bg-primary group-hover:text-background transition-all duration-500">
                  0{index + 1}
                </div>
                
                <h3 className="text-2xl font-bold mb-6 tracking-tight">
                  {block.title}
                </h3>

                <ul className="space-y-4 text-neutral/40 group-hover:text-neutral/70 transition-colors font-light text-sm">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(48,213,200,0.6)]" />
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          className="bg-neutral/[0.02] rounded-[4rem] p-12 lg:p-24 mb-40 border border-neutral/10 relative overflow-hidden"
        >
          {/* Subtle Grid Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #30D5C8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <h2 className="text-4xl lg:text-5xl font-bold mb-20 tracking-tighter relative z-10">
            Engineered for <span className="text-primary italic font-serif">Impact</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-16 relative z-10">
            {[
              { title: "SEO-First Architecture", desc: "Clean code and semantic HTML optimized for Google crawlers from the very first line." },
              { title: "Subscribe & Ship", desc: "Our workflow is built for velocity. No development hell—just constant progress." },
              { title: "Strategy-Led UI/UX", desc: "Guided by behavioral psychology to place elements exactly where they drive action." },
              { title: "Technical Partnership", desc: "We don't just hand off files; we stay on as your technical consultants and support." },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={viewportSettings}
                className="space-y-4"
              >
                <h4 className="text-2xl font-bold tracking-tight">{feature.title}</h4>
                <p className="text-neutral/50 font-light leading-relaxed pl-6 border-l border-primary/20">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- BOTTOM CTA --- */}
        <motion.div 
          {...fadeUp}
          className="text-center max-w-4xl mx-auto py-24 border-t border-neutral/10"
        >
          <p className="text-3xl md:text-4xl font-light italic text-neutral/30 mb-16 tracking-tight">
            “Your website should work harder than <br />
            <span className="text-neutral font-medium not-italic">any salesperson.</span>”
          </p>

          <CTAButton text="Build My Website" onClick={onOpenBookCall} />
        </motion.div>
      </div>
    </section>
  );
}