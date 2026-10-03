"use client";

import React, { createContext, useContext, useState } from "react";
import PortfolioModal from "@/components/PortfolioModal";
import { AnimatePresence } from "framer-motion";

export interface PortfolioProject {
  _id: string;
  brand: string;
  caption?: string;
  type: string;
  category?: string;
  src?: string;
  thumbnail?: string;
  videoSrc?: string;
  videoUrl?: string;
  media?: string;
  description?: string;
  involvement?: string[];
  summaryHighlights?: {
    title?: string;
    text?: string;
  }[];
  related?: PortfolioProject[];
}

interface PortfolioContextType {
  openProject: (project: PortfolioProject) => void;
  closeProject: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  return (
    <PortfolioContext.Provider
      value={{
        openProject: setSelectedProject,
        closeProject: () => setSelectedProject(null),
      }}
    >
      {children}

      <AnimatePresence>
        {selectedProject && (
          <PortfolioModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            setProject={setSelectedProject}
          />
        )}
      </AnimatePresence>
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error(
      "usePortfolio must be used inside a PortfolioProvider"
    );
  }

  return context;
}