"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// 🔒 Type-safe variants with cubic-bezier easing
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

const Refund = () => {
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
            Financial Terms
          </span>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter">
            Refund <span className="text-neutral/20 italic font-light">Policy</span>
          </h1>
          <p className="mt-6 text-[11px] uppercase tracking-widest text-neutral/40 font-medium">
            Effective Date: 09 August 2025
          </p>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {/* Section 0: Philosophy */}
          <motion.div 
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Philosophy</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg md:text-xl font-light leading-relaxed text-neutral/80">
                At <span className="text-neutral font-medium">Zi Creates</span>, our focus is on the bespoke delivery of high-value creative assets. Due to the intensive nature of our design and development process, we operate under a strict resource-allocation model.
              </p>
            </div>
          </motion.div>

          {/* Section 1: Subscriptions & Projects */}
          <motion.div 
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral/30">01. Service Terms</h2>
            </div>
            <div className="lg:col-span-8 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="p-8 rounded-[2rem] bg-neutral/[0.02] border border-neutral/5">
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider">Membership Plans</h4>
                  <p className="text-sm text-neutral/50 font-light leading-relaxed">
                    Subscription fees are non-refundable once the billing cycle begins. Cancellations must be made 3 business days prior to renewal.
                  </p>
                </div>
                <div className="p-8 rounded-[2rem] bg-neutral/[0.02] border border-neutral/5">
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider">One-Time Projects</h4>
                  <p className="text-sm text-neutral/50 font-light leading-relaxed">
                    A 50% non-refundable deposit is required to secure studio time. Final balances are due upon masterpiece delivery.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Exceptions */}
          <motion.div 
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral/30">02. Exceptions</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="p-8 rounded-[2rem] border border-neutral/10 bg-neutral/[0.02]">
                <p className="text-sm text-neutral/60 font-light mb-6">
                  Refunds are exclusively considered for duplicate payment errors or non-delivery of service where no work has commenced.
                </p>
                <ul className="space-y-4">
                  {[
                    "Requests must be filed within 7 days",
                    "Processing time: 5–10 business days",
                    "Transaction fees are non-refundable"
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={viewportSettings}
                      className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-neutral/40"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Contact */}
          <motion.div 
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral/30">03. Support</h2>
            </div>
            <div className="lg:col-span-8">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="p-8 rounded-[2rem] border border-neutral/10 bg-neutral/[0.02]"
              >
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Financial Inquiries</h4>
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

export default Refund;