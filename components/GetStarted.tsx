"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import CTAButton from "./CTAButton";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fluidTransition = {
  type: "spring" as const,
  damping: 30,
  stiffness: 250,
  mass: 1,
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  // ⚡️ UPDATED: Array length to 8 for the new OTP requirement
  const [otp, setOtp] = useState(new Array(8).fill(""));
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setStep(1);
      setOtp(new Array(8).fill(""));
      setMessage("");
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // --- OTP BOX LOGIC ---
  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // ⚡️ UPDATED: Index check for 8 digits (index < 7)
    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    // ⚡️ UPDATED: Paste logic for 8 digits
    const data = e.clipboardData.getData("text").slice(0, 8).split("");
    if (data.length === 8) {
      setOtp(data);
      inputRefs.current[7]?.focus();
    }
  };

  // --- AUTH LOGIC ---
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false }, 
    });

    if (error) {
      setMessage(`Access Denied: ${error.message}`);
    } else {
      setStep(2);
      setMessage("8-digit security code sent to your authorized email.");
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    // ⚡️ UPDATED: Verification check for 8 digits
    if (fullOtp.length < 8 || loading) return;
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: fullOtp,
      type: 'magiclink',
    });

    if (error) {
      setMessage(`Verification failed: ${error.message}`);
    } else {
      window.location.href = "/dashboard";
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050505]/90 backdrop-blur-2xl"
            onClick={onClose}
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={fluidTransition}
            className="relative bg-background border border-neutral/10 text-neutral w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-10 right-10 text-white/20 hover:text-[#30D5C8] transition-colors text-2xl z-20">✕</button>

            <div className="flex flex-col items-center justify-center px-8 md:px-16 py-24">
              
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#30D5C8] shadow-[0_0_10px_#30D5C8]" />
                   <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-white/30">Executive Portal</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
                  {step === 1 ? "Authorized Access" : "Security Check"}<span className="text-[#30D5C8]">.</span>
                </h2>
                <p className="text-white/40 text-sm font-light max-w-xs mx-auto leading-relaxed">
                  {step === 1 
                    ? "Identify your account to receive a secure entry code." 
                    : "Enter the 8-digit security code sent to your device."}
                </p>
              </div>

              <div className="w-full max-w-[500px]">
                <form onSubmit={step === 1 ? handleSendOTP : handleVerifyOTP} className="space-y-14">
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div key="email" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <div className="relative group">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 mb-4 block group-focus-within:text-[#30D5C8] transition-colors">Registered Email</label>
                          <input
                            type="email"
                            placeholder="partner@company.com"
                            className="w-full bg-transparent border-b border-white/10 py-5 text-2xl font-light text-white focus:outline-none focus:border-[#30D5C8] transition-all placeholder:text-white/15"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="otp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center">
                         {/* ⚡️ GRID ADJUSTMENT: 8 boxes using grid for better responsiveness */}
                         <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3 justify-center" onPaste={handlePaste}>
                          {otp.map((data, index) => (
                            <input
                              key={index}
                              type="text"
                              maxLength={1}
                              ref={(el) => (inputRefs.current[index] = el)}
                              className="w-10 h-14 md:w-12 md:h-16 bg-white/[0.03] border border-white/10 rounded-2xl text-center text-2xl font-light text-[#30D5C8] focus:border-[#30D5C8] focus:outline-none focus:ring-1 focus:ring-[#30D5C8] transition-all shadow-[0_0_20px_rgba(48,213,200,0.05)]"
                              value={data}
                              onChange={(e) => handleOtpChange(e.target.value, index)}
                              onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col items-center gap-10">
                    <CTAButton
                      type="submit"
                      text={loading ? "AUTHENTICATING..." : step === 1 ? "REQUEST ACCESS" : "AUTHORIZE ENTRY"}
                      disabled={loading || (step === 2 && otp.join("").length < 8)}
                    />

                    {message && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                        <p className={`text-[11px] font-medium tracking-widest uppercase ${message.includes("Error") || message.includes("Denied") || message.includes("failed") ? "text-red-400" : "text-[#30D5C8]"}`}>
                          {message}
                        </p>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <button type="button" onClick={() => setStep(1)} className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-1">
                        Change Email Address
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="mt-20 opacity-25 uppercase tracking-[0.8em] text-[9px] font-bold text-white">
                Zi Creates Security Systems
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;