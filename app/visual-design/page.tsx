"use client";

import Head from "next/head";
import { useState } from "react";

import BookCall from "@/components/BookCall";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import VisualDesign from "@/components/Designs";

export default function VisualDesignPage() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Visual Design Services for Modern Brands | Zi Creates</title>
        <meta
          name="description"
          content="Zi Creates provides professional visual design services for brands that want to look consistent, premium, and memorable across all digital and marketing touchpoints."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Visual Design Services for Modern Brands | Zi Creates"
        />
        <meta
          property="og:description"
          content="From marketing visuals to brand assets, we design visuals that strengthen brand identity and recognition."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zicreates.com/visual-design" />
        <meta
          property="og:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Visual Design Services for Modern Brands | Zi Creates"
        />
        <meta
          name="twitter:description"
          content="Professional visual design services that elevate your brand’s look and consistency."
        />
        <meta
          name="twitter:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://zicreates.com/visual-design"
        />
      </Head>

      <main>
        <VisualDesign onOpenBookCall={() => setIsBookCallOpen(true)} />
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
