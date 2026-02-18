"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

interface AIAutomationProps {
  onOpenBookCall: () => void;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

export default function AIAutomation({ onOpenBookCall }: AIAutomationProps) {
  const pillars = [
    {
      title: "Custom AI Agents & Crews",
      text: "Specialized digital workers that qualify leads, monitor trends, and operate as scalable extensions of your team.",
    },
    {
      title: "Intelligent Workflow Automation",
      text: "We connect your CRM, email, Slack, and project tools into one self-running operational engine.",
    },
    {
      title: "AI-Powered Content Pipelines",
      text: "Automated systems that transform one idea into SEO blogs, social kits, and video scripts in seconds.",
    },
    {
      title: "Predictive Data & Analytics",
      text: "AI-driven insights that reveal customer behavior, search trends, and next-best-action strategies.",
    },
    {
      title: "AI Strategy & Consulting",
      text: "Operational audits to identify high-impact automation opportunities that drive revenue and save time.",
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
              AI Automation
            </span>

            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tighter">
              Scaling Your Business at the Speed of{" "}
              <span className="text-primary italic font-serif font-light">Thought</span>
            </h1>

            <div className="space-y-6 text-neutral/60 text-lg font-light leading-relaxed">
              <p>
                Efficiency is the ultimate competitive advantage. AI isn’t about
                replacing teams—it’s about freeing them.
              </p>
              <p>
                At <strong className="text-neutral font-semibold">Zi Creates</strong>, 
                we build bespoke AI Automation systems that work while you sleep, 
                allowing your team to focus on strategy, creativity, and growth.
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
            <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-neutral/10 bg-neutral/5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
              >
                <Image
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80"
                  alt="AI automation and digital intelligence systems"
                  fill
                  className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
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
              Our AI <span className="text-neutral/30 font-light italic">Pillars</span>
            </h2>
            <div className="h-[1px] flex-1 bg-neutral/10 mx-8 mb-4 hidden md:block" />
            <p className="text-neutral/40 md:max-w-xs text-sm uppercase tracking-widest font-bold">
              Beyond bots. Built for outcomes.
            </p>
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
                className="group p-10 rounded-[2.5rem] border border-neutral/10 bg-neutral/[0.03] transition-colors duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-8 group-hover:bg-primary group-hover:text-background transition-all duration-500">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-neutral/50 leading-relaxed font-light text-sm">
                  {item.text}
                </p>
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
          className="bg-neutral/[0.03] rounded-[3rem] p-12 lg:p-20 mb-32 border border-neutral/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-16 tracking-tighter">
            Why Partner with <span className="text-primary">Zi Creates</span>?
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 relative z-10">
            {[
              {
                title: "Human-First Hybrid Model",
                desc: "We design AI to handle the grunt work while humans focus on creativity and innovation.",
              },
              {
                title: "Rapid Deployment & Iteration",
                desc: "Custom automations go live in weeks, not months, with continuous refinement.",
              },
              {
                title: "Security & Governance Built-In",
                desc: "Enterprise-grade privacy, compliance, and data protection at every layer.",
              },
              {
                title: "Seamless Creative Integration",
                desc: "AI-generated outputs align perfectly with your brand voice and visual identity.",
              },
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
                  <p className="text-neutral/50 font-light leading-relaxed text-sm">
                    {feature.desc}
                  </p>
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
            “The future belongs to businesses that <span className="text-neutral/90">automate intelligently</span>.”
          </p>

          <CTAButton
            text="Automate My Business"
            onClick={onOpenBookCall}
          />
        </motion.div>
      </div>
    </section>
  );
}