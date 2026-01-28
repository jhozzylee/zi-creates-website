"use client";

import Head from "next/head";
import { useState } from "react";

import BookCall from "@/components/BookCall"; 
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import PortfolioPage from "@/components/Portfoliopage";

export default function Portfolio() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Portfolio | Zi Creates — Branding & Digital Experiences</title>
        <meta
          name="description"
          content="Explore Zi Creates’ portfolio showcasing corporate branding, visual design, web development, video production, and marketing projects that elevate brands."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Portfolio | Zi Creates — Branding & Digital Experiences"
        />
        <meta
          property="og:description"
          content="View our portfolio of branding, design, and digital projects that help businesses grow and strengthen their brand identity."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zicreates.com/portfolio" />
        <meta
          property="og:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Portfolio | Zi Creates — Branding & Digital Experiences"
        />
        <meta
          name="twitter:description"
          content="Check out our work in branding, visual design, web development, video production, and digital marketing."
        />
        <meta
          name="twitter:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://zicreates.com/portfolio"
        />
      </Head>

      <main>
        <PortfolioPage />
        <Footer />

        <BookCall
          isOpen={isBookCallOpen}
          onClose={() => setIsBookCallOpen(false)}
        />

        <GetStarted
          isOpen={isGetStartedOpen}
          onClose={() => setIsGetStartedOpen(false)}
        />
      </main>
    </>
  );
}
