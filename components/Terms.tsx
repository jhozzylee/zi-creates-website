"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// 🔒 Type-safe variants with Cubic Bezier easing
const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] as const 
    }
  }
};

const viewportSettings = { once: true, margin: "-50px" };

const Terms = () => {
  return (
    <section className="bg-background text-neutral py-24 md:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32"
        >
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.5em] block mb-4">
            Governance & Ethics
          </span>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter">
            Terms of <span className="text-neutral/20 italic font-light">Service</span>
          </h1>
          <p className="mt-6 text-[11px] uppercase tracking-widest text-neutral/40 font-medium">
            Effective Date: 09 August 2025
          </p>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {/* Section 0: Intro */}
          <motion.div 
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Agreement</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg md:text-xl font-light leading-relaxed text-neutral/80">
                Welcome to <span className="text-neutral font-medium">Zi Creates</span>. By accessing our services, you agree to a partnership built on professional excellence. These terms explain our digital handshake—how we govern our creative synergy and your brand's growth.
              </p>
            </div>
          </motion.div>

          {/* Section 1: Services & Eligibility */}
          <motion.div 
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral/30">01. Service Scope</h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-neutral/[0.02] border border-neutral/5">
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider">Boutique Offerings</h4>
                  <p className="text-sm text-neutral/50 font-light leading-relaxed">Branding, UI/UX design, motion graphics, and digital marketing strategies crafted for scale.</p>
                </div>
                <div className="p-6 rounded-2xl bg-neutral/[0.02] border border-neutral/5">
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider">Eligibility</h4>
                  <p className="text-sm text-neutral/50 font-light leading-relaxed">Clients must be 18+ with the legal authority to enter into a binding creative partnership.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Billing & Assets */}
          <motion.div 
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral/30">02. Billing & Assets</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-4 mb-10">
                {[
                  "Prices listed in USD standard",
                  "Secure third-party payment processing",
                  "Subscription billing cycles are 30-day periods",
                  "Non-refundable service rendering policy"
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={viewportSettings}
                    className="flex items-center gap-4 text-sm font-light text-neutral/60"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <motion.div 
                whileHover={{ x: 5 }}
                className="p-6 rounded-2xl border border-neutral/5 bg-neutral/[0.01]"
              >
                <h4 className="text-[10px] font-bold uppercase tracking-wider mb-2">Intellectual Property</h4>
                <p className="text-xs text-neutral/40 leading-relaxed font-light">
                  Ownership of final deliverables transfers to the client upon full payment, excluding licensed fonts or pre-existing studio tools.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Section 3: Liability & Support */}
          <motion.div 
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral/30">03. Governance</h2>
            </div>
            <div className="lg:col-span-8 space-y-12">
              <p className="text-sm text-neutral/50 font-light leading-relaxed max-w-2xl">
                Zi Creates is not liable for indirect damages or delays beyond our control. We reserve the right to terminate services if payment is overdue or terms are violated.
              </p>
              
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="p-8 rounded-[2rem] border border-neutral/10 bg-neutral/[0.02]"
              >
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Inquiries</h4>
                <a 
                  href="mailto:support@zicreates.com" 
                  className="text-2xl md:text-3xl font-bold tracking-tighter hover:text-primary transition-colors duration-300 block"
                >
                  support@zicreates.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Terms;