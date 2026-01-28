"use client";

import Head from "next/head";
import { useState } from "react";

import BookCall from "@/components/BookCall"; 
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import Careers from "@/components/Career";

export default function CareersPage() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Careers | Join Zi Creates — Branding & Digital Agency</title>
        <meta
          name="description"
          content="Explore career opportunities at Zi Creates, a branding-led digital agency. Join our team to create powerful brand experiences, visuals, and digital solutions."
        />

        {/* Open Graph */}
        <meta property="og:title" content="Careers | Zi Creates — Branding & Digital Agency" />
        <meta
          property="og:description"
          content="Join Zi Creates’ team of branding, design, and digital experts to help businesses grow and create impactful brand experiences."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zicreates.com/career" />
        <meta property="og:image" content="https://zicreates.com/og-zicreates.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers | Zi Creates — Branding & Digital Agency" />
        <meta
          name="twitter:description"
          content="Explore open positions at Zi Creates and join our team of branding, web, and digital experts."
        />
        <meta name="twitter:image" content="https://zicreates.com/og-zicreates.jpg" />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://zicreates.com/career" />
      </Head>

      <main>
        <Careers />
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
