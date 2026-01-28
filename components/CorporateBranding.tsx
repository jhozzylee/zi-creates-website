"use client";

import React from "react";
import Image from "next/image";
import CTAButton from "./CTAButton"; // Importing your existing component

interface CorporateBrandingProps {
  onOpenBookCall: () => void;
}

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
    <section className="bg-background text-neutral py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        
        {/* --- Intro Section --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <span className="uppercase tracking-widest text-sm font-bold text-primary/80">Corporate Branding</span>
            <h1 className="text-3xl lg:text-5xl  font-bold leading-[1.1] tracking-tight">
              Building Identities That <span className="text-primary">Command Authority</span>
            </h1>
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

          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-neutral/10">
            <Image
              src="https://images.unsplash.com/photo-1559028012-481c04fa702d"
              alt="Corporate branding strategy session"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>

        {/* --- Pillars Section --- */}
        <div className="mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <h2 className="text-4xl font-bold max-w-md">Our Corporate Branding Pillars</h2>
            <div className="h-[1px] flex-1 bg-neutral/20 mx-8 mb-4 hidden md:block"></div>
            <p className="text-neutral/50 md:max-w-xs font-medium">The foundational elements of every brand we build.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((item, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-neutral/10 bg-neutral/5 hover:bg-neutral/10 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-6 group-hover:bg-primary group-hover:text-background transition-colors">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-neutral/70 leading-relaxed font-light">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Why Us Grid --- */}
        <div className="bg-primary/5 rounded-[40px] p-12 lg:p-20 mb-32 border border-primary/10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-16">Why Choose Zi Creates?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { title: "Strategy-First Design", desc: "Design without strategy is just art. Every decision we make is rooted in market data and consumer behavior." },
              { title: "Radical Consistency", desc: "Consistency builds trust. We ensure your brand is recognizable even without a logo." },
              { title: "Scalable Foundations", desc: "We build for where you’re going. Our systems grow with your business as you expand." },
              { title: "True Partnership", desc: "Work directly with creative strategists who treat your brand like their own—no shortcuts." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-6">
                <div className="mt-1.5 h-3 w-3 rounded-full bg-primary shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-xl font-bold">{feature.title}</h4>
                  <p className="text-neutral/70 font-light leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Bottom CTA --- */}
        <div className="text-center max-w-3xl mx-auto py-12 border-t border-neutral/10">
          <p className="text-2xl font-light italic text-neutral/90 mb-12">
            “Your brand is the single most important investment you can make in
            your business.”
          </p>

          {/* This uses your exact CTAButton component and your trigger function */}
          <CTAButton text="Book a Strategy Call" onClick={onOpenBookCall} />
        </div>
      </div>
    </section>
  );
}