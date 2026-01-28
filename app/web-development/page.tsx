"use client";

import Head from "next/head";
import { useState } from "react";

import BookCall from "@/components/BookCall";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import WebsiteDevelopment from "@/components/WebDevelopment";

export default function WebDevelopmentPage() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Website Development for Brands & Businesses | Zi Creates</title>
        <meta
          name="description"
          content="Zi Creates builds fast, scalable, and conversion-focused websites designed to support strong branding and business growth."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Website Development for Brands & Businesses | Zi Creates"
        />
        <meta
          property="og:description"
          content="We design and develop modern websites that align with brand identity, performance, and business goals."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zicreates.com/web-development" />
        <meta
          property="og:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Website Development for Brands & Businesses | Zi Creates"
        />
        <meta
          name="twitter:description"
          content="Professional website development focused on branding, performance, and conversions."
        />
        <meta
          name="twitter:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://zicreates.com/web-development"
        />
      </Head>

      <main>
        <WebsiteDevelopment onOpenBookCall={() => setIsBookCallOpen(true)} />
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
