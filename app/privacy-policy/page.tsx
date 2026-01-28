"use client";

import Head from "next/head";
import { useState } from "react";

import BookCall from "@/components/BookCall"; 
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export default function PrivacyPolicyPage() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Privacy Policy | Zi Creates</title>
        <meta
          name="description"
          content="Read the privacy policy of Zi Creates, detailing how we collect, use, and protect your information while providing branding and digital services."
        />

        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy | Zi Creates" />
        <meta
          property="og:description"
          content="Learn how Zi Creates protects your data and ensures privacy while delivering branding, web development, and digital services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zicreates.com/privacy-policy" />
        <meta property="og:image" content="https://zicreates.com/og-zicreates.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | Zi Creates" />
        <meta
          name="twitter:description"
          content="Read Zi Creates' privacy practices and policies for data protection."
        />
        <meta name="twitter:image" content="https://zicreates.com/og-zicreates.jpg" />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://zicreates.com/privacy-policy" />
      </Head>

      <main>
        <PrivacyPolicy />
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
