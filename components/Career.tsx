"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import CTAButton from "./CTAButton";

// 💫 Fluid Spring Motion
const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

const fadeUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: fluidTransition
  }
};

const staggerContainer: Variants = {
  initial: {},
  whileInView: { 
    transition: { staggerChildren: 0.1 } 
  }
};

const viewportSettings = { once: true, margin: "-50px" };

const Careers = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:careers@zicreates.com";
  };

  const values = [
    { title: "Creative Logic", desc: "We believe the best solutions emerge from the intersection of elite design and technical precision." },
    { title: "Systems Thinking", desc: "Stay at the forefront of branding, motion engineering, and intelligent growth pipelines." },
    { title: "Velocity Path", desc: "As a high performance agency, your trajectory is limited only by your own ability to scale." },
    { title: "Expert Collective", desc: "Work alongside specialized leads who value absolute quality over manual shortcuts." },
    { title: "Market Impact", desc: "Contribute to systems that create measurable authority and unforgettable experiences." },
    { title: "High Output", desc: "We build fast and optimize often, keeping our work precise and our skills sharp." },
  ];

  return (
    <section className="bg-background text-neutral py-24 px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        
        {/* --- Header --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportSettings}
          transition={fluidTransition}
          className="max-w-4xl mb-32"
        >
          <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-primary mb-6 block">
            Work With Us
          </span>
          <h1 className="text-[40px] sm:text-[50px] lg:text-[72px] font-bold leading-[1.05] mb-8 tracking-tighter">
            Engineer the <span className="text-primary italic font-serif font-light">future</span> <br />
            of brand velocity.
          </h1>
          <p className="text-xl lg:text-2xl font-light leading-relaxed text-neutral/50">
            Zi Creates is expanding. We are always looking for the next generation of <span className="text-neutral font-medium italic">strategic thinkers</span> and creative engineers.
          </p>
        </motion.div>

        {/* --- Feature Grid --- */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-48">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportSettings}
            transition={fluidTransition}
            className="relative aspect-square rounded-[3rem] overflow-hidden border border-neutral/10"
          >
            <Image
              src="/Career-img.jpg"
              alt="Creative engineering team"
              fill
              className="object-cover"
              priority
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, ...fluidTransition }}
              className="absolute bottom-8 left-8 bg-background/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 max-w-[320px] shadow-2xl"
            >
              <p className="text-sm font-light italic leading-relaxed text-neutral/80">
                "The best way to predict the future is to <span className="text-primary font-medium not-italic">engineer it.</span>"
              </p>
            </motion.div>
          </motion.div>

          <div className="space-y-16">
            <motion.h2 
              {...fadeUp}
              className="text-4xl font-bold tracking-tight"
            >
              Why Join <span className="text-neutral/20 italic font-serif">Zi Creates?</span>
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={viewportSettings}
              className="grid sm:grid-cols-2 gap-12"
            >
              {values.map((val, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp}
                  className="space-y-4 group"
                >
                  <motion.div 
                    whileHover={{ width: 48 }}
                    className="h-[2px] w-8 bg-primary transition-all duration-300"
                  />
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-neutral/40 font-light leading-relaxed text-sm">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* --- Talent Pool CTA --- */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={fluidTransition}
          className="relative rounded-[4rem] bg-neutral/[0.02] border border-neutral/10 p-12 lg:p-24 text-center overflow-hidden"
        >
          {/* Animated Background Aura */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-primary blur-[120px] rounded-full pointer-events-none" 
          />
          
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tighter">
              Join the <span className="text-primary italic font-serif font-light">Network.</span>
            </h2>
            <p className="text-lg text-neutral/50 font-light mb-12 leading-relaxed">
              Think you have the technical edge? Send your portfolio to our talent network. We review every submission as we scale our engineering teams.
            </p>
            
            <div className="flex justify-center">
              <CTAButton text="Submit Profile & Portfolio" onClick={handleEmailClick} />
            </div>
          </div>
        </motion.div>

        {/* --- Footer Note --- */}
        <motion.div 
          {...fadeUp}
          className="mt-32 flex flex-col items-center"
        >
          <div className="h-px w-24 bg-neutral/10 mb-10"></div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral/30 font-bold max-w-2xl text-center leading-relaxed">
            Equal Opportunity Engineering &bull; Global Talent &bull; Zi Creates Studio
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Careers;