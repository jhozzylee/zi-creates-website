"use client";

import React from "react";
import { motion } from "framer-motion";

const EmailCaptureSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Demo requested");
  };

  const fluidTransition = {
    type: "spring" as const,
    damping: 35,
    stiffness: 200,
    mass: 1,
  };

  return (
    <section className="bg-background text-neutral px-6 py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">

        {/* -----------------------------------
            Cinematic Video
        ------------------------------------ */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={fluidTransition}
          className="w-full mb-20"
        >
          <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-neutral/10 bg-neutral/5 shadow-2xl">
            <video
              src="/Hero-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="
                w-full
                h-auto
                object-cover
                grayscale-[0.15]
                transition-all
                duration-700
                hover:grayscale-0
              "
            />

            {/* Subtle cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* -----------------------------------
            Content
        ------------------------------------ */}

        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={fluidTransition}
            className="max-w-[600px] space-y-6"
          >
            <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em]">
              Efficiency at Scale
            </span>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1]">
              Whether you’re an entrepreneur, or an{" "}
              <span className="text-neutral/30 italic font-light">
                established business
              </span>
              , we’ll help you save time and money.
            </h2>
          </motion.div>

          {/* -----------------------------------
              Email Form
          ------------------------------------ */}

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              ...fluidTransition,
              delay: 0.1,
            }}
            className="w-full max-w-[480px]"
            onSubmit={handleSubmit}
          >
            <div className="relative">

              <div
                className="
                  relative
                  p-1.5
                  rounded-full
                  border
                  border-neutral/20
                  bg-neutral/[0.03]
                  backdrop-blur-md
                  flex
                  items-center
                  transition-colors
                  duration-300
                  hover:border-neutral/40
                  focus-within:border-primary/60
                "
              >
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your professional email"
                  required
                  className="
                    w-full
                    pl-8
                    pr-4
                    py-4
                    bg-transparent
                    text-neutral
                    text-base
                    placeholder:text-neutral/30
                    focus:outline-none
                  "
                />

                <button
                  type="submit"
                  className="
                    whitespace-nowrap
                    px-7
                    py-4
                    rounded-full
                    bg-primary
                    text-background
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    transition-all
                    duration-300
                    hover:bg-neutral
                    hover:text-background
                    active:scale-[0.98]
                  "
                >
                  <span className="hidden sm:block">
                    Request Demo
                  </span>

                  <span className="sm:hidden">
                    Demo
                  </span>
                </button>
              </div>
            </div>

            <p className="mt-4 ml-6 text-[10px] text-neutral/30 uppercase tracking-widest font-medium">
              Join 50+ brands scaling with us.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default EmailCaptureSection;