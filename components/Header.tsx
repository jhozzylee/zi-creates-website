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

  /* -----------------------------------
     Header scroll state
  ------------------------------------ */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* -----------------------------------
     Lock body scroll when menu is open
  ------------------------------------ */
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
      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-neutral/5 py-3 shadow-2xl"
            : "bg-background py-5 px-4"
        }`}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center transition-transform hover:scale-105"
          >
            <Image
              src={logo}
              alt="Zi Creates Logo"
              className="h-6 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
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

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <CTAButton text="Get Started" onClick={handleModalOpen} />
          </div>

          {/* Mobile Hamburger (OPEN ONLY) */}
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
        </div>
      </header>

      {/* ================= FLOATING CLOSE BUTTON ================= */}
      {menuOpen && (
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="fixed top-5 right-5 z-[110] lg:hidden p-3 rounded-full bg-background/80 backdrop-blur-xl shadow-lg"
        >
          <span className="block w-6 h-0.5 bg-neutral rotate-45 translate-y-1" />
          <span className="block w-6 h-0.5 bg-neutral -rotate-45 -translate-y-1" />
        </button>
      )}

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 z-[90] bg-background overscroll-none transition-all duration-700 ease-in-out lg:hidden ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col h-full justify-center items-center px-8 space-y-8">
          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`text-4xl font-bold tracking-tight transition-all duration-500 ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } text-neutral hover:text-primary`}
            >
              {item}
            </button>
          ))}

          <div
            className={`pt-6 transition-all duration-700 delay-300 ${
              menuOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <CTAButton text="Get Started" onClick={handleModalOpen} />
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <GetStarted
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Header;
