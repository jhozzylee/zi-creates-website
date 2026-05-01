"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FaFacebookF, 
  FaXTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube 
} from "react-icons/fa6";

import ContactModal from "./ContactModal";
import PartnerAffiliateModal from "./AffiliateModal";

const fluidTransition = {
  type: "spring" as const,
  damping: 35,
  stiffness: 200,
  mass: 1,
};

const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { ...fluidTransition, delay: i * 0.1 }
    })
  };

  return (
    <>
      <footer className="bg-[#050505] text-neutral px-6 pt-20 pb-10 border-t border-neutral/5 overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <motion.div 
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={columnVariants}
            className="lg:col-span-1"
          >
            <img src="/Footer_Logo.svg" alt="Zi Creates" className="w-[140px] mb-6 opacity-90" />
            <p className="text-sm font-light leading-relaxed text-neutral/60 max-w-[220px]">
              The all-in-one digital agency elevating visions into world-class brands.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={columnVariants}>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary mb-6">Services</h4>
            <ul className="space-y-4 text-sm font-light text-neutral/50">
              <li className="hover:text-primary transition-colors duration-300"><Link href="/corporate-branding">Branding</Link></li>
              <li className="hover:text-primary transition-colors duration-300"><Link href="/visual-design">Visual Design</Link></li>
              <li className="hover:text-primary transition-colors duration-300"><Link href="/video-production">Video Production</Link></li>
              <li className="hover:text-primary transition-colors duration-300"><Link href="/web-development">Websites</Link></li>
              <li className="hover:text-primary transition-colors duration-300"><Link href="/ai-automation">AI Automation</Link></li>
              <li className="hover:text-primary transition-colors duration-300"><Link href="/marketing">Marketing</Link></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={columnVariants}>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-light text-neutral/50">
              <li className="hover:text-primary transition-colors duration-300"><Link href="/about">About Us</Link></li>
              <li className="hover:text-primary transition-colors duration-300"><Link href="/portfolio">Our Works</Link></li>
              <li className="hover:text-primary transition-colors duration-300"><Link href="/blogs">Blogs</Link></li>
              <li className="hover:text-primary transition-colors duration-300"><Link href="/careers">Careers</Link></li>
              <li className="hover:text-primary transition-colors duration-300">
                <button onClick={() => setIsPartnerOpen(true)} className="text-left text-sm font-light cursor-pointer">
                  Partner Program
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={columnVariants}>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary mb-6">Connect</h4>
            <ul className="space-y-4 text-sm font-light text-neutral/50">
              <li className="hover:text-primary transition-colors duration-300"><a href="mailto:support@zicreates.com">support@zicreates.com</a></li>
              <li className="hover:text-primary transition-colors duration-300"><a href="tel:+2348137956463">+1 586-615-2470</a></li>
              <li className="hover:text-primary transition-colors duration-300">
                <button onClick={() => setIsContactOpen(true)} className="text-left">
                  General Inquiries
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={columnVariants}>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-light text-neutral/50">
              <li className="hover:text-primary transition-colors duration-300"><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li className="hover:text-primary transition-colors duration-300"><Link href="/terms-of-service">Terms of Service</Link></li>
              <li className="hover:text-primary transition-colors duration-300"><Link href="/refund-policy">Refund Policy</Link></li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "circOut" }}
          className="h-px bg-white/5 w-full max-w-[1280px] mx-auto origin-left" 
        />

        {/* Bottom Row */}
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center pt-10 gap-6">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[13px] text-neutral/40 font-light"
          >
            © 2026 Zi Creates. Handcrafted for excellence.
          </motion.p>

          <div className="flex gap-3">
            <SocialIcon href="https://www.facebook.com/share/1FGE8KdnaC/?mibextid=wwXIfr" icon={<FaFacebookF size={14} />} index={0} />
            <SocialIcon href="https://x.com/zi_creates?s=21&t=dDLLPjZbCvMQqDOtc57kOw" icon={<FaXTwitter size={14} />} index={1} />
            <SocialIcon href="https://www.instagram.com/zi_creates/profilecard/?igsh=dG8ybjE3M21ha2tk" icon={<FaInstagram size={14} />} index={2} />
            <SocialIcon href="https://www.linkedin.com/company/zi-creates" icon={<FaLinkedinIn size={14} />} index={3} />
            <SocialIcon href="https://youtube.com/..." icon={<FaYoutube size={14} />} index={4} />
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <PartnerAffiliateModal isOpen={isPartnerOpen} onClose={() => setIsPartnerOpen(false)} />
    </>
  );
};

const SocialIcon = ({ href, icon, index }: { href: string; icon: React.ReactNode; index: number }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ ...fluidTransition, delay: 0.5 + (index * 0.05) }}
    whileHover={{ 
      y: -4, 
      backgroundColor: "rgba(48, 213, 200, 0.05)", 
      borderColor: "rgba(48, 213, 200, 1)",
      color: "rgba(48, 213, 200, 1)"
    }}
    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral/10 text-neutral/60 transition-colors duration-300"
  >
    {icon}
  </motion.a>
);

export default Footer;