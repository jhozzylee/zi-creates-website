"use client";

import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookCallProps {
  isOpen: boolean;
  onClose: () => void;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 30,
  stiffness: 250,
  mass: 1,
};

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

  // Handle background scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/60 backdrop-blur-xl"
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={fluidTransition}
            className="relative bg-background border border-neutral/10 text-neutral w-full max-w-5xl max-h-[95vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            
            {/* Header Section */}
            <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-neutral/10 px-8 py-10 md:px-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-1">
                <span className="uppercase tracking-widest text-[10px] font-bold text-primary">Strategy Session</span>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral tracking-tight">
                  Let’s build a <span className="text-primary italic font-serif font-light">Smarter Brand</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="absolute top-8 right-10 text-neutral/40 hover:text-primary transition-colors text-2xl z-30"
              >
                ✕
              </button>
            </div>

            {/* Booking Interface - Using an inner container to manage scrolling */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
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
              <p className="mt-8 mb-4 text-center text-sm text-neutral/40 font-light">
                Can't find a time that works? Reach out at <span className="text-neutral font-medium">support@zicreates.com</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookCall;