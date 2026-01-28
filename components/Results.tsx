"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import CTAButton from "./CTAButton";

const Results = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const projects = [
    { id: "01", src: "/result01.webp", title: "Brand Identity", category: "Branding" },
    { id: "02", src: "/result03.webp", title: "Digital Campaign", category: "Marketing" },
    { id: "03", src: "/result04.webp", title: "Motion Graphics", category: "Visuals" },
    { id: "04", src: "/result02.webp", title: "E-commerce UI", category: "Web" },
    { id: "05", src: "/result05.webp", title: "Product Launch", category: "Branding" },
    { id: "06", src: "/result06.webp", title: "AI Integration", category: "Automation" },
  ];

  return (
    <section id="results" className="bg-background text-neutral py-24 md:py-32 overflow-hidden scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em]">Case Studies</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Proof in the <span className="text-neutral/20 italic font-light">Performance</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 text-neutral/40 group cursor-default">
            <span className="text-sm font-light">Scroll to explore</span>
            <MoveRight className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 md:gap-10 overflow-x-auto pb-12 px-6 md:px-[calc((100vw-1280px)/2+24px)] no-scrollbar cursor-grab active:cursor-grabbing"
      >
        {projects.map((project) => (
          <Link 
            key={project.id} 
            href="/portfolio" 
            className="flex-none w-[300px] md:w-[500px] group relative"
          >
            {/* Project Card */}
            <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-neutral/10">
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
              />
              
              {/* Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 md:p-12">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Background Number (Visible on hover) */}
            <span className="absolute -top-6 -right-4 text-7xl md:text-9xl font-bold text-neutral/[0.03] pointer-events-none group-hover:text-primary/10 transition-colors duration-700">
              {project.id}
            </span>
          </Link>
        ))}
        
        {/* "View All" End Card */}
        <Link 
          href="/portfolio" 
          className="flex-none w-[300px] md:w-[500px] flex items-center justify-center rounded-[3rem] border border-dashed border-neutral/20 hover:border-primary/50 transition-colors group"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-neutral/5 flex items-center justify-center mx-auto group-hover:bg-primary transition-colors">
              <ArrowRight className="w-6 h-6 group-hover:text-background" />
            </div>
            <p className="text-lg font-medium">View Full Portfolio</p>
          </div>
        </Link>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 mt-12 flex justify-center">
         <CTAButton text="Start Your Project" onClick={() => window.location.href='/contact'} />
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Results;