"use client";

import React, { useState } from "react";
import CTAButton from "./CTAButton";
import BookCall from "./BookCall";

interface AIAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAutomationModal = ({ isOpen, onClose }: AIAutomationModalProps) => {
  const [isBookCallOpen, setBookCallOpen] = useState(false);

  if (!isOpen) return null;

  const aiServices = [
    { title: "Custom AI Agents", desc: "Tailored agents designed around your specific business rules." },
    { title: "Workflow Automation", desc: "Intelligent systems connecting all your favorite tools." },
    { title: "Content Pipelines", desc: "Scaling your marketing output with AI-powered production." },
    { title: "Predictive Analytics", desc: "Turning data into actionable insights for better decisions." },
    { title: "Operational Scaling", desc: "Reducing manual tasks to focus your team on high-value work." },
    { title: "Tool Integration", desc: "Seamlessly weaving AI into your existing software stack." }
  ];

  return (
    <>
      <div className="fixed inset-0 z-[110] bg-background/80 backdrop-blur-xl flex items-center justify-center p-4">
        {/* Click outside to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <div className="relative bg-background border border-neutral/10 text-neutral w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8 md:p-16 shadow-2xl animate-in fade-in zoom-in duration-300">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-10 text-neutral/40 hover:text-primary transition-colors text-2xl"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary mb-4 block">Future-Proof Operations</span>
            <h2 className="text-[36px] md:text-[52px] font-bold leading-tight mb-6">
              AI <span className="text-primary">Automation</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral/70 font-light leading-relaxed">
              Efficiency is the ultimate competitive advantage. We design and deploy 
              <span className="text-neutral font-medium"> bespoke AI systems </span> 
              that streamline operations and scale your business faster than ever.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {aiServices.map((service, i) => (
              <div key={i} className="p-6 rounded-2xl bg-neutral/5 border border-neutral/5 hover:border-primary/30 transition-all duration-300">
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-neutral/60 text-sm font-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Value Prop Section */}
          <div className="flex flex-col md:flex-row gap-12 items-center pt-12 border-t border-neutral/10">
            <div className="flex-1 space-y-4">
              <h4 className="text-2xl font-bold">Intelligent, Human-First Systems.</h4>
              <p className="text-neutral/60 font-light leading-relaxed">
                Zi Creates builds intelligent systems that save time and reduce errors, 
                letting your team focus on innovation while we automate the repetitive 
                heavy lifting.
              </p>
            </div>
            
            <div className="shrink-0">
              <CTAButton text="Book a Call" onClick={() => setBookCallOpen(true)} />
            </div>
          </div>
        </div>
      </div>

      {/* Nested BookCall modal */}
      <BookCall isOpen={isBookCallOpen} onClose={() => setBookCallOpen(false)} />
    </>
  );
};

export default AIAutomationModal;