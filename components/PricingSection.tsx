"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useMediaQuery } from "react-responsive";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

import PaymentModal from "./PaymentModal";

interface Plan {
  title: string;
  price: string;
  features: string[];
  planId: string;
  isPopular?: boolean;
}

// Fixed spring configuration for build stability and smoothness
const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

const PlanCard = ({ title, price, features, onClick, isPopular, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...fluidTransition, delay: index * 0.1 }}
      whileHover={{ 
        y: -12, 
        backgroundColor: "rgba(255, 255, 255, 0.06)"
      }}
      className="relative w-full h-[620px] group bg-neutral/[0.03] p-10 rounded-[2.5rem] border border-neutral/10 flex flex-col justify-between overflow-hidden cursor-default"
    >
      {/* Premium Badge */}
      {isPopular && (
        <div className="absolute top-6 right-10">
          <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-2 tracking-tight">{title}</h2>
        <div className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-10 block">
          Monthly Membership
        </div>
        
        <ul className="space-y-4">
          {features.map((item: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3 text-sm font-light text-neutral/50 group-hover:text-neutral/80 transition-colors duration-300">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-8 border-t border-neutral/5">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl font-bold tracking-tighter">{price.split('/')[0]}</span>
          <span className="text-neutral/40 text-sm">/month</span>
        </div>
        <div className="text-[10px] text-neutral/30 uppercase tracking-widest mb-6 font-medium">Pause or cancel anytime</div>
        
        <button
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="
            group/btn
            relative
            w-full
            flex
            items-center
            justify-between
            bg-background
            border
            border-neutral/10
            rounded-full
            px-8
            py-4
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
            Get Started
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
      </div>
    </motion.div>
  );
};

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 639 });

  const openPaymentModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const plans: Plan[] = [
    {
      title: "Essentials Plan",
      price: "$799/month",
      features: [
        "Brand Identity Core",
        "Smart Website Development",
        "Automated Social Assets",
        "Standard Refinement Cycles",
        "Motion Graphics and Animated Posts",
        "Targeted Digital Marketing",
      ],
      planId: "PLN_224499",
    },
    {
      title: "Growth Plan",
      price: "$1,599/month",
      isPopular: true,
      features: [
        "Full Brand Ecosystem",
        "Custom Website Development",
        "High Volume Ad Graphics",
        "Advanced Optimization Rounds",
        "Video and Motion Pipelines",
        "Data Driven Digital Marketing",
        "Dedicated Systems Manager",
      ],
      planId: "PLN_224573",
    },
    {
      title: "Premium Plan",
      price: "$2,999/month",
      features: [
        "Complete Brand Strategy",
        "Advanced Web Ecosystems",
        "Full Scale AI Automation & Custom Agents",
        "Continuous System Evolution",
        "High End Video Production",
        "Dedicated Systems Manager",
        "Full SEO, GEO and Marketing Automation",
      ],
      planId: "PLN_2245439",
    },
  ];

  if (!mounted) return null;

  return (
    <section id="plans" className="bg-background text-neutral py-24 px-6 scroll-mt-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={fluidTransition}
          className="mb-20"
        >
          <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em] block mb-4">Pricing Models</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
             Adaptive <span className="text-neutral/20 italic font-light">Plans</span>
          </h2>
        </motion.div>

        {isMobile ? (
          <div className="flex flex-col gap-8 mb-8">
            {plans.map((plan, index) => (
              <PlanCard key={index} {...plan} index={index} onClick={() => openPaymentModal(plan)} />
            ))}
          </div>
        ) : (
          <div className="mb-12 pricing-pagination">
            <Swiper
              spaceBetween={24}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1.9 },
                1024: { slidesPerView: 3 },
              }}
              className="!overflow-visible"
            >
              {plans.map((plan, index) => (
                <SwiperSlide key={index} className="!h-auto">
                  <PlanCard {...plan} index={index} onClick={() => openPaymentModal(plan)} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && selectedPlan && (
            <PaymentModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              selectedPlan={{
                title: selectedPlan.title,
                price: parseFloat(selectedPlan.price.replace(/[^0-9.]/g, "")),
                planId: selectedPlan.planId,
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .pricing-pagination .swiper-pagination {
          position: relative !important;
          margin-top: 4rem !important;
          bottom: 0 !important;
          display: flex;
          justify-content: center;
          gap: 12px;
        }
        .pricing-pagination .swiper-pagination-bullet {
          background: #30D5C8 !important;
          opacity: 0.2;
          width: 30px;
          height: 2px;
          border-radius: 0;
          transition: all 0.4s ease;
          margin: 0 !important;
        }
        .pricing-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          width: 60px;
        }
      `}</style>
    </section>
  );
};

export default PricingSection;