"use client";

import React from "react";
import CTAButton from "./CTAButton";

interface PartnerAffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HEADER_HEIGHT = 120; // px

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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-[2rem] bg-background border border-neutral/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* 🔒 FIXED HEADER */}
        <div
          className="absolute top-0 left-0 right-0 z-30 bg-background border-b border-neutral/10 px-6 md:px-12 pt-6 pb-5 flex items-start justify-between"
          style={{ height: HEADER_HEIGHT }}
        >
          <div>
            <span className="uppercase tracking-widest text-xs font-bold text-primary block mb-2">
              Collaboration
            </span>
            <h2 className="text-[24px] md:text-[36px] font-bold leading-tight">
              Partner & <span className="text-primary">Affiliate Program</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-neutral/50 hover:text-primary transition-colors text-2xl leading-none"
            aria-label="Close Modal"
          >
            ✕
          </button>
        </div>

        {/* 📜 SCROLLABLE BODY */}
        <div
          className="overflow-y-auto px-6 md:px-12 pb-16"
          style={{
            paddingTop: HEADER_HEIGHT + 24,
            maxHeight: "90vh",
          }}
        >
          <p className="text-lg text-neutral/60 font-light max-w-2xl">
            At Zi Creates, we reward individuals and businesses who share our passion
            for exceptional branding and digital growth.
          </p>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 gap-8 my-12">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-neutral/5 border border-neutral/5 hover:border-primary/20 transition-all"
              >
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

          {/* Who is this for */}
          <div className="bg-neutral/5 p-8 rounded-2xl mb-12 border border-neutral/5">
            <h3 className="text-xl font-bold mb-6">Who is this for?</h3>
            <div className="flex flex-wrap gap-3">
              {["Freelancers", "Consultants", "Marketing Agencies", "Influencers", "Business Coaches"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-neutral/10 text-sm font-light bg-background"
                >
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
    </div>
  );
};

export default PartnerAffiliateModal;
