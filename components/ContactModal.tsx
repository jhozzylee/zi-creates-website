"use client";

import React, { useState, useEffect } from "react";
import CTAButton from "./CTAButton";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.note.trim()) return;

    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Container */}
      <div className="relative bg-background border border-neutral/10 text-neutral w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-[2.5rem] p-8 md:p-16 shadow-2xl animate-in fade-in zoom-in duration-300">
        
        <button
          onClick={onClose}
          className="absolute top-8 right-10 text-neutral/40 hover:text-primary transition-colors text-2xl"
        >
          ✕
        </button>

        {/* Header Area */}
        <div className="mb-12">
          <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary mb-4 block">Get In Touch</span>
          <h2 className="text-[32px] md:text-[48px] font-bold leading-tight mb-4">
            Contact <span className="text-primary">Zi Creates</span>
          </h2>
          <p className="text-lg text-neutral/60 font-light max-w-xl">
            Have questions, project ideas, or just want to say hi? We’d love to hear from you.
          </p>
        </div>

        {/* Info Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <a href="mailto:support@zicreates.com" className="group flex items-center gap-4 p-5 rounded-2xl bg-neutral/5 border border-neutral/5 hover:border-primary/20 transition-all">
            <div className="text-primary text-xl font-light italic">@</div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral/40">Email Us</p>
              <p className="font-medium group-hover:text-primary transition-colors">support@zicreates.com</p>
            </div>
          </a>
          <a href="tel:+2348137956463" className="group flex items-center gap-4 p-5 rounded-2xl bg-neutral/5 border border-neutral/5 hover:border-primary/20 transition-all">
            <div className="text-primary text-xl font-light italic">#</div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral/40">Call Us</p>
              <p className="font-medium group-hover:text-primary transition-colors">+234 813 795 6463</p>
            </div>
          </a>
        </div>

        {submitted ? (
          <div className="py-20 text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="text-5xl mb-6">📩</div>
            <h3 className="text-2xl font-bold mb-2">Message Received</h3>
            <p className="text-neutral/60 font-light italic">We'll get back to you shortly.</p>
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
                className="w-full p-5 rounded-2xl border border-neutral/10 bg-neutral/5 min-h-[150px] focus:border-primary/50 focus:bg-primary/5 outline-none transition-all placeholder:text-neutral/30"
                value={formData.note}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <CTAButton 
                text={isSubmitting ? "Sending..." : "Send Message"} 
                type="submit" 
                disabled={isSubmitting} 
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

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

export default ContactModal;