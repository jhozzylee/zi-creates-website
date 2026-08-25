"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Search, Users, Phone, LucideIcon } from "lucide-react";
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

const Card = ({ title, description, buttonText, onClick, icon, index }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...fluidTransition, delay: index * 0.1 }}
      whileHover={{ 
        y: -8, 
        backgroundColor: "rgba(255, 255, 255, 0.06)"
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="
          group/btn
          relative
          z-10
          w-full
          flex
          items-center
          justify-between
          bg-background
          border
          border-neutral/10
          rounded-full
          px-6
          py-3
          transition-colors
          duration-500
          hover:border-neutral/20
        "
      >
        {/* Button Text */}
        <span
          className="
            text-xs
            uppercase
            tracking-[0.2em]
            font-bold
            text-neutral/60
            transition-colors
            duration-300
            group-hover/btn:text-neutral
          "
        >
          {buttonText}
        </span>

        {/* Accent Dot */}
        <span
          className="
            relative
            flex
            items-center
            justify-center
            w-6
            h-6
          "
        >
          <span
            className={`
              absolute
              bottom-[3px]
              w-[5px]
              h-[5px]
              rounded-full
              bg-primary
              transition-all
              duration-400
              ease-[cubic-bezier(0.23,1,0.32,1)]
              ${
                isHovered
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-2 scale-50"
              }
            `}
          />
        </span>
      </button>
    </motion.div>
  );
};

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