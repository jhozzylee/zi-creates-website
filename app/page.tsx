"use client";

import Head from "next/head";
import { useState } from "react";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import BookCall from "@/components/BookCall"; 
import GetStarted from "@/components/GetStarted";
import OurProcess from "@/components/OurProcess";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import ExtraSection from "@/components/ExtraSection";
import EmailCaptureSection from "@/components/EmailCaptureSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Branding & Digital Experience Agency | Zi Creates</title>
        <meta
          name="description"
          content="Zi Creates is a branding-led digital agency helping startups and businesses build powerful brand identities, websites, visuals, and digital experiences that convert."
        />

        {/* Keywords (light use) */}
        <meta
          name="keywords"
          content="branding agency, corporate branding, brand identity design, digital branding agency, creative agency, web design for brands"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Branding & Digital Experience Agency | Zi Creates" />
        <meta
          property="og:description"
          content="We help startups and businesses build premium brands through strategy, identity, design, and digital experiences."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zicreates.com/" />
        <meta property="og:image" content="https://zicreates.com/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Branding & Digital Experience Agency | Zi Creates" />
        <meta
          name="twitter:description"
          content="A branding-led agency helping businesses build strong identities and digital experiences that drive growth."
        />
        <meta name="twitter:image" content="https://zicreates.com/og-image.jpg" />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://zicreates.com/" />
      </Head>

      <main>
        <Hero onOpenBookCall={() => setIsBookCallOpen(true)} />

        <WhoWeAre />
        <WhatWeDo />
        <OurProcess />
        <Results />
        <Testimonials />
        <PricingSection />
        <ExtraSection onOpenBookCall={() => setIsBookCallOpen(true)} />
        <EmailCaptureSection />
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
