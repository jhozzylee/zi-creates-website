"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Types based on your data structure
interface PortfolioItem {
  id: number;
  type: string;
  brand: string;
  category: string;
  caption: string;
  src: string;
  thumbnail?: string;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 30,
  stiffness: 200,
};

export default function PortfolioGallery({ items }: { items: any[] }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Branding", "Websites", "AI Solutions", "Video"];

  const filteredItems = filter === "All" 
    ? items 
    : items.filter(item => item.type === filter);

  return (
    <section className="bg-background text-neutral py-32 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.5em] block mb-6">
              Selected Works
            </span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85]">
              Case <br />
              <span className="text-neutral/10 italic font-serif font-light">Studies</span>
            </h2>
          </motion.div>

          {/* Filter Bar */}
          <nav className="flex flex-wrap gap-x-8 gap-y-4 border-b border-neutral/5 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative pb-2 ${
                  filter === cat ? "text-primary" : "text-neutral/30 hover:text-neutral"
                }`}
              >
                {cat}
                {filter === cat && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Masonry-Style Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Custom grid logic for editorial rhythm
              const isLarge = index % 3 === 0;
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={fluidTransition}
                  className={`${
                    isLarge ? "lg:col-span-8" : "lg:col-span-4"
                  } group`}
                >
                  <Link href={`/portfolio/${item.id}`} className="block">
                    {/* Image Container with persistent border */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-neutral/[0.02] border border-neutral/10 transition-all duration-700 group-hover:border-primary/30">
                      <Image
                        src={item.src}
                        alt={item.brand}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                        sizes="(max-w-768px) 100vw, 800px"
                      />
                      
                      {/* Overlay Info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                          {item.type}
                        </span>
                        <h3 className="text-3xl font-bold tracking-tighter text-neutral">
                          {item.brand}
                        </h3>
                      </div>
                    </div>

                    {/* Static Text (Visible always for accessibility/SEO) */}
                    <div className="mt-6 px-2 flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                          {item.caption}
                        </h4>
                        <p className="text-neutral/30 text-xs uppercase tracking-widest mt-1">
                          {item.category}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-neutral/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                        <span className="text-neutral group-hover:text-background transition-colors">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}