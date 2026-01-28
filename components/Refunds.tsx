"use client";

import React from "react";

const Refund = () => {
  return (
    <section className="bg-background text-neutral py-24 md:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-20 md:mb-32">
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.5em] block mb-4">
            Financial Terms
          </span>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter">
            Refund <span className="text-neutral/20 italic font-light">Policy</span>
          </h1>
          <p className="mt-6 text-[11px] uppercase tracking-widest text-neutral/40 font-medium">
            Effective Date: 09 August 2025
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {/* Section 0: Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Philosophy</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg md:text-xl font-light leading-relaxed text-neutral/80">
                At <span className="text-neutral font-medium">Zi Creates</span>, our focus is on the bespoke delivery of high-value creative assets. Due to the intensive nature of our design and development process, we operate under a strict resource-allocation model.
              </p>
            </div>
          </div>

          {/* Section 1: Subscriptions & Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral/30">01. Service Terms</h2>
            </div>
            <div className="lg:col-span-8 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider">Membership Plans</h4>
                  <p className="text-sm text-neutral/50 font-light leading-relaxed mb-4">
                    Subscription fees are non-refundable once the billing cycle begins. Cancellations must be made 3 business days prior to renewal.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wider">One-Time Projects</h4>
                  <p className="text-sm text-neutral/50 font-light leading-relaxed">
                    A 50% non-refundable deposit is required to secure studio time. Final balances are due upon masterpiece delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Exceptions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral/30">02. Exceptions</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="p-8 rounded-[2rem] border border-neutral/10 bg-neutral/[0.02]">
                <p className="text-sm text-neutral/60 font-light mb-6">
                  Refunds are exclusively considered for duplicate payment errors or non-delivery of service where no work has commenced.
                </p>
                <ul className="space-y-4">
                  {[
                    "Requests must be filed within 7 days",
                    "Processing time: 5–10 business days",
                    "Transaction fees are non-refundable"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-neutral/40">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Contact (The Signature Box) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral/30">03. Support</h2>
            </div>
            <div className="lg:col-span-8 space-y-12">
              <div className="p-8 rounded-[2rem] border border-neutral/10 bg-neutral/[0.02]">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Financial Inquiries</h4>
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

export default Refund;