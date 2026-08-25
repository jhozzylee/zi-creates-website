"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

interface TestimonialCardProps {
  photo: string;
  quote: React.ReactNode;
  name: string;
  title: string;
  logo: string;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

const TestimonialCard = ({ photo, quote, name, title, logo }: TestimonialCardProps) => (
  <div className="w-full px-6 py-12">
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
      {/* Editorial Image Treatment */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={fluidTransition}
        className="relative shrink-0"
      >
        <div className="absolute -inset-4 border border-neutral/5 rounded-[3rem] pointer-events-none" />
        <motion.img
          whileHover={{ scale: 1.02 }}
          src={photo}
          alt={name}
          className="w-[280px] h-[360px] md:w-[320px] md:h-[420px] object-cover rounded-[2.5rem] shadow-2xl z-10 relative"
        />
      </motion.div>

      <div className="max-w-[580px] flex flex-col items-center md:items-start text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Quote className="text-primary/20 w-12 h-12 mb-6" strokeWidth={1} />
        </motion.div>
        
        {/* Large, Airy Quote Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...fluidTransition, delay: 0.3 }}
          className="text-xl md:text-3xl font-light leading-[1.4] tracking-tight text-neutral/90 mb-10 italic"
        >
          {quote}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-12 pt-8 border-t border-neutral/5 w-full md:w-auto"
        >
          <div className="space-y-1">
            <p className="text-lg font-bold tracking-tight">{name}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral/40 font-bold">{title}</p>
          </div>
          <img 
            src={logo} 
            alt="Company Logo" 
            className="h-6 md:h-8 opacity-40 brightness-200" 
          />
        </motion.div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      photo: "/David_Kellet.webp",
      quote: (
      <>
        Working with Zi Creates was a great experience. They understood Ki Computing’s needs and delivered <span className="text-primary font-medium italic">clean, modern work</span> that enhanced our brand. Their attention to detail throughout the project was exceptional.
      </>
      ),
      name: "David Kellett",
      title: "Founder, K.I. Computing",
      logo: "/Ki-Computing.png",
    },
    {
      photo: "/Ayoola.webp",
      quote: (
        <>
          Zi Creates transformed our online presence with <span className="text-primary font-medium">stunning design</span> and <span className="text-primary font-medium italic">strategic</span> social media management.
        </>
      ),
      name: "Wasiu Olanisebe",
      title: "Marketing Lead, Crestville",
      logo: "/Crestville.png",
    },
    {
      photo: "/Client.webp",
      quote: (
        <>
          From branding to execution, they delivered <span className="text-primary font-medium">professional quality</span> at every step of our growth.
        </>
      ),
      name: "Sofia Bennett",
      title: "Founder, Uplift",
      logo: "/Uplift.png",
    },
    {
      photo: "/Solomon.webp",
      quote: (
        <>
          Working with them was a breeze. Their <span className="text-primary font-medium italic">creative direction</span> brought our brand to life.
        </>
      ),
      name: "Solomon Gbewa",
      title: "CEO, ByteBazaar",
      logo: "/ByteBazaar.png",
    },
    {
      photo: "/Alex.webp",
      quote: (
        <>
          Partnering with Zi Creates exceeded all our expectations. Beyond being <span className="text-primary font-medium italic">responsive and adaptable,</span> their eye for detail, steady creativity, and consistency turned our brand vision into reality.
        </>
      ),
      name: "Alexandra Lee",
      title: "Creator, HiPretty",
      logo: "/HiPretty.png",
    },
  ];

  return (
    <section id="testimonials" className="bg-background text-neutral py-24 md:py-32 px-6 relative overflow-hidden testimonials-section">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header - Editorial Style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={fluidTransition}
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <span className="text-primary text-[11px] font-bold uppercase tracking-[0.5em] block mb-4">Social Proof</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Stories that make <br />
            <span className="text-neutral/20 italic font-light font-serif">us proud</span>
          </h2>
        </motion.div>

        <div className="relative testimonials-swiper-container">
          {/* Custom Desktop-Only Navigation Buttons */}
          <button
            id="testimonial-prev"
            aria-label="Previous testimonial"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-primary/10 bg-background/80 backdrop-blur-sm items-center justify-center text-primary/30 hover:text-primary hover:border-primary/30 transition-all duration-300 -translate-x-6 lg:-translate-x-12 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            id="testimonial-next"
            aria-label="Next testimonial"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-primary/10 bg-background/80 backdrop-blur-sm items-center justify-center text-primary/30 hover:text-primary hover:border-primary/30 transition-all duration-300 translate-x-6 lg:translate-x-12 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <Swiper
            modules={[Pagination, Autoplay, EffectFade, Navigation]}
            loop={true}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            navigation={{
              nextEl: "#testimonial-next",
              prevEl: "#testimonial-prev",
            }}
            pagination={{
              clickable: true,
            }}
            className="mySwiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard {...testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .testimonials-swiper-container .swiper-pagination {
          position: relative !important;
          margin-top: 4rem !important;
          bottom: 0 !important;
          display: flex;
          justify-content: center;
          gap: 12px;
        }
        .testimonials-swiper-container .swiper-pagination-bullet {
          background: #30D5C8 !important;
          opacity: 0.2;
          width: 32px;
          height: 2px;
          border-radius: 0;
          transition: all 0.4s ease;
          margin: 0 !important;
        }
        .testimonials-swiper-container .swiper-pagination-bullet-active {
          opacity: 1;
          width: 64px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;