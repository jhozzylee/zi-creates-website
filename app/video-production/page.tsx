"use client";

import Head from "next/head";
import { useState } from "react";

import BookCall from "@/components/BookCall"; 
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import VideoMotionDesign from "@/components/Video";

export default function VideoProductionPage() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Video & Motion Design Services | Zi Creates</title>
        <meta
          name="description"
          content="Zi Creates delivers high-quality video production and motion design services to help brands tell their story, engage audiences, and elevate brand presence."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Video & Motion Design Services | Zi Creates"
        />
        <meta
          property="og:description"
          content="Engaging videos and motion graphics designed to strengthen your brand identity and marketing presence."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zicreates.com/video-production" />
        <meta
          property="og:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Video & Motion Design Services | Zi Creates"
        />
        <meta
          name="twitter:description"
          content="Professional video production and motion design that elevates your brand."
        />
        <meta
          name="twitter:image"
          content="https://zicreates.com/og-zicreates.jpg"
        />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://zicreates.com/video-production"
        />
      </Head>

      <main>
        <VideoMotionDesign onOpenBookCall={() => setIsBookCallOpen(true)} />
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
