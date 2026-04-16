"use client";

import { useEffect } from "react";

export default function ScrollFix() {
  useEffect(() => {
    // This stops the "Reset to top" bug when images/videos load
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return null; // This component doesn't render anything visible
}