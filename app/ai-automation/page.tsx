"use client";

import Head from "next/head";
import { useState } from "react";

import BookCall from "@/components/BookCall"; 
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import AIAutomation from "@/components/AIAutomation";

export default function AIAutomationPage() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>AI Automation Services for Businesses | Zi Creates</title>
        <meta
          name="description"
          content="Zi Creates provides AI automation services to help businesses streamline workflows, increase efficiency, and enhance their brand experience through smart digital solutions."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="AI Automation Services for Businesses | Zi Creates"
        />
        <meta
          property="og:description"
          content="Streamline workflows and improve brand experience with AI-driven automation solutions from Zi Creates."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zicreates.com/ai-automation" />
        <meta
          property="og:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="AI Automation Services for Businesses | Zi Creates"
        />
        <meta
          name="twitter:description"
          content="AI-powered automation services that enhance efficiency, workflow, and brand consistency."
        />
        <meta
          name="twitter:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://zicreates.com/ai-automation"
        />
      </Head>

      <main>
        <AIAutomation onOpenBookCall={() => setIsBookCallOpen(true)} />
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
