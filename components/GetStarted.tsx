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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMessage("");

    // ⚡️ FIXED: Hardcoded to your primary 'www' domain with the 'next' parameter
    const redirectUrl = "https://www.zicreates.com/auth/callback?next=/dashboard";

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectUrl },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Verification link sent. Check your inbox to enter.");
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
                  Welcome<span className="text-[#30D5C8]">.</span>
                </h2>
                <p className="text-white/40 text-sm font-light leading-relaxed">
                  Enter your credentials to receive a secure access link to your project dashboard.
                </p>
              </div>

              <div className="w-full max-w-[380px]">
                <form onSubmit={handleLogin} className="space-y-12">
                  <div className="relative group">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 mb-4 block group-focus-within:text-[#30D5C8] transition-colors">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. partner@company.com"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light tracking-tight text-white focus:outline-none focus:border-[#30D5C8] transition-all placeholder:text-white/15"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col items-center gap-10">
                    <CTAButton
                      type="submit"
                      text={loading ? "SENDING LINK..." : "REQUEST ACCESS"}
                      disabled={loading}
                    />

                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center bg-white/[0.03] border border-white/5 py-3 px-8 rounded-full"
                      >
                        <p className={`text-[11px] font-medium tracking-wide ${
                          message.includes("Error") ? "text-red-400" : "text-[#30D5C8]"
                        }`}>
                          {message}
                        </p>
                      </motion.div>
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