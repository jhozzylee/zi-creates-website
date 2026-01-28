"use client";

import React from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";

interface GraphicProductDesignProps {
  onOpenBookCall: () => void;
}

export default function GraphicProductDesign({
  onOpenBookCall,
}: GraphicProductDesignProps) {
  const services = [
    {
      title: "High-Impact Graphic Design",
      items: [
        "Social Media Creative (Instagram, LinkedIn, X)",
        "Marketing & Sales Collateral",
        "Infographics & Data Visualization",
        "Advertising Creative (Digital & Outdoor)",
      ],
    },
    {
      title: "Strategic Product Design (UI/UX)",
      items: [
        "User Interface (UI) Design",
        "User Experience (UX) Strategy",
        "Prototyping & Interaction Design",
        "Packaging & Physical Product Design",
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
              Graphic & Product Design
            </span>

            <h1 className="text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
              Crafting Visuals That{" "}
              <span className="text-primary">Solve Problems</span>
            </h1>

            <p>
              Great design is more than an aesthetic choice—it’s a business
              strategy. We merge artistic expression with functional engineering
              to create designs that capture attention and drive engagement.
            </p>

            <p>
              At{" "}
              <strong className="text-neutral font-semibold">
                Zi Creates
              </strong>
              , every visual is intentional, scalable, and built to perform
              across digital and physical touchpoints.
            </p>
          </div>

          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-neutral/10">
            <Image
              src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=80"
              alt="Graphic and product design workflow"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>

        {/* --- Services Section --- */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <h2 className="text-4xl font-bold max-w-md">
              Our Multi-Disciplinary Design Services
            </h2>
            <div className="h-[1px] flex-1 bg-neutral/20 mx-8 mb-4 hidden md:block" />
            <p className="text-neutral/50 md:max-w-xs font-medium">
              Where creativity meets usability and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
              key={index}
              className="group p-8 rounded-2xl border border-neutral/10 bg-neutral/5 hover:bg-neutral/10 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-6 group-hover:bg-primary group-hover:text-background transition-colors">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>  
      
                <ul className="space-y-3 text-neutral/70 font-light">
                  {service.items.map((item, i) => (
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

        {/* --- Why Us Section --- */}
        <div className="bg-primary/5 rounded-[40px] p-12 lg:p-20 mb-32 border border-primary/10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-16">
            Why Choose Zi Creates for Design?
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Human-Centric Design",
                desc: "We design for people, not pixels. Every choice is guided by empathy, usability, and clarity.",
              },
              {
                title: "Seamless Brand Integration",
                desc: "Your designs feel like a natural extension of your brand—not disconnected assets.",
              },
              {
                title: "Rapid Iteration & Delivery",
                desc: "High-velocity workflows that keep you ahead without sacrificing quality.",
              },
              {
                title: "Data-Backed Creativity",
                desc: "Informed by CRO principles and visual hierarchy to ensure beauty and performance.",
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
            “Design that doesn’t just look good — it works.”
          </p>

          <CTAButton
            text="Book a Consultation"
            onClick={onOpenBookCall}
          />
        </div>
      </div>
    </section>
  );
}
