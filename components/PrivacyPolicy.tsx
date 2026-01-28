"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-background text-neutral py-24 md:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-20 md:mb-32">
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.5em] block mb-4">
            Legal & Transparency
          </span>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter">
            Privacy <span className="text-neutral/20 italic font-light">Policy</span>
          </h1>
          <p className="mt-6 text-[11px] uppercase tracking-widest text-neutral/40 font-medium">
            Effective Date: 09 August 2025
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {/* Section 0: Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Commitment</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg md:text-xl font-light leading-relaxed text-neutral/80">
                At <span className="text-neutral font-medium">Zi Creates</span>, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains our digital handshake—how we safeguard your presence while you interact with our brand.
              </p>
            </div>
          </div>

          {/* Section 1: Information */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral/30">01. Information Collection</h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider">Personal Data</h4>
                  <p className="text-sm text-neutral/50 font-light leading-relaxed">Name, email, phone number, and company identifiers required for professional onboarding.</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider">Project Intelligence</h4>
                  <p className="text-sm text-neutral/50 font-light leading-relaxed">Details about your brand requirements, design preferences, and creative assets.</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider">Secure Payment</h4>
                  <p className="text-sm text-neutral/50 font-light leading-relaxed">Financial data processed via encrypted third-party providers (Flutterwave, PayPal).</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider">Technical footprint</h4>
                  <p className="text-sm text-neutral/50 font-light leading-relaxed">IP address, browser type, and usage patterns analyzed through cookie technologies.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Usage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral/30">02. Purpose & Usage</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-4">
                {["Managing creative services", "Processing secure subscriptions", "Strategic communications", "Refining user experience", "Legal compliance"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-light text-neutral/60">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3: Rights & Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral/30">03. Rights & Access</h2>
            </div>
            <div className="lg:col-span-8 space-y-12">
              <p className="text-sm text-neutral/50 font-light leading-relaxed max-w-2xl">
                You hold the rights to your data. This includes the right to access, correction, or deletion. We do not sell your personal data to third parties—ever.
              </p>
              
              <div className="p-8 rounded-[2rem] border border-neutral/10 bg-neutral/[0.02]">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Inquiries</h4>
                <a 
                  href="mailto:support@zicreates.com" 
                  className="text-2xl md:text-3xl font-bold tracking-tighter hover:text-primary transition-colors duration-300"
                >
                  support@zicreates.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;