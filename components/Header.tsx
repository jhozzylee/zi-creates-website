"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; 
import CTAButton from "./CTAButton";
import GetStarted from "./GetStarted";
import logo from "../public/Logo.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const navItems = ["Expertise", "Services", "Process", "Results", "Plans"];

  /* -----------------------------------
     Soft Motion Configs - Fixed Type Error with 'as const'
  ------------------------------------ */
  const fluidTransition = {
    type: "spring" as const, // The 'as const' tells TS this is exactly "spring"
    damping: 35,
    stiffness: 200,
    mass: 1
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen]);

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

  const handleModalOpen = () => {
    setShowModal(true);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-neutral/5 py-3 shadow-2xl"
            : "bg-background py-5 px-4"
        }`}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center transition-transform hover:scale-105"
          >
            <Image src={logo} alt="Zi Creates Logo" className="h-6 w-auto" priority />
          </Link>

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
            <CTAButton text="Get Started" onClick={handleModalOpen} />
          </div>

          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="p-2 focus:outline-none">
              <div className="w-6 h-5 flex flex-col justify-between items-end">
                <span className="h-0.5 w-6 bg-neutral" />
                <span className="h-0.5 w-4 bg-neutral" />
                <span className="h-0.5 w-5 bg-neutral" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {menuOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
              className="fixed inset-0 z-[90] bg-background overscroll-none lg:hidden flex flex-col justify-center items-center px-8 space-y-8"
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    ...fluidTransition, 
                    delay: 0.15 + i * 0.08
                  }}
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
                <CTAButton text="Get Started" onClick={handleModalOpen} />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {showModal && <GetStarted isOpen={showModal} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Header;