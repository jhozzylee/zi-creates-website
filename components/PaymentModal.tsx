"use client";

import React, { useState, useEffect } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
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

const HEADER_HEIGHT = 120;

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
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) =>
        setFormData((prev) => ({
          ...prev,
          phone: data?.country_calling_code || "+1",
        }))
      )
      .catch(() => setFormData((prev) => ({ ...prev, phone: "+1" })));
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 1. Define the core configuration (without callback/onClose)
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

  // 2. Initialize the hook with the config
  const handleFlutterPayment = useFlutterwave(config);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.email || !formData.description) {
      setError("Please complete all required fields.");
      return;
    }
    setError("");
    setIsPaying(true);

    // 3. Pass the callback and onClose here to fix the TS error
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-background border border-neutral/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
        {/* FIXED HEADER */}
        <div
          className="absolute top-0 left-0 right-0 z-30 bg-background border-b border-neutral/10 px-6 md:px-10 flex items-center justify-between"
          style={{ height: HEADER_HEIGHT }}
        >
          <div>
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] block mb-1">
              Onboarding
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Let’s get you <span className="text-neutral/30 italic font-light">started</span>
            </h2>
          </div>
          <button onClick={onClose} className="text-neutral/40 hover:text-primary transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div
          className="overflow-y-auto px-6 md:px-10 pb-16"
          style={{ paddingTop: HEADER_HEIGHT + 24, maxHeight: "90vh" }}
        >
          {submitted ? (
            <div className="py-24 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-3xl font-bold">Welcome to the Club</h3>
              <p className="text-neutral/40 max-w-sm">
                Payment successful. Our creative team is already preparing for your launch.
              </p>
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField
                  icon={<Building2 size={16} />}
                  label="Company Name"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
                <InputField
                  icon={<Mail size={16} />}
                  label="Email Address"
                  name="email"
                  type="email"
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

              <textarea
                name="description"
                placeholder="Briefly describe your project goals..."
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-6 rounded-[1.5rem] border border-neutral/10 bg-neutral/[0.03] min-h-[140px] outline-none focus:border-primary/50 transition-all text-base resize-none"
              />

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/5 p-4 rounded-xl">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-neutral/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral/40">Selected Plan</span>
                  <p className="text-xl font-bold">{selectedPlan?.title} • ${selectedPlan?.price}</p>
                </div>
                <CTAButton text={isPaying ? "Connecting..." : "Secure Payment"} type="submit" disabled={isPaying} />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- Sub-components with types for build stability ---------- */

const InputField = ({ label, icon, ...props }: { label: string; icon: React.ReactNode; [key: string]: any }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] uppercase tracking-widest font-bold text-neutral/40 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral/20">{icon}</div>
      <input
        {...props}
        className="w-full pl-12 pr-6 py-4 rounded-full border border-neutral/10 bg-neutral/[0.03] outline-none focus:border-primary/50 transition-all text-base"
      />
    </div>
  </div>
);

const SelectField = ({ label, icon, options, ...props }: { label: string; icon: React.ReactNode; options: string[]; [key: string]: any }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] uppercase tracking-widest font-bold text-neutral/40 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral/20 pointer-events-none">{icon}</div>
      <select
        {...props}
        className="w-full pl-12 pr-10 py-4 rounded-full border border-neutral/10 bg-neutral/[0.03] outline-none focus:border-primary/50 transition-all text-base appearance-none cursor-pointer"
      >
        <option value="">Select industry</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  </div>
);

export default PaymentModal;