"use client";

import React, { useState } from "react";
import CTAButton from "./CTAButton";
import BookCall from "./BookCall";

interface AIAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HEADER_HEIGHT = 130; // px

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
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Modal Shell */}
        <div className="relative w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] bg-background border border-neutral/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

          {/* 🔒 FIXED HEADER */}
          <div
            className="absolute top-0 left-0 right-0 z-30 bg-background border-b border-neutral/10 px-6 md:px-12 pt-6 pb-6 flex items-start justify-between"
            style={{ height: HEADER_HEIGHT }}
          >
            <div className="max-w-3xl">
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary block mb-2">
                Future-Proof Operations
              </span>
              <h2 className="text-[26px] md:text-[42px] font-bold leading-tight">
                AI <span className="text-primary">Automation</span>
              </h2>
            </div>

            <button
              onClick={onClose}
              className="text-neutral/40 hover:text-primary transition-colors text-2xl leading-none"
              aria-label="Close modal"
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
            {/* Intro */}
            <p className="text-lg md:text-xl text-neutral/70 font-light leading-relaxed max-w-3xl mb-16">
              Efficiency is the ultimate competitive advantage. We design and deploy{" "}
              <span className="text-neutral font-medium">bespoke AI systems</span>{" "}
              that streamline operations and scale your business faster than ever.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {aiServices.map((service, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-neutral/5 border border-neutral/5 hover:border-primary/30 transition-all duration-300"
                >
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-neutral/60 text-sm font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Value Prop */}
            <div className="flex flex-col md:flex-row gap-12 items-center pt-12 border-t border-neutral/10">
              <div className="flex-1 space-y-4">
                <h4 className="text-2xl font-bold">
                  Intelligent, Human-First Systems.
                </h4>
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
      </div>

      {/* Nested BookCall */}
      <BookCall
        isOpen={isBookCallOpen}
        onClose={() => setBookCallOpen(false)}
      />
    </>
  );
};

export default AIAutomationModal;
