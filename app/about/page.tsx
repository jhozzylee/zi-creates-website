"use client";

import Head from "next/head";
import { useState } from "react";

import BookCall from "@/components/BookCall"; 
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";

export default function AboutPage() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>About Zi Creates | Branding & Digital Experience Agency</title>
        <meta
          name="description"
          content="Zi Creates is a branding-led agency helping startups and businesses build powerful brands, impactful websites, visuals, and digital experiences. Learn more about our team and mission."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About Zi Creates | Branding & Digital Experience Agency"
        />
        <meta
          property="og:description"
          content="Meet the team behind Zi Creates, a branding-first agency delivering premium brand experiences, visuals, and digital solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zicreates.com/about" />
        <meta
          property="og:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Zi Creates | Branding & Digital Experience Agency"
        />
        <meta
          name="twitter:description"
          content="Learn about Zi Creates, a branding-led agency helping businesses grow through strategy, design, and digital experiences."
        />
        <meta
          name="twitter:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://zicreates.com/about"
        />
      </Head>

      <main>
        <AboutUs />
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
