"use client";

import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="bg-background text-neutral py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        
        {/* --- Hero Intro --- */}
        <div className="max-w-4xl mb-32">
          <span className="uppercase tracking-[0.2em] text-sm font-bold text-primary/80 mb-6 block">
            Our Purpose
          </span>
          <h1 className="text-[36px] sm:text-[44px] lg:text-[64px] font-bold leading-[1.1] mb-8">
            We engineer intelligent brand systems that <span className="text-primary">drive high velocity growth.</span>
          </h1>
          <p className="text-xl lg:text-2xl font-light leading-relaxed text-neutral/70">
            We believe modern enterprises should not have to choose between elite aesthetics and technical efficiency. 
            Zi Creates transforms your vision into a scalable business asset through precise creative engineering.
          </p>
        </div>

        {/* --- Our Story (The Founders Spotlight) --- */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-40">
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src="https://media.istockphoto.com/id/1488871811/photo/business-people-laptop-and-meeting-in-planning-above-for-web-design-strategy-or-brainstorming.jpg?s=612x612&w=0&k=20&c=tAiRqxqlilEy0QZX535lRvfcNEX1xXN3otVACm5uCIM="
              alt="Team engineering brand systems"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="lg:col-span-5 space-y-6 lg:pl-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Our Story</h2>
            <div className="space-y-4 text-neutral/70 font-light leading-relaxed">
              <p>
                Founded by <strong className="text-neutral font-semibold">John Zidah</strong>, Zi Creates was established to bridge the gap between high level strategy and autonomous execution.
              </p>
              <p>
                We are a collective of architects and visual strategists building the infrastructure for startups and forward thinking industry leaders.
              </p>
              <p className="pt-4 border-t border-neutral/10">
                Think of us as your integrated creative infrastructure designed to ship fast, scale wide, and connect deeply.
              </p>
            </div>
          </div>
        </div>

        {/* --- Our Process (Modern Timeline) --- */}
        <div className="mb-40">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">The Framework</h2>
            <p className="text-neutral/60 font-light italic">Systematic execution refined for high performance brands.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Audit & Architect", 
                desc: "We analyze your brand goals and operational bottlenecks to architect a strategy that merges vision with intelligent automation." 
              },
              { 
                step: "02", 
                title: "Engineer & Automate", 
                desc: "We move beyond static design to build your brand engine by developing the automated systems that bring your vision to life." 
              },
              { 
                step: "03", 
                title: "Deploy & Scale", 
                desc: "We launch your ecosystem and activate growth pipelines to ensure your brand stays ahead through continuous optimization." 
              }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[2rem] bg-neutral/5 border border-neutral/10 hover:border-primary transition-colors group">
                <span className="text-primary font-bold tracking-tighter text-5xl opacity-20 group-hover:opacity-100 transition-opacity">
                  {item.step}
                </span>
                <h3 className="text-2xl font-bold mt-6 mb-4">{item.title}</h3>
                <p className="text-neutral/60 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Our Results & Final CTA --- */}
        <div className="relative bg-neutral/5 rounded-[3rem] p-12 lg:p-24 overflow-hidden border border-neutral/10">
          {/* Subtle Background Text for Design Flair */}
          <div className="absolute -bottom-10 -right-10 text-[120px] font-bold text-neutral/5 select-none pointer-events-none">
            SYSTEMS
          </div>

          <div className="max-w-3xl relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-primary">Elite Brand Performance.</h2>
            <div className="space-y-6 text-xl font-light text-neutral/80">
              <p>
                We partner with brands ready to dominate their market. Our systems help businesses increase output, reduce friction, and build absolute authority.
              </p>
              <p>
                Whether you are launching or refreshing, we help you create the intelligent assets required to scale with speed and precision.
              </p>
            </div>
            
            <div className="mt-12 flex items-center gap-4 text-lg font-semibold text-neutral">
              <span className="w-12 h-[2px] bg-primary"></span>
              <p>Build the future of your brand today.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;