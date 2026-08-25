"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import Branding from "./Branding";
import VisualDesign from "./AI";
import Marketing from "./Marketing";
import Website from "./Website";

interface PillarCardProps {
  title: string;
  items: string[];
  buttonText: string;
  onLearnMore: () => void;
  index: number;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

const PillarCard = ({
  title,
  items,
  buttonText,
  onLearnMore,
  index,
}: PillarCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...fluidTransition,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        backgroundColor: "rgba(255, 255, 255, 0.06)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        group
        relative
        w-full
        flex
        flex-col
        justify-between
        p-8
        md:p-10
        rounded-[2.5rem]
        bg-neutral/[0.03]
        border
        border-neutral/10
        transition-colors
        duration-500
      "
    >
      {/* ================= CARD CONTENT ================= */}

      <div>
        {/* Card Label */}
        <div className="mb-6 flex items-center gap-2">
          <span
            className="
              w-[4px]
              h-[4px]
              rounded-full
              bg-primary
              shrink-0
            "
          />

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.3em]
              font-bold
              text-neutral/40
            "
          >
            Capability
          </span>
        </div>

        {/* Title */}
        <h2
          className="
            text-2xl
            font-bold
            mb-6
            tracking-tight
            text-neutral
            transition-colors
            duration-300
            group-hover:text-primary
          "
        >
          {title}
        </h2>

        {/* Services */}
        <ul className="space-y-4 mb-10">
          {items.map((item, i) => (
            <li
              key={i}
              className="
                flex
                items-center
                gap-3
                text-sm
                font-light
                text-neutral/50
                group-hover:text-neutral/80
                transition-colors
                duration-300
              "
            >
              <span
                className="
                  text-primary/40
                  group-hover:text-primary
                  transition-colors
                  duration-300
                  text-[10px]
                "
              >
                /
              </span>

              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ================= LEARN MORE ================= */}

      <button
        onClick={onLearnMore}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="
          group/btn
          relative
          w-full
          flex
          items-center
          justify-between
          pt-5
          border-t
          border-neutral/10
          transition-colors
          duration-500
          hover:border-neutral/20
        "
      >
        {/* Button Text */}
        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.22em]
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

const WhatWeDo = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const closeModal = () => {
    setOpenModal(null);
  };

  /* -----------------------------------
     Lock body scroll when modal opens
  ------------------------------------ */
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal]);

  return (
    <section
      id="services"
      className="
        bg-background
        text-neutral
        py-24
        md:py-32
        px-6
        scroll-mt-20
        overflow-hidden
      "
    >
      <div className="max-w-[1280px] mx-auto">

        {/* ================= SECTION HEADER ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={fluidTransition}
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            justify-between
            mb-16
            gap-6
          "
        >
          <div className="space-y-4">
            <span
              className="
                text-primary
                text-[11px]
                font-bold
                uppercase
                tracking-[0.3em]
              "
            >
              Our Ecosystem
            </span>

            <h2
              className="
                text-3xl
                md:text-5xl
                font-bold
                tracking-tighter
              "
            >
              What We Do for{" "}
              <span
                className="
                  text-neutral/30
                  italic
                  font-light
                "
              >
                Brands Like Yours
              </span>
            </h2>
          </div>

          <p
            className="
              text-neutral/40
              text-sm
              max-w-[300px]
              font-light
              leading-relaxed
            "
          >
            Intelligent creative pipelines designed to scale
            your market position instantly.
          </p>
        </motion.div>

        {/* ================= SERVICE CARDS ================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
            md:gap-8
          "
        >
          {[
            {
              id: "branding",
              title: "Branding",
              items: [
                "Visual Identity",
                "Brand Strategy",
                "Brand Style Guide",
                "Storytelling",
              ],
            },
            {
              id: "visualDesign",
              title: "AI Automation",
              items: [
                "Custom Agents",
                "Workflow Automation",
                "Content Pipelines",
                "Predictive Analytics",
              ],
            },
            {
              id: "marketing",
              title: "Marketing",
              items: [
                "Digital Marketing",
                "Email Strategy",
                "Content Automation",
                "Paid Ads",
              ],
            },
            {
              id: "website",
              title: "Website",
              items: [
                "Web Development",
                "E-commerce",
                "SEO Automation",
                "UX Prototypes",
              ],
            },
          ].map((service, index) => (
            <PillarCard
              key={service.id}
              index={index}
              title={service.title}
              items={service.items}
              buttonText="Learn More"
              onLearnMore={() => setOpenModal(service.id)}
            />
          ))}
        </div>
      </div>

      {/* ================= MODALS ================= */}

      <AnimatePresence>
        {openModal === "branding" && (
          <Branding
            isOpen={true}
            onClose={closeModal}
          />
        )}

        {openModal === "visualDesign" && (
          <VisualDesign
            isOpen={true}
            onClose={closeModal}
          />
        )}

        {openModal === "marketing" && (
          <Marketing
            isOpen={true}
            onClose={closeModal}
          />
        )}

        {openModal === "website" && (
          <Website
            isOpen={true}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default WhatWeDo;