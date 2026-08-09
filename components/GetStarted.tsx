"use client";

import React, { useState, useEffect } from "react";
import CTAButton from "./CTAButton";

interface GetStartedProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetStarted = ({ isOpen, onClose }: GetStartedProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    contact: "",
    source: "",
    budget: "",
    note: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    
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
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.note.trim()) return;

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
        alert("❌ Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Failed to send message. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Form Container */}
      <div className="relative bg-background border border-neutral/10 text-neutral w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8 md:p-16 shadow-2xl animate-in fade-in zoom-in duration-300">
        
        <button
          onClick={onClose}
          className="absolute top-8 right-10 text-neutral/40 hover:text-primary transition-colors text-2xl"
        >
          ✕
        </button>

        <div className="mb-10">
          <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary mb-4 block">Onboarding</span>
          <h2 className="text-[32px] md:text-[48px] font-bold leading-tight">
            In need of <span className="text-primary">creative?</span>
          </h2>
          <p className="text-neutral/60 font-light mt-2">Tell us about your project and let’s build something unforgettable.</p>
        </div>

        {submitted ? (
          <div className="py-20 text-center space-y-4">
            <div className="text-6xl mb-6">✅</div>
            <h3 className="text-2xl font-bold">Message Sent!</h3>
            <p className="text-neutral/60 font-light">We'll get back to you within 24 hours.</p>
          </div>
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
                placeholder="john@company.com"
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
                required
              />
              <InputField
                label="Company Name"
                name="company"
                placeholder="Acme Corp"
                value={formData.company}
                onChange={handleChange}
              />
              <SelectField
                label="How did you find us? *"
                name="source"
                options={["Social Media", "Referral", "Ads", "Google Search", "Other"]}
                value={formData.source}
                onChange={handleChange}
                required
              />
              <SelectField
                label="Project Budget"
                name="budget"
                options={["Under $1,000", "$1,000 – $5,000", "$5,000 – $10,000", "Above $10,000"]}
                value={formData.budget}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold uppercase tracking-wider text-neutral/50">Additional Note *</label>
              <textarea
                name="note"
                placeholder="Briefly describe your goals..."
                className="w-full p-5 rounded-2xl border border-neutral/10 bg-neutral/5 min-h-[150px] focus:border-primary/50 focus:bg-primary/5 outline-none transition-all placeholder:text-neutral/30"
                value={formData.note}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pt-4 flex justify-end">
              <CTAButton text="Send Message" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default GetStarted;

const InputField = ({ label, name, type = "text", placeholder, value, onChange, required }: any) => (
  <div className="flex flex-col gap-3">
    <label className="text-sm font-bold uppercase tracking-wider text-neutral/50">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full px-5 py-4 rounded-xl border border-neutral/10 bg-neutral/5 focus:border-primary/50 focus:bg-primary/5 outline-none transition-all placeholder:text-neutral/30"
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const SelectField = ({ label, name, options, value, onChange, required }: any) => (
  <div className="flex flex-col gap-3">
    <label className="text-sm font-bold uppercase tracking-wider text-neutral/50">{label}</label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-5 py-4 rounded-xl border border-neutral/10 bg-neutral/5 focus:border-primary/50 focus:bg-primary/5 outline-none appearance-none cursor-pointer transition-all"
        required={required}
      >
        <option value="" disabled hidden className="text-neutral/30">Select option...</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt.toLowerCase()} className="bg-background text-neutral">
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral/30 text-xs">▼</div>
    </div>
  </div>
);