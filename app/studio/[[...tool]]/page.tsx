"use client";

import dynamic from "next/dynamic";

// Dynamically import NextStudio, disable SSR
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false } // THIS IS KEY
);

import config from "../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
