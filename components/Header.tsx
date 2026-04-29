"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient"; 
import CTAButton from "./CTAButton";
import GetStarted from "./GetStarted";
import logo from "../public/Logo.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // 🎯 portal check logic
  const isDashboard = pathname.startsWith("/dashboard");

  const navItems = ["Expertise", "Services", "Process", "Results", "Plans"];

  const fluidTransition = {
    type: "spring" as const,
    damping: 35,
    stiffness: 200,
    mass: 1
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleNavClick = (section: string) => {
    const id = section.toLowerCase();
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled || isDashboard
            ? "bg-background/80 backdrop-blur-xl border-b border-neutral/5 py-3 shadow-2xl"
            : "bg-background py-5 px-4"
        }`}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          
          {/* ================= LOGO SECTION ================= */}
          {isDashboard ? (
            <div className="flex items-center opacity-80 cursor-default">
              <Image src={logo} alt="Zi Creates Logo" className="h-6 w-auto" priority />
            </div>
          ) : (
            <Link
              href="/"
              onClick={handleLogoClick}
              className="flex items-center transition-transform hover:scale-105 active:scale-95"
            >
              <Image src={logo} alt="Zi Creates Logo" className="h-6 w-auto" priority />
            </Link>
          )}

          {/* ================= NAVIGATION LOGIC ================= */}
          {!isDashboard ? (
            <>
              {/* Marketing Navigation */}
              <nav className="hidden lg:flex items-center space-x-2">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className="text-neutral text-[15px] font-light px-5 py-2 rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20"
                  >
                    {item}
                  </button>
                ))}
              </nav>

              <div className="hidden lg:block">
                <CTAButton text="Sign in" onClick={() => setShowModal(true)} />
              </div>

              {/* Mobile Hamburger (Marketing Only) */}
              <div className="lg:hidden">
                <button 
                  onClick={() => setMenuOpen(true)} 
                  aria-label="Open menu" 
                  className="p-2 focus:outline-none"
                >
                  <div className="w-6 h-5 flex flex-col justify-between items-end">
                    <span className="h-0.5 w-6 bg-neutral" />
                    <span className="h-0.5 w-4 bg-neutral" />
                    <span className="h-0.5 w-5 bg-neutral" />
                  </div>
                </button>
              </div>
            </>
          ) : (
            /* Dashboard Executive Navigation */
            <div className="flex items-center gap-6 md:gap-10">
              <div className="hidden sm:flex items-center gap-2.5 px-4 py-1.5 bg-neutral/5 rounded-full border border-neutral/5">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(48,213,200,0.6)]" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-neutral/40 font-bold font-mono">
                  Secure_Session
                </span>
              </div>
              
              <button 
                onClick={handleSignOut}
                className="group flex items-center gap-3 transition-all"
              >
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral/30 group-hover:text-red-400 transition-colors">
                  Sign Out
                </span>
                <div className="w-8 h-8 rounded-full border border-neutral/10 flex items-center justify-center group-hover:border-red-400/30 group-hover:bg-red-400/5 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral/20 group-hover:text-red-400 transition-colors">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </div>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ================= MOBILE MENU (MARKETING ONLY) ================= */}
      <AnimatePresence mode="wait">
        {menuOpen && !isDashboard && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed top-5 right-5 z-[110] lg:hidden p-3 rounded-full bg-background/80 backdrop-blur-xl shadow-lg"
            >
              <span className="block w-6 h-0.5 bg-neutral rotate-45 translate-y-1" />
              <span className="block w-6 h-0.5 bg-neutral -rotate-45 -translate-y-1" />
            </motion.button>

            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={fluidTransition}
              className="fixed inset-0 z-[90] bg-background lg:hidden flex flex-col justify-center items-center px-8 space-y-8"
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...fluidTransition, delay: 0.15 + i * 0.08 }}
                  onClick={() => handleNavClick(item)}
                  className="text-4xl font-bold tracking-tight text-neutral hover:text-primary"
                >
                  {item}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...fluidTransition, delay: 0.5 }}
                className="pt-6"
              >
                <CTAButton text="Sign in" onClick={() => { setShowModal(true); setMenuOpen(false); }} />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= MODALS ================= */}
      {showModal && <GetStarted isOpen={showModal} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Header;