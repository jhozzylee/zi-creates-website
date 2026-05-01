"use client";

import React, { useState, useEffect } from "react";
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
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = Email, 2 = Code
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset state when modal closes
      setStep(1);
      setOtp("");
      setMessage("");
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Step 1: Send the 6-digit code
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, // Prevents random signups if you only want existing clients
      },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setStep(2);
      setMessage("A 6-digit access code has been sent to your inbox.");
    }
    setLoading(false);
  };

  // Step 2: Verify the 6-digit code
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });

    if (error) {
      setMessage(`Invalid code: ${error.message}`);
    } else {
      // SUCCESS: Client-side redirect works perfectly here
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
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={fluidTransition}
            className="relative bg-background border border-neutral/10 text-neutral w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-white/20 hover:text-[#30D5C8] transition-colors text-2xl z-20"
            >
              ✕
            </button>

            <div className="flex flex-col items-center justify-center px-8 md:px-16 pt-20 pb-20">
              
              <div className="text-center mb-16 max-w-[340px]">
                <div className="flex items-center justify-center gap-3 mb-6">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#30D5C8] shadow-[0_0_8px_#30D5C8]" />
                   <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-white/30">Executive Portal</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  {step === 1 ? "Welcome" : "Verify"}<span className="text-[#30D5C8]">.</span>
                </h2>
                <p className="text-white/40 text-sm font-light leading-relaxed">
                  {step === 1 
                    ? "Enter your credentials to receive a secure access code." 
                    : "Enter the 6-digit code sent to your email to continue."}
                </p>
              </div>

              <div className="w-full max-w-[380px]">
                <form onSubmit={step === 1 ? handleSendOTP : handleVerifyOTP} className="space-y-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="relative group"
                    >
                      <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 mb-4 block group-focus-within:text-[#30D5C8] transition-colors">
                        {step === 1 ? "Email Address" : "Access Code"}
                      </label>
                      <input
                        type={step === 1 ? "email" : "text"}
                        placeholder={step === 1 ? "e.g. partner@company.com" : "000000"}
                        className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light tracking-tight text-white focus:outline-none focus:border-[#30D5C8] transition-all placeholder:text-white/15"
                        value={step === 1 ? email : otp}
                        onChange={(e) => step === 1 ? setEmail(e.target.value) : setOtp(e.target.value)}
                        required
                        autoFocus
                        maxLength={step === 2 ? 6 : undefined}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex flex-col items-center gap-10">
                    <CTAButton
                      type="submit"
                      text={loading ? "PROCESSING..." : step === 1 ? "REQUEST ACCESS" : "VERIFY & ENTER"}
                      disabled={loading}
                    />

                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center bg-white/[0.03] border border-white/5 py-3 px-8 rounded-full"
                      >
                        <p className={`text-[11px] font-medium tracking-wide ${
                          message.includes("Error") || message.includes("Invalid") ? "text-red-400" : "text-[#30D5C8]"
                        }`}>
                          {message}
                        </p>
                      </motion.div>
                    )}
                    
                    {step === 2 && (
                      <button 
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                      >
                        ← Back to Email
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="mt-16 opacity-10 uppercase tracking-[0.5em] text-[8px] font-bold">
                Authorized Client Gateway
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;