"use client";

import React, { useState, useEffect } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Building2,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import CTAButton from "./CTAButton";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    title: string;
    price: number;
    planId: string;
  } | null;
}

interface FormData {
  company: string;
  email: string;
  phone: string;
  industry: string;
  description: string;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 30,
  stiffness: 250,
  mass: 1,
};

const PaymentModal = ({ isOpen, onClose, selectedPlan }: PaymentModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    email: "",
    phone: "",
    industry: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    
    // Geo-target phone code
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) =>
        setFormData((prev) => ({
          ...prev,
          phone: data?.country_calling_code || "+1",
        }))
      )
      .catch(() => setFormData((prev) => ({ ...prev, phone: "+1" })));
      
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY || "",
    tx_ref: `ZIC-${Date.now()}`,
    amount: selectedPlan?.price || 0,
    currency: "USD",
    payment_options: "card,ussd,banktransfer",
    payment_plan: selectedPlan?.planId,
    customer: {
      email: formData.email,
      name: formData.company,
      phone_number: formData.phone || "+10000000000",
    },
    customizations: {
      title: `Zi Creates — ${selectedPlan?.title}`,
      description: "Boutique Creative Membership",
      logo: "https://zicreates.com/logo512.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.email || !formData.description) {
      setError("Please complete all required fields.");
      return;
    }
    setError("");
    setIsPaying(true);

    handleFlutterPayment({
      callback: (response: any) => {
        if (response.status === "successful") {
          setSubmitted(true);
          setTimeout(() => {
            closePaymentModal();
            onClose();
            setSubmitted(false);
            setIsPaying(false);
          }, 4000);
        } else {
          setError("Payment was not successful. Please try again.");
          setIsPaying(false);
          closePaymentModal();
        }
      },
      onClose: () => {
        setIsPaying(false);
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl" 
            onClick={onClose} 
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={fluidTransition}
            className="relative w-full max-w-4xl max-h-[90vh] bg-background border border-neutral/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* 🔒 FIXED HEADER (Stable flex-shrink-0) */}
            <div className="flex-shrink-0 z-30 bg-background border-b border-neutral/10 px-8 md:px-12 pt-10 pb-8 flex items-start justify-between">
              <div>
                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] block mb-2">
                  Onboarding
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
                  Let’s get you <span className="text-primary italic font-serif font-light">started</span>
                </h2>
              </div>
              <button 
                onClick={onClose} 
                className="mt-2 text-neutral/40 hover:text-primary transition-colors p-2"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* 📜 SCROLLABLE BODY */}
            <div className="overflow-y-auto px-8 md:px-12 pb-12 pt-10 no-scrollbar">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-20 flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 size={48} strokeWidth={1} />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">Welcome to the Club</h3>
                  <p className="text-neutral/40 max-w-sm font-light">
                    Payment successful. Our creative team is already preparing for your launch. Check your email for next steps.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handlePay} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField
                      icon={<Building2 size={16} />}
                      label="Company Name"
                      name="company"
                      placeholder="e.g. Acme Corp"
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      icon={<Mail size={16} />}
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="hello@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      icon={<Phone size={16} />}
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <SelectField
                      icon={<Briefcase size={16} />}
                      label="Industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      options={["Tech", "Fashion", "Health", "Real Estate", "Finance", "Other"]}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-neutral/40 ml-1">Project Brief</label>
                    <textarea
                      name="description"
                      placeholder="Tell us about your immediate goals..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="w-full p-8 rounded-[2rem] border border-neutral/10 bg-neutral/[0.03] min-h-[160px] outline-none focus:border-primary/50 transition-all text-base resize-none font-light leading-relaxed"
                    />
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 text-red-400 text-xs bg-red-400/5 p-5 rounded-2xl border border-red-400/10"
                    >
                      <AlertCircle size={14} /> {error}
                    </motion.div>
                  )}

                  {/* FORM FOOTER */}
                  <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-neutral/5">
                    <div className="text-center md:text-left">
                      <span className="text-[10px] uppercase tracking-widest text-neutral/40 font-bold block mb-1">Membership Plan</span>
                      <p className="text-xl font-bold tracking-tight">{selectedPlan?.title} <span className="text-primary mx-2">/</span> ${selectedPlan?.price}</p>
                    </div>
                    <CTAButton 
                      text={isPaying ? "Connecting..." : "Initialize Onboarding"} 
                      type="submit" 
                      disabled={isPaying} 
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

/* ---------- Polished Sub-components ---------- */

const InputField = ({ label, icon, ...props }: { label: string; icon: React.ReactNode; [key: string]: any }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] uppercase tracking-widest font-bold text-neutral/40 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral/20 group-focus-within:text-primary transition-colors">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-14 pr-6 py-5 rounded-full border border-neutral/10 bg-neutral/[0.03] outline-none focus:border-primary/50 transition-all text-base font-light placeholder:text-neutral/20"
      />
    </div>
  </div>
);

const SelectField = ({ label, icon, options, ...props }: { label: string; icon: React.ReactNode; options: string[]; [key: string]: any }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] uppercase tracking-widest font-bold text-neutral/40 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral/20 pointer-events-none">{icon}</div>
      <select
        {...props}
        className="w-full pl-14 pr-10 py-5 rounded-full border border-neutral/10 bg-neutral/[0.03] outline-none focus:border-primary/50 transition-all text-base appearance-none cursor-pointer font-light"
      >
        <option value="">Select industry</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-background text-neutral">{opt}</option>
        ))}
      </select>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
);

export default PaymentModal;