"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useMediaQuery } from "react-responsive";
import { Check, ArrowRight } from "lucide-react";

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

const PlanCard = ({ title, price, features, onClick, isPopular }: any) => {
  return (
    <div className="relative w-full h-[620px] group bg-neutral/[0.03] p-10 rounded-[2.5rem] border border-neutral/10 transition-all duration-500 hover:bg-neutral/[0.06] hover:border-primary/40 flex flex-col justify-between overflow-hidden">
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
            <li key={idx} className="flex items-start gap-3 text-sm font-light text-neutral/50 group-hover:text-neutral/80 transition-colors">
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
          className="group relative flex justify-between items-center w-full bg-background border border-neutral/10 rounded-full px-8 py-4 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_rgba(48,213,200,0.1)]"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-bold group-hover:text-primary transition-colors">
            Get Started
          </span>
          <ArrowRight className="w-4 h-4 text-neutral/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
};

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Preserving your original responsiveness logic
  const isMobile = useMediaQuery({ maxWidth: 639 });

  const openPaymentModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const plans: Plan[] = [
    {
      title: "Essentials Plan",
      price: "$599/month",
      features: [
        "Brand Essentials",
        "Basic Website Development",
        "Social Media Graphics",
        "1 Revision per Project",
        "Motion Graphics/Animated Posts",
        "Digital Marketing",
      ],
      planId: "PLN_224499",
    },
    {
      title: "Growth Plan",
      price: "$1,299/month",
      isPopular: true,
      features: [
        "Full Brand Identity",
        "Custom Website Development",
        "Social Media & Ad Graphics",
        "Motion Graphics/Animated Posts",
        "2 Revisions per Project",
        "Digital Marketing",
        "Dedicated Account Manager",
      ],
      planId: "PLN_224573",
    },
    {
      title: "Premium Plan",
      price: "$2,499/month",
      features: [
        "Complete Brand Strategy",
        "Advanced Website Development",
        "AI Automation",
        "Social Media & Ad Graphics",
        "Video & Motion Graphics",
        "3 Revisions per Project",
        "Dedicated Account Manager",
        "SEO, GEO & Marketing",
      ],
      planId: "PLN_2245439",
    },
  ];

  if (!mounted) return null;

  return (
    <section id="plans" className="bg-background text-neutral py-2 px-6 scroll-mt-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-20">
          <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em] block mb-4">Pricing Models</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
             Adaptive <span className="text-neutral/20 italic font-light">Plans</span>
          </h2>
        </div>

        {isMobile ? (
          // Mobile: Vertical Stack (Original Logic)
          <div className="flex flex-col gap-8 mb-8">
            {plans.map((plan, index) => (
              <PlanCard key={index} {...plan} onClick={() => openPaymentModal(plan)} />
            ))}
          </div>
        ) : (
          // Tablet/Desktop: Swiper (Original Logic)
          <div className="mb-12 pricing-pagination">
            <Swiper
              spaceBetween={24}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1.9 },
                1024: { slidesPerView: 3 },
              }}
            >
              {plans.map((plan, index) => (
                <SwiperSlide key={index}>
                  <PlanCard {...plan} onClick={() => openPaymentModal(plan)} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {selectedPlan && (
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