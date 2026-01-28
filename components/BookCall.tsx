"use client";

import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface BookCallProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookCall = ({ isOpen, onClose }: BookCallProps) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "booking" });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#30D5C8" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-background border border-neutral/10 max-w-5xl w-full rounded-[2.5rem] p-6 md:p-12 shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 px-2">
          <div className="space-y-1">
            <span className="uppercase tracking-widest text-xs font-bold text-primary">Strategy Session</span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral">
              Let’s build your <span className="text-primary">Vision</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-8 right-10 text-neutral/40 hover:text-primary transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Booking Interface */}
        <div className="h-[600px] md:h-[650px] w-full bg-neutral/5 rounded-2xl overflow-hidden border border-neutral/5">
          <Cal
            namespace="booking"
            calLink="zi-creates/booking"
            style={{
              width: "100%",
              height: "100%",
              overflow: "auto",
            }}
            config={{
              layout: "month_view",
              theme: "dark",
            }}
          />
        </div>

        {/* Footer Support Note */}
        <p className="mt-6 text-center text-sm text-neutral/40 font-light">
          Can't find a time that works? Reach out at <span className="text-neutral">support@zicreates.com</span>
        </p>
      </div>
    </div>
  );
};

export default BookCall;