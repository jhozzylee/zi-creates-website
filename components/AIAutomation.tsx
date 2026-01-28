"use client";

import React from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";

interface AIAutomationProps {
  onOpenBookCall: () => void;
}

export default function AIAutomation({ onOpenBookCall }: AIAutomationProps) {
  const pillars = [
    {
      title: "Custom AI Agents & Crews",
      text: "Specialized digital workers that qualify leads, monitor trends, and operate as scalable extensions of your team.",
    },
    {
      title: "Intelligent Workflow Automation",
      text: "We connect your CRM, email, Slack, and project tools into one self-running operational engine.",
    },
    {
      title: "AI-Powered Content Pipelines",
      text: "Automated systems that transform one idea into SEO blogs, social kits, and video scripts in seconds.",
    },
    {
      title: "Predictive Data & Analytics",
      text: "AI-driven insights that reveal customer behavior, search trends, and next-best-action strategies.",
    },
    {
      title: "AI Strategy & Consulting",
      text: "Operational audits to identify high-impact automation opportunities that drive revenue and save time.",
    },
  ];

  return (
    <section className="bg-background text-neutral py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* --- Intro Section --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8 max-w-xl">
            <span className="uppercase tracking-widest text-sm font-bold text-primary/80">
              AI Automation
            </span>

            <h1 className="text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
              Scaling Your Business at the Speed of{" "}
              <span className="text-primary">Thought</span>
            </h1>

            <p>
              Efficiency is the ultimate competitive advantage. AI isn’t about
              replacing teams—it’s about freeing them.
            </p>

            <p>
              At{" "}
              <strong className="text-neutral font-semibold">
                Zi Creates
              </strong>
              , we build bespoke AI Automation systems that work while you sleep,
              allowing your team to focus on strategy, creativity, and growth.
            </p>
          </div>

          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-neutral/10">
            <Image
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80"
              alt="AI automation and digital intelligence systems"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>

        {/* --- Pillars Section --- */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <h2 className="text-4xl font-bold max-w-md">
              Our AI Automation Pillars
            </h2>
            <div className="h-[1px] flex-1 bg-neutral/20 mx-8 mb-4 hidden md:block" />
            <p className="text-neutral/50 md:max-w-xs font-medium">
              Beyond bots. Built for business outcomes.
            </p>
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
                <p className="text-neutral/70 leading-relaxed font-light">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Why Choose Us --- */}
        <div className="bg-primary/5 rounded-[40px] p-12 lg:p-20 mb-32 border border-primary/10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-16">
            Why Choose Zi Creates for AI Automation?
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Human-First Hybrid Model",
                desc: "We design AI to handle the grunt work while humans focus on creativity and innovation.",
              },
              {
                title: "Rapid Deployment & Iteration",
                desc: "Custom automations go live in weeks, not months, with continuous refinement.",
              },
              {
                title: "Security & Governance Built-In",
                desc: "Enterprise-grade privacy, compliance, and data protection at every layer.",
              },
              {
                title: "Seamless Creative Integration",
                desc: "AI-generated outputs align perfectly with your brand voice and visual identity.",
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
            “The future belongs to businesses that automate intelligently.”
          </p>

          <CTAButton
            text="Automate My Business"
            onClick={onOpenBookCall}
          />
        </div>
      </div>
    </section>
  );
}
