"use client";

import Head from "next/head";
import { useState } from "react";

import BookCall from "@/components/BookCall"; 
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import Refund from "@/components/Refunds";

export default function RefundPolicyPage() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Refund Policy | Zi Creates</title>
        <meta
          name="description"
          content="Read Zi Creates' refund policy outlining how we handle refunds and customer satisfaction for our branding, web development, and digital services."
        />

        {/* Open Graph */}
        <meta property="og:title" content="Refund Policy | Zi Creates" />
        <meta
          property="og:description"
          content="Learn about Zi Creates' refund practices and commitment to client satisfaction for all branding and digital services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zicreates.com/refund-policy" />
        <meta property="og:image" content="https://zicreates.com/og-zicreates.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Refund Policy | Zi Creates" />
        <meta
          name="twitter:description"
          content="Read Zi Creates' refund policy and customer satisfaction terms for branding, web, and digital services."
        />
        <meta name="twitter:image" content="https://zicreates.com/og-zicreates.jpg" />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://zicreates.com/refund-policy" />
      </Head>

      <main>
        <Refund />
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
