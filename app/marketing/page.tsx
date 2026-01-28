"use client";

import Head from "next/head";
import { useState } from "react";

import BookCall from "@/components/BookCall"; 
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import DigitalMarketing from "@/components/DigitalMarketing";

export default function MarketingPage() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Digital Marketing Services for Brands | Zi Creates</title>
        <meta
          name="description"
          content="Zi Creates provides strategic digital marketing services that help brands grow, attract clients, and maintain consistent brand identity across all channels."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Digital Marketing Services for Brands | Zi Creates"
        />
        <meta
          property="og:description"
          content="From social media campaigns to brand-driven digital marketing strategies, we help businesses grow while maintaining a strong brand identity."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zicreates.com/marketing" />
        <meta
          property="og:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Digital Marketing Services for Brands | Zi Creates"
        />
        <meta
          name="twitter:description"
          content="Strategic marketing that grows your business while supporting your brand identity."
        />
        <meta
          name="twitter:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://zicreates.com/marketing"
        />
      </Head>

      <main>
        <DigitalMarketing onOpenBookCall={() => setIsBookCallOpen(true)} />
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
