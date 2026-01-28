"use client";

import Head from "next/head";
import { useState } from "react";

import BookCall from "@/components/BookCall";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import CorporateBranding from "@/components/CorporateBranding";

export default function CorporateBrandingPage() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Corporate Branding Agency for Growing Businesses | Zi Creates</title>
        <meta
          name="description"
          content="Zi Creates is a corporate branding agency helping businesses build strong brand identities, positioning, visuals, and digital presence that inspire trust and growth."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Corporate Branding Agency for Growing Businesses | Zi Creates"
        />
        <meta
          property="og:description"
          content="We help companies build powerful corporate brands through strategy, identity design, and cohesive digital experiences."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zicreates.com/corporate-branding" />
        <meta
          property="og:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Corporate Branding Agency for Growing Businesses | Zi Creates"
        />
        <meta
          name="twitter:description"
          content="A branding-led agency helping businesses build credible, scalable corporate brands."
        />
        <meta
          name="twitter:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://zicreates.com/corporate-branding"
        />
      </Head>

      <main>
        <CorporateBranding onOpenBookCall={() => setIsBookCallOpen(true)} />
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
