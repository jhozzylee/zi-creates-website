"use client";

import React from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";

interface DigitalMarketingProps {
  onOpenBookCall: () => void;
}

export default function DigitalMarketing({ onOpenBookCall }: DigitalMarketingProps) {
  const services = [
    {
      title: "Paid Advertising (PPC & Social Ads)",
      text: "High-intent campaigns on Google, Meta, and LinkedIn that stop the scroll and win the click. Retargeting ensures leads return to convert.",
    },
    {
      title: "High-Performance Email Marketing",
      text: "Automated drip sequences, data-driven newsletters, and cart abandonment recovery campaigns that reclaim revenue and nurture loyalty.",
    },
    {
      title: "Strategic Content & Social Media Management",
      text: "Growth-focused content calendars, community engagement, and platform-specific strategy to turn social channels into brand communities.",
    },
    {
      title: "Holistic Growth Strategy",
      text: "Premium deep-dive sessions to align campaigns with long-term business goals, turning every marketing dollar into measurable ROI.",
    },
  ];

  return (
    <section className="bg-background text-neutral py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* --- Intro Section --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8 max-w-xl">
            <span className="uppercase tracking-widest text-sm font-bold text-primary/80">
              Digital Marketing
            </span>

            <h1 className="text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
              Performance-Driven Growth Powered by <span className="text-primary">Creativity</span>
            </h1>

            <p>
              Traffic is easy. Growth is hard. At Zi Creates, we build integrated
              marketing ecosystems that find your ideal customers, tell them a
              compelling story, and turn them into lifelong brand advocates.
            </p>

            <p>
              By combining high-end visual storytelling with precision-targeted
              data, we ensure your brand doesn't just join the conversation—it leads it.
            </p>
          </div>

          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-neutral/10">
            <Image
              src="https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1600&q=80"
              alt="Digital marketing and data-driven growth"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>

        {/* --- Services Pillars --- */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <h2 className="text-4xl font-bold max-w-md">
              Our Multi-Channel Marketing Services
            </h2>
            <div className="h-[1px] flex-1 bg-neutral/20 mx-8 mb-4 hidden md:block" />
            <p className="text-neutral/50 md:max-w-xs font-medium">
              Turning channels into a unified growth engine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, index) => (
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

        {/* --- Why Choose Us --- */}
        <div className="bg-primary/5 rounded-[40px] p-12 lg:p-20 mb-32 border border-primary/10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-16">
            Why Choose Zi Creates for Marketing?
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Creative-Performance Synergy",
                desc: "We combine world-class design with data to optimize conversion and ROI.",
              },
              {
                title: "Integrated Ecosystem (The Growth Plan)",
                desc: "Paid ads, SEO landing pages, and AI-driven sequences all work together seamlessly.",
              },
              {
                title: "Data Over Guesswork",
                desc: "Every campaign is tracked, analyzed, and optimized in real-time with transparent reporting.",
              },
              {
                title: "High-Velocity Execution",
                desc: "We launch, test, and scale campaigns faster than the competition to maximize growth.",
              },
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
            “Growth is not luck—it’s strategy, design, and execution combined.”
          </p>

          <CTAButton
            text="Start My Growth Plan"
            onClick={onOpenBookCall}
          />
        </div>
      </div>
    </section>
  );
}
