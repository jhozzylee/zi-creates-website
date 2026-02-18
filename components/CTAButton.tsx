"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CTAButtonProps {
  text: string;
  fullWidth?: boolean;
  link?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const CTAButton = ({ 
  text, 
  fullWidth = false, 
  link, 
  onClick, 
  type = "button",
  disabled = false 
}: CTAButtonProps) => {
  
  // High-end Button Styling:
  // We use group-hover for the background "sweep" effect.
  const baseClasses = `
    relative inline-flex items-center justify-center
    text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] 
    py-4 px-12 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
    bg-primary text-background border border-primary
    hover:text-primary hover:shadow-[0_0_30px_rgba(48,213,200,0.4)]
    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-background
    ${fullWidth ? "w-full rounded-none" : "rounded-full"} 
    no-underline cursor-pointer overflow-hidden group
  `;

  const Content = () => (
    <>
      {/* Liquid background fill on hover */}
      <span className="absolute inset-0 bg-background translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
      
      {/* Subtle Shimmer effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      
      {/* Label */}
      <span className="relative z-10">{text}</span>
    </>
  );

  if (link) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={fullWidth ? "w-full" : "inline-block"}
      >
        <Link href={link} className={baseClasses}>
          <Content />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type} 
      className={baseClasses} 
      onClick={onClick}
      disabled={disabled}
    >
      <Content />
    </motion.button>
  );
};

export default CTAButton;