"use client";

import React from "react";
import CTAButton from "./CTAButton"; // Import your component

interface PartnerAffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PartnerAffiliateModal = ({ isOpen, onClose }: PartnerAffiliateModalProps) => {
  if (!isOpen) return null;

  const handlePartnerClick = () => {
    window.location.href = "mailto:partners@zicreates.com";
  };

  const benefits = [
    { title: "Earn Commissions", desc: "Competitive referral rewards for every client you bring in." },
    { title: "Grow Your Network", desc: "Expand your service offerings by partnering with a trusted agency." },
    { title: "Exclusive Resources", desc: "Access to marketing materials, training, and dedicated support." },
    { title: "Simple Payouts", desc: "Transparent tracking and reliable payouts so you can focus on growth." },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-background border border-neutral/10 text-neutral w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-8 md:p-16 shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-neutral/50 hover:text-primary transition-colors text-2xl"
          aria-label="Close Modal"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-12">
          <span className="uppercase tracking-widest text-xs font-bold text-primary mb-4 block">Collaboration</span>
          <h2 className="text-[32px] md:text-[48px] font-bold leading-tight">
            Partner & <span className="text-primary">Affiliate Program</span>
          </h2>
          <p className="text-lg text-neutral/60 font-light mt-6 max-w-2xl">
            At Zi Creates, we reward individuals and businesses who share our passion for exceptional branding and digital growth.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, i) => (
            <div key={i} className="group p-6 rounded-2xl bg-neutral/5 border border-neutral/5 hover:border-primary/20 transition-all">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {benefit.title}
              </h3>
              <p className="text-neutral/60 text-sm font-light leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Who Should Join Section */}
        <div className="bg-neutral/5 p-8 rounded-2xl mb-12 border border-neutral/5">
          <h3 className="text-xl font-bold mb-6">Who is this for?</h3>
          <div className="flex flex-wrap gap-3">
            {["Freelancers", "Consultants", "Marketing Agencies", "Influencers", "Business Coaches"].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-neutral/10 text-sm font-light bg-background">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-neutral/10">
          <p className="text-neutral/70 font-light text-center md:text-left">
            Ready to grow with us? Reach out to start your partnership.
          </p>
          <CTAButton text="Become a Partner" onClick={handlePartnerClick} />
        </div>
      </div>
    </div>
  );
};

export default PartnerAffiliateModal;