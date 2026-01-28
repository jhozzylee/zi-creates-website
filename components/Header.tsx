"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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

  // Detect scroll to trigger the header "condensation"
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleModalOpen = () => {
    setShowModal(true);
    setMenuOpen(false);
  };

  const handleNavClick = (section: string) => {
    const sectionId = section.toLowerCase();
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-neutral/5 py-3 shadow-2xl" 
          : "bg-background py-5 px-4"
        }`}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          
          {/* Logo - Stays original */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center transition-transform hover:scale-105">
            <Image src={logo} alt="Logo" className="h-6 w-auto" priority />
          </Link>

          {/* Desktop Navigation - Original buttons, refined spacing */}
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

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <CTAButton text="Get Started" onClick={handleModalOpen} />
          </div>

          {/* Hamburger Menu Icon */}
          <div className="lg:hidden z-[100]">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-neutral focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-end">
                <span className={`h-0.5 bg-neutral transition-all duration-300 ${menuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
                <span className={`h-0.5 bg-neutral transition-all duration-300 ${menuOpen ? "opacity-0" : "w-4"}`} />
                <span className={`h-0.5 bg-neutral transition-all duration-300 ${menuOpen ? "w-6 -rotate-45 -translate-y-2.5" : "w-5"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - The New "Slide-Down" Effect */}
        <div 
          className={`fixed inset-0 bg-background transition-all duration-700 ease-in-out lg:hidden z-[90] ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <div className="flex flex-col h-full justify-center items-center px-8 space-y-8">
            {navItems.map((item, i) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                style={{ transitionDelay: `${i * 50}ms` }}
                className={`text-4xl font-bold tracking-tight text-neutral hover:text-primary transition-all duration-500 ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                {item}
              </button>
            ))}
            <div className={`pt-6 transition-all duration-700 delay-300 ${menuOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
              <CTAButton text="Get Started" onClick={handleModalOpen} />
            </div>
          </div>
        </div>
      </header>

      {showModal && (
        <GetStarted isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Header;