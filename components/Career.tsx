"use client";

import React from "react";
import Image from "next/image";
import CTAButton from "./CTAButton"; // Import your component

const Careers = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:careers@zicreates.com";
  };

  const values = [
    { title: "Creative Freedom", desc: "We believe great ideas come from collaboration and radical experimentation." },
    { title: "Innovative Culture", desc: "Stay on the cutting edge of branding, motion design, and digital marketing." },
    { title: "Growth Path", desc: "As a growing agency, your trajectory is limited only by your own ambition." },
    { title: "Supportive Team", desc: "Work alongside passionate experts who value quality over shortcuts." },
    { title: "Lasting Impact", desc: "Contribute to projects that create meaningful, unforgettable brand experiences." },
    { title: "Fast-Paced", desc: "We ship fast and iterate often, keeping our work agile and our skills sharp." },
  ];

  return (
    <section className="bg-background text-neutral py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        
        {/* --- Header --- */}
        <div className="max-w-4xl mb-32">
          <span className="uppercase tracking-[0.2em] text-sm font-bold text-primary/80 mb-6 block">
            Work With Us
          </span>
          <h1 className="text-[36px] sm:text-[44px] lg:text-[64px] font-bold leading-[1.1] mb-8">
            Help us build the <span className="text-primary">future of brand</span> storytelling.
          </h1>
          <p className="text-xl lg:text-2xl font-light leading-relaxed text-neutral/70">
            While we don’t have open roles today, <strong className="text-neutral font-semibold">Zi Creates</strong> is growing fast. We’re always looking for the next generation of passionate, driven creatives.
          </p>
        </div>

        {/* --- Feature Grid --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-40">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-neutral/10">
            <Image
              src="/Career-img.jpg"
              alt="Creative team collaboration"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-8 left-8 bg-background/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-[280px]">
              <p className="text-sm font-medium italic">"The best way to predict the future is to design it."</p>
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="text-4xl font-bold">Why Join Zi Creates?</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {values.map((val, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-1 w-8 bg-primary"></div>
                  <h3 className="text-xl font-bold">{val.title}</h3>
                  <p className="text-neutral/60 font-light leading-snug">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Talent Pool CTA (Using CTAButton) --- */}
        <div className="relative rounded-[3rem] bg-neutral/5 border border-neutral/10 p-12 lg:p-24 text-center overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Stay on our radar.</h2>
            <p className="text-lg text-neutral/70 font-light mb-10">
              Think you’d be a great fit? Send your resume and portfolio to our talent pool. We review every submission when new roles open up.
            </p>
            
            {/* Using your custom component here */}
            <CTAButton text="Send Portfolio & CV" onClick={handleEmailClick} />
          </div>
        </div>

        {/* --- Footer Note --- */}
        <div className="mt-20 flex flex-col items-center">
          <div className="h-[1px] w-24 bg-neutral/10 mb-8"></div>
          <p className="text-sm text-neutral/50 italic max-w-2xl text-center leading-relaxed">
            Zi Creates is an equal opportunity employer. We celebrate diversity
            and are committed to creating an inclusive environment for all
            employees.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Careers;