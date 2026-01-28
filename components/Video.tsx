"use client";

import React from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";

interface VideoMotionDesignProps {
  onOpenBookCall: () => void;
}

export default function VideoMotionDesign({
  onOpenBookCall,
}: VideoMotionDesignProps) {
  const ecosystem = [
    {
      title: "Cinematic Video Production",
      items: [
        "Brand Stories & Mini-Documentaries",
        "High-Conversion Commercials",
        "Customer Testimonial Films",
      ],
    },
    {
      title: "High-End Motion Design (2D & 3D)",
      items: [
        "Logo & Identity Animation",
        "UI/UX Motion Graphics",
        "Social Motion Assets (Reels, TikTok, Stories)",
      ],
    },
    {
      title: "Animated Explainer Videos",
      items: [
        "Concept Simplification",
        "SaaS & Tech Demos",
        "Onboarding & Training Videos",
      ],
    },
  ];

  return (
    <section className="bg-background text-neutral py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* --- Intro Section --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8 max-w-xl">
            <span className="uppercase tracking-widest text-sm font-bold text-primary/80">
              Video Production & Motion Design
            </span>

            <h1 className="text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
              Stories That Move at the{" "}
              <span className="text-primary">Speed of Culture</span>
            </h1>

            <p>
              Static content has its place, but video has the power to move. We
              combine cinematic storytelling with cutting-edge motion design to
              create videos that don’t just get views — they get results.
            </p>

            <p>
              In a world of shrinking attention spans,{" "}
              <strong className="text-neutral font-semibold">
                Zi Creates
              </strong>{" "}
              builds visual hooks that keep your audience watching until the
              final frame.
            </p>
          </div>

          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-neutral/10">
            <Image
              src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1600&q=80"
              alt="Video production and motion design setup"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>

        {/* --- Ecosystem Section --- */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <h2 className="text-4xl font-bold max-w-md">
              Our Video & Animation Ecosystem
            </h2>
            <div className="h-[1px] flex-1 bg-neutral/20 mx-8 mb-4 hidden md:block" />
            <p className="text-neutral/50 md:max-w-xs font-medium">
              From concept to final frame — fully in-house.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecosystem.map((block, index) => (
              <div
              key={index}
              className="group p-8 rounded-2xl border border-neutral/10 bg-neutral/5 hover:bg-neutral/10 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-6 group-hover:bg-primary group-hover:text-background transition-colors">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-4">{block.title}</h3>
              
                <ul className="space-y-3 text-neutral/70 font-light">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- Why Choose Us --- */}
        <div className="bg-primary/5 rounded-[40px] p-12 lg:p-20 mb-32 border border-primary/10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-16">
            Why Choose Zi Creates for Video?
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Strategy-Driven Storytelling",
                desc: "We start with the goal, not the camera. Every script and transition is engineered to hit real KPIs.",
              },
              {
                title: "Motion-First Philosophy",
                desc: "Motion is baked into your brand DNA, ensuring consistency across platforms and formats.",
              },
              {
                title: "All-in-One Creative Engine",
                desc: "From strategy to sound design — no vendors, no friction, no compromises.",
              },
              {
                title: "Optimized for Performance",
                desc: "Platform-native formats, captions, and Video SEO ensure maximum reach and engagement.",
              },
            ].map((feature, i) => (
              <div key={i} className="flex gap-6">
                <div className="mt-1.5 h-3 w-3 rounded-full bg-primary shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-xl font-bold">{feature.title}</h4>
                  <p className="text-neutral/70 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Bottom CTA --- */}
        <div className="text-center max-w-3xl mx-auto py-12 border-t border-neutral/10">
          <p className="text-2xl font-light italic text-neutral/90 mb-12">
            “If it doesn’t move people, it doesn’t work.”
          </p>

          <CTAButton
            text="Book a Strategy Call"
            onClick={onOpenBookCall}
          />
        </div>
      </div>
    </section>
  );
}
