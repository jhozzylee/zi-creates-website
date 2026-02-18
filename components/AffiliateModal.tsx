"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CTAButton from "./CTAButton";

interface PartnerAffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 💫 High-End Spring Motion
const fluidTransition = {
  type: "spring" as const,
  damping: 30,
  stiffness: 200,
};

const PartnerAffiliateModal = ({ isOpen, onClose }: PartnerAffiliateModalProps) => {
  const handlePartnerClick = () => {
    window.location.href = "mailto:partners@zicreates.com";
  };

  const benefits = [
    { title: "Recurring Revenue", desc: "Access competitive commission structures for every enterprise client you integrate." },
    { title: "Ecosystem Growth", desc: "Enhance your professional offerings by aligning with our creative engineering systems." },
    { title: "Strategic Resources", desc: "Utilize elite marketing assets and direct engineering support for your referrals." },
    { title: "Seamless Payouts", desc: "Transparent tracking and reliable settlement so you can focus on scaling your network." },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
          {/* --- BACKDROP --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-xl"
          />

          {/* --- MODAL CONTAINER --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={fluidTransition}
            className="relative w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] bg-background border border-neutral/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            
            {/* 🔒 HEADER */}
            <div className="flex items-start justify-between p-8 md:p-12 border-b border-neutral/5">
              <div className="space-y-2">
                <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-primary block">
                  Partnerships
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight">
                  Strategic <span className="text-neutral/20 italic font-serif font-light">Partner Network</span>
                </h2>
              </div>

              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral/5 hover:bg-primary hover:text-background transition-colors"
                aria-label="Close Modal"
              >
                ✕
              </motion.button>
            </div>

            {/* 📜 SCROLLABLE BODY */}
            <div className="overflow-y-auto custom-scrollbar flex-1 p-8 md:p-12 pt-6">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-neutral/40 font-light max-w-2xl leading-relaxed"
              >
                At Zi Creates, we reward leaders who recognize the 
                power of high-performance branding and systemic digital growth.
              </motion.p>

              {/* Benefits Grid */}
              <motion.div 
                initial="initial"
                animate="animate"
                variants={{
                  animate: { transition: { staggerChildren: 0.05 } }
                }}
                className="grid md:grid-cols-2 gap-6 my-16"
              >
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      initial: { opacity: 0, x: -10 },
                      animate: { opacity: 1, x: 0 }
                    }}
                    whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.02)", borderColor: "rgba(48, 213, 200, 0.3)" }}
                    className="p-8 rounded-[2rem] border border-neutral/5 bg-neutral/[0.01] transition-all duration-300 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mb-6 group-hover:scale-150 transition-transform" />
                    <h3 className="text-xl font-bold mb-3 tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral/40 text-sm font-light leading-relaxed group-hover:text-neutral/70 transition-colors">
                      {benefit.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Profiles Section */}
              <div className="bg-neutral/[0.02] p-10 rounded-[2.5rem] border border-neutral/5 mb-12">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral/20 mb-8">Preferred Profiles //</h3>
                <div className="flex flex-wrap gap-4">
                  {["Strategic Consultants", "Marketing Agencies", "Enterprise Coaches", "Industry Leaders", "Solution Architects"].map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.2)" }}
                      className="px-5 py-2.5 rounded-full border border-neutral/10 text-xs font-bold uppercase tracking-widest bg-background transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* 🏷️ FOOTER CTA */}
            <div className="p-8 md:p-12 bg-neutral/[0.02] border-t border-neutral/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <p className="text-neutral/50 font-light text-center md:text-left max-w-sm text-sm">
                Ready to integrate our creative engineering into your business network?
              </p>
              <CTAButton text="Become a Partner" onClick={handlePartnerClick} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PartnerAffiliateModal;