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
  disabled = false,
}: CTAButtonProps) => {
  const baseClasses = `
    group relative inline-flex items-center justify-center
    px-9 py-4
    border border-primary
    rounded-full
    bg-primary text-background
    text-[10px] md:text-[11px]
    font-bold uppercase tracking-[0.22em]
    transition-all duration-300
    hover:bg-transparent hover:text-primary
    active:scale-[0.98]
    disabled:opacity-40
    disabled:cursor-not-allowed
    ${fullWidth ? "w-full" : ""}
  `;

  const Content = () => (
    <>
      <span>{text}</span>

      {/* Small accent detail */}
      <span
        className="
          absolute right-3
          w-1.5 h-1.5
          rounded-full
          bg-current
          opacity-0
          scale-0
          transition-all duration-300
          group-hover:opacity-100
          group-hover:scale-100
        "
      />
    </>
  );

  if (link) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
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
      whileHover={{ y: -2 }}
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