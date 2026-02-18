"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ArrowRight, Phone, Search, Users, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

// Fixed spring config for build stability
const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  icon: LucideIcon;
  index: number;
}

const Card = ({ title, description, buttonText, onClick, icon, index }: CardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ ...fluidTransition, delay: index * 0.1 }}
    /* whileHover replaces Tailwind's transition-all to stop twitching */
    whileHover={{ 
      y: -8, 
      backgroundColor: "rgba(255, 255, 255, 0.06)",
      borderColor: "rgba(48, 213, 200, 0.4)" 
    }}
    className="w-full h-[280px] group relative bg-neutral/[0.03] p-8 rounded-[2rem] border border-neutral/10 flex flex-col justify-between overflow-hidden cursor-default"
  >
    {/* Subtle Background Icon Flare */}
    <div className="absolute -right-4 -top-4 text-primary/[0.03] group-hover:text-primary/[0.06] transition-colors duration-500">
      {React.createElement(icon, { size: 120 })}
    </div>

    <div className="relative z-10">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
        {React.createElement(icon, { size: 20 })}
      </div>
      <h4 className="text-xl font-bold tracking-tight mb-2">{title}</h4>
      <p className="text-sm text-neutral/40 leading-relaxed max-w-[260px] group-hover:text-neutral/60 transition-colors duration-500">
        {description}
      </p>
    </div>
    
    <button
      onClick={onClick}
      className="relative z-10 group/btn flex justify-between items-center w-full text-neutral text-xs font-bold uppercase tracking-[0.2em] border border-neutral/10 rounded-full px-6 py-3 transition-all duration-300 hover:border-primary hover:bg-primary/5"
    >
      <span className="group-hover/btn:text-primary transition-colors">{buttonText}</span>
      <ArrowRight className="w-4 h-4 text-neutral/30 group-hover/btn:text-primary group-hover/btn:translate-x-1 transition-all" />
    </button>
  </motion.div>
);

interface ExtraSectionProps {
  onOpenBookCall: () => void;
}

const ExtraSection = ({ onOpenBookCall }: ExtraSectionProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const extraCards = [
    {
      icon: Phone,
      title: "Let’s Talk Strategy",
      description: "Expert insights to boost your brand. Schedule a focused deep-dive.",
      buttonText: "Book a Call",
      onClick: onOpenBookCall,
    },
    {
      icon: Search,
      title: "Brand Checkup",
      description: "Quick wins for improving your current digital presence and UX.",
      buttonText: "Review My Brand",
      onClick: onOpenBookCall,
    },
    {
      icon: Users,
      title: "Refer & Earn",
      description: "Earn 5% recurring commission for every successful referral.",
      buttonText: "Join now",
      onClick: () => console.log("Join Now clicked"),
    }
  ];

  return (
    <section className="bg-background text-neutral pb-32 px-4 scroll-mt-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        
        {/* DESKTOP GRID */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {extraCards.map((card, i) => (
            <Card key={i} {...card} index={i} />
          ))}
        </div>

        {/* MOBILE & TABLET SLIDER */}
        <div className="lg:hidden extra-pagination">
          <Swiper
            spaceBetween={20}
            modules={[Pagination]}
            pagination={{ el: ".extra-dots", clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1.1, centeredSlides: true },
              640: { slidesPerView: 1.9, centeredSlides: false },
              768: { slidesPerView: 2.2 },
            }}
            className="!overflow-visible"
          >
            {extraCards.map((card, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <Card {...card} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="extra-dots mt-12 flex justify-center" />
        </div>
      </div>

      <style jsx global>{`
        .extra-pagination .swiper-pagination-bullet {
          background: #30D5C8 !important;
          opacity: 0.2;
          width: 20px;
          height: 2px;
          border-radius: 0;
          transition: all 0.3s ease;
          margin: 0 6px !important;
        }
        .extra-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          width: 40px;
        }
      `}</style>
    </section>
  );
};

export default ExtraSection;