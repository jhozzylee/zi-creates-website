"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FaFacebookF, 
  FaXTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube 
} from "react-icons/fa6";

import ContactModal from "./ContactModal";
import PartnerAffiliateModal from "./AffiliateModal";

const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#050505] text-neutral px-6 pt-20 pb-10 border-t border-neutral/5">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img src="/Footer_Logo.svg" alt="Zi Creates" className="w-[140px] mb-6 opacity-90" />
            <p className="text-sm font-light leading-relaxed text-neutral/60 max-w-[220px]">
              The all-in-one digital agency elevating visions into world-class brands.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary mb-6">Services</h4>
            <ul className="space-y-4 text-sm font-light text-neutral/50">
              <li className="hover:text-primary transition-colors"><Link href="/corporate-branding">Branding</Link></li>
              <li className="hover:text-primary transition-colors"><Link href="/visual-design">Visual Design</Link></li>
              <li className="hover:text-primary transition-colors"><Link href="/video-production">Video Production</Link></li>
              <li className="hover:text-primary transition-colors"><Link href="/web-development">Websites</Link></li>
              <li className="hover:text-primary transition-colors"><Link href="/ai-automation">AI Automation</Link></li>
              <li className="hover:text-primary transition-colors"><Link href="/marketing">Marketing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-light text-neutral/50">
              <li className="hover:text-primary transition-colors"><Link href="/about">About Us</Link></li>
              <li className="hover:text-primary transition-colors"><Link href="/portfolio">Our Works</Link></li>
              <li className="hover:text-primary transition-colors"><Link href="/blogs">Blogs</Link></li>
              <li className="hover:text-primary transition-colors"><Link href="/careers">Careers</Link></li>
              <li className="hover:text-primary transition-colors">
                <button
                  onClick={() => setIsPartnerOpen(true)}
                  className="text-left text-sm font-light cursor-pointer"
                >
                  Partner Program
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary mb-6">Connect</h4>
            <ul className="space-y-4 text-sm font-light text-neutral/50">
              <li className="hover:text-primary transition-colors"><a href="mailto:support@zicreates.com">support@zicreates.com</a></li>
              <li className="hover:text-primary transition-colors"><a href="tel:+2348137956463">+234 813 795 6463</a></li>
              <li className="hover:text-primary transition-colors">
                <button onClick={() => setIsContactOpen(true)} className="text-left">
                  General Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-primary mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-light text-neutral/50">
              <li className="hover:text-primary transition-colors"><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li className="hover:text-primary transition-colors"><Link href="/terms-of-service">Terms of Service</Link></li>
              <li className="hover:text-primary transition-colors"><Link href="/refund-policy">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 w-full max-w-[1280px] mx-auto" />

        {/* Bottom Row */}
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center pt-10 gap-6">
          <p className="text-[13px] text-neutral/40 font-light">
            © 2026 Zi Creates. Handcrafted for excellence.
          </p>

          <div className="flex gap-3">
            <SocialIcon href="https://facebook.com/..." icon={<FaFacebookF size={14} />} />
            <SocialIcon href="https://x.com/..." icon={<FaXTwitter size={14} />} />
            <SocialIcon href="https://instagram.com/..." icon={<FaInstagram size={14} />} />
            <SocialIcon href="https://linkedin.com/..." icon={<FaLinkedinIn size={14} />} />
            <SocialIcon href="https://youtube.com/..." icon={<FaYoutube size={14} />} />
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <PartnerAffiliateModal isOpen={isPartnerOpen} onClose={() => setIsPartnerOpen(false)} />
    </>
  );
};

const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral/10 text-neutral/60 transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/5"
  >
    {icon}
  </a>
);

export default Footer;