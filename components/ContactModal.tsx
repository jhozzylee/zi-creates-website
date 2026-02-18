"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CTAButton from "./CTAButton";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 30,
  stiffness: 250,
  mass: 1,
};

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    contact: "",
    note: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          setFormData((prev) => ({
            ...prev,
            contact: data?.country_calling_code || "+1",
          }));
        })
        .catch(() => {
          setFormData((prev) => ({ ...prev, contact: "+1" }));
        });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.note.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://sheetdb.io/api/v1/44eyixm95etfh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("A connection error occurred. Please check your network.");
      console.error("❌ Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={fluidTransition}
            className="relative bg-background border border-neutral/10 text-neutral w-full max-w-5xl max-h-[95vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            
            {/* Sticky Header */}
            <div className="flex-shrink-0 z-20 bg-background/90 backdrop-blur-md border-b border-neutral/10 p-8 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-primary mb-2 block">
                  Get In Touch
                </span>
                <h2 className="text-[32px] md:text-[48px] font-bold leading-tight tracking-tight">
                  Contact <span className="text-primary italic font-serif font-light">Zi Creates</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="absolute top-8 right-8 text-neutral/40 hover:text-primary transition-colors text-2xl z-30"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-8 md:p-16 flex-1 no-scrollbar">
              {/* Info Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  href="mailto:support@zicreates.com"
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-neutral/5 border border-neutral/5 hover:border-primary/20 transition-all"
                >
                  <div className="text-primary text-xl font-light italic">@</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral/40">Email Us</p>
                    <p className="font-medium group-hover:text-primary transition-colors">support@zicreates.com</p>
                  </div>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  href="tel:+2348137956463"
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-neutral/5 border border-neutral/5 hover:border-primary/20 transition-all"
                >
                  <div className="text-primary text-xl font-light italic">#</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral/40">Call Us</p>
                    <p className="font-medium group-hover:text-primary transition-colors">+234 813 795 6463</p>
                  </div>
                </motion.a>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center"
                >
                  <div className="text-5xl mb-6">📩</div>
                  <h3 className="text-2xl font-bold mb-2">Message Received</h3>
                  <p className="text-neutral/60 font-light italic">Our specialists will respond within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                    <InputField
                      label="Full Name *"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      label="Email *"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      label="Phone Number"
                      name="contact"
                      placeholder="+1 (234) 567 8901"
                      value={formData.contact}
                      onChange={handleChange}
                    />
                    <InputField
                      label="Company Name"
                      name="company"
                      placeholder="Your organization"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-neutral/50">Your Message *</label>
                    <textarea
                      name="note"
                      placeholder="How can we help?"
                      className="w-full p-5 rounded-2xl border border-neutral/10 bg-neutral/5 min-h-[150px] focus:border-primary/50 focus:bg-primary/5 outline-none transition-all placeholder:text-neutral/30 text-base"
                      value={formData.note}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm font-medium animate-pulse">{error}</p>
                  )}

                  <div className="flex justify-end pt-4">
                    <CTAButton
                      text={isSubmitting ? "Sending..." : "Send Message"}
                      onClick={undefined} // Let form submit trigger it
                      disabled={isSubmitting}
                    />
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const InputField = ({ label, name, type = "text", placeholder, value, onChange, required }: any) => (
  <div className="flex flex-col gap-3">
    <label className="text-sm font-bold uppercase tracking-wider text-neutral/50">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full px-5 py-4 rounded-xl border border-neutral/10 bg-neutral/5 focus:border-primary/50 focus:bg-primary/5 outline-none transition-all placeholder:text-neutral/30 text-base"
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default ContactModal;