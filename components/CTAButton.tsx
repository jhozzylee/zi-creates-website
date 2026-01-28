"use client";

import Link from "next/link";

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
  
  // High-end Button Logic:
  // 1. Persistent border to prevent layout shift
  // 2. Cubic-bezier for a "silkier" animation
  // 3. Subtle glow on hover
  const baseClasses = `
    relative inline-flex items-center justify-center
    text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] 
    py-4 px-12 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
    bg-primary text-background border border-primary
    hover:bg-transparent hover:text-primary 
    hover:shadow-[0_0_20px_rgba(48,213,200,0.3)]
    active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? "w-full rounded-none" : "rounded-full"} 
    no-underline cursor-pointer overflow-hidden group
  `;

  // Content wrapper to ensure text sits above any background effects
  const Content = () => (
    <span className="relative z-10">{text}</span>
  );

  if (link) {
    return (
      <Link href={link} className={baseClasses}>
        <Content />
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      className={baseClasses} 
      onClick={onClick}
      disabled={disabled}
    >
      <Content />
    </button>
  );
};

export default CTAButton;