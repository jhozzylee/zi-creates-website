"use client";

import React, { useState, useEffect } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { X, CheckCircle2, AlertCircle, Building2, Mail, Phone, Briefcase } from "lucide-react";
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

// Optional: Type for Flutterwave payment config
interface FlutterwavePaymentConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options: string;
  payment_plan?: string;
  customer: {
    email: string;
    name: string;
    phone_number: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
  callback: (response: any) => void;
  onClose: () => void;
}

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

  // Auto-fill country code using IP
  useEffect(() => {
    if (isOpen) {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) =>
          setFormData((prev) => ({ ...prev, phone: data?.country_calling_code || "+1" }))
        )
        .catch(() => setFormData((prev) => ({ ...prev, phone: "+1" })));
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Flutterwave config
  const config: FlutterwavePaymentConfig = {
    public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY || "",
    tx_ref: `ZIC-${Date.now()}`,
    amount: selectedPlan?.price || 0,
    currency: "USD",
    payment_options: "card,ussd,banktransfer",
    payment_plan: selectedPlan?.planId || "",
    customer: {
      email: formData.email,
      name: formData.company,
      phone_number: formData.phone || "+10000000000",
    },
    customizations: {
      title: `ZI Creates - ${selectedPlan?.title}`,
      description: "Boutique Creative Membership",
      logo: "https://zicreates.com/logo512.png",
    },
    callback: (response: any) => {
      setSubmitted(true);

      const nextBillingDate = new Date();
      nextBillingDate.setDate(nextBillingDate.getDate() + 30);

      const payload = {
        ...formData,
        plan: selectedPlan?.title,
        amount: selectedPlan?.price,
        tx_ref: response.tx_ref,
        status: response.status,
        timestamp: new Date().toISOString(),
        next_billing_date: nextBillingDate.toISOString(),
      };

      // Send data to Make and SheetDB
      Promise.all([
        fetch("https://hook.us2.make.com/24c46m8vplnnst93l3xlba6sakukrkj6", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        fetch("https://sheetdb.io/api/v1/sfstsm92m5k39", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: payload }),
        }),
      ]);

      setTimeout(() => {
        setSubmitted(false);
        onClose();
        closePaymentModal();
      }, 4000);
    },
    onClose: () => {
      onClose();
      setIsPaying(false);
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.email || !formData.description) {
      setError("Please complete all required fields to continue.");
      return;
    }
    setError("");
    setIsPaying(true);
    handleFlutterPayment({
      callback: (res) => config.callback(res),
      onClose: config.onClose,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-xl bg-black/40">
      <div className="bg-background border border-neutral/10 text-neutral w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] relative no-scrollbar">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-8 right-8 text-neutral/30 hover:text-primary transition-colors z-10">
          <X size={24} />
        </button>

        <div className="p-8 md:p-16">
          {submitted ? (
            <div className="py-20 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter">Welcome to the inner circle.</h2>
              <p className="text-neutral/40 max-w-sm">Your payment was successful. We're setting up your dashboard and will be in touch shortly.</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] block mb-2">Onboarding</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
                  Let’s get you <span className="text-neutral/30 italic font-light">started</span>
                </h2>
              </div>

              <form className="space-y-10" onSubmit={handlePay}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <InputField icon={<Building2 size={16} />} label="Company Name" name="company" placeholder="e.g. Acme Corp" value={formData.company} onChange={handleChange} required />
                  <InputField icon={<Mail size={16} />} label="Email Address" name="email" type="email" placeholder="you@company.com" value={formData.email} onChange={handleChange} required />
                  <InputField icon={<Phone size={16} />} label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                  <SelectField
                    icon={<Briefcase size={16} />}
                    label="Industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    options={["Tech", "Fashion", "Health", "Real Estate", "Finance", "Other"]}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-neutral/40 ml-1">Project Brief</label>
                  <textarea
                    name="description"
                    placeholder="Briefly describe your creative needs..."
                    className="w-full p-6 rounded-[1.5rem] border border-neutral/10 bg-neutral/[0.03] min-h-[140px] outline-none focus:border-primary/50 transition-all text-sm leading-relaxed resize-none"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/5 p-4 rounded-xl border border-red-400/10">
                    <AlertCircle size={14} /> {error}
                  </div>
                )}

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6 border-t border-neutral/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-neutral/30">Selected Plan</span>
                    <span className="text-xl font-bold">{selectedPlan?.title} • ${selectedPlan?.price}</span>
                  </div>
                  <div className="w-full md:w-auto min-w-[240px]">
                    <CTAButton text={isPaying ? "Connecting..." : `Secure Payment`} type="submit" disabled={isPaying} />
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Internal Sub-components
const InputField = ({ label, icon, ...props }: any) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] uppercase tracking-widest font-bold text-neutral/40 ml-1">{label}</label>
    <div className="relative flex items-center">
      <div className="absolute left-5 text-neutral/20 group-focus-within:text-primary transition-colors">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-12 pr-6 py-4 rounded-full border border-neutral/10 bg-neutral/[0.03] outline-none focus:border-primary/50 transition-all text-sm"
      />
    </div>
  </div>
);

const SelectField = ({ label, icon, options, ...props }: any) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] uppercase tracking-widest font-bold text-neutral/40 ml-1">{label}</label>
    <div className="relative flex items-center">
      <div className="absolute left-5 text-neutral/20 group-focus-within:text-primary transition-colors pointer-events-none">
        {icon}
      </div>
      <select
        {...props}
        className="w-full pl-12 pr-10 py-4 rounded-full border border-neutral/10 bg-neutral/[0.03] outline-none focus:border-primary/50 transition-all text-sm appearance-none cursor-pointer"
      >
        <option value="">Select industry</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt} className="bg-[#0a0a0a]">
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default PaymentModal;
