"use client";

import React, { useState, useEffect, useRef } from "react";
import CTAButton from "./CTAButton";
import GetStarted from "./GetStarted";
import { urlFor } from "@/sanity/lib/image";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j61z87re",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

interface PortfolioModalProps {
  project: any;
  onClose: () => void;
  setProject: (p: any) => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose, setProject }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!project) return null;

  const mainImage = project.src || project.thumbnail || null;
  const relatedProjects = Array.isArray(project.related) ? project.related : [];

  const handleRelatedClick = async (id: string) => {
    setLoading(true);
    try {
      const query = `*[_type == "portfolio" && _id == $id][0]{
        _id, brand, caption, type, category,
        "src": src.asset->url,
        "thumbnail": thumbnail.asset->url,
        videoUrl, description, involvement, summaryHighlights,
        "related": related[]->{
            _id, brand, caption, type, category,
            "src": src.asset->url,
            "thumbnail": thumbnail.asset->url,
            videoUrl
        }
      }`;
      const data = await client.fetch(query, { id });
      if (data) {
        setProject(data);
        scrollContainerRef.current?.scrollTo(0, 0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderImage = (source: any, width: number) => {
    if (!source) return "";
    if (typeof source === "string") return source;
    return urlFor(source).width(width).auto("format").url();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-background/60 backdrop-blur-xl">
      {/* Overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal container */}
      <div
        ref={scrollContainerRef}
        className={`
          relative w-full h-full md:h-[90vh] md:max-w-[1280px]
          bg-background text-neutral rounded-none md:rounded-[2.5rem]
          shadow-2xl border border-neutral/10 overflow-hidden
          flex flex-col lg:flex-row transition-all duration-300
          ${loading ? "opacity-50" : "opacity-100"}
        `}
      >
        {/* Close button: above media on mobile, top-right of media on desktop */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            md:top-6 md:right-8
            lg:top-8 lg:right-10
            z-20 text-2xl text-neutral/40 hover:text-primary transition-colors
            p-2
          "
        >
          ✕
        </button>

        {/* --- MEDIA SECTION --- */}
        <div className="relative flex-shrink-0 w-full lg:w-[calc(100%-450px)] p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col gap-6 md:gap-12 bg-background">
          {/* Main media */}
          <div className="aspect-video w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-neutral/5 border border-neutral/10">
            {project.videoUrl ? (
              <iframe
                src={
                  project.videoUrl.includes("?")
                    ? `${project.videoUrl}&autoplay=1`
                    : `${project.videoUrl}?autoplay=1`
                }
                title={project.brand}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : mainImage ? (
              <img
                src={renderImage(mainImage, 1600)}
                alt={project.brand}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-neutral/40 italic">
                Media Content Unavailable
              </div>
            )}
          </div>

          {/* Related projects for desktop */}
          {relatedProjects.length > 0 && (
            <div className="hidden lg:block mt-8">
              <div className="flex items-center gap-4 mb-4">
                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  Related
                </h4>
                <div className="h-px flex-1 bg-neutral/10" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {relatedProjects.map((item: any) => (
                  <div
                    key={item._id}
                    onClick={() => handleRelatedClick(item._id)}
                    className="cursor-pointer group"
                  >
                    <div className="aspect-video rounded-xl overflow-hidden bg-neutral/5 border border-neutral/10 transition-all">
                      <img
                        src={renderImage(item.thumbnail || item.src, 600)}
                        alt={item.brand}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="flex-1 overflow-y-auto bg-neutral/5 p-8 md:p-12 lg:p-16 flex flex-col justify-between">
          <div className="space-y-10">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
                {project.category || project.type}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {project.brand}
              </h2>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral/40">
                Overview
              </h3>
              <div className="text-neutral/70 font-light text-sm leading-relaxed space-y-4">
                {project.description && <p>{project.description}</p>}
                {project.summaryHighlights?.length > 0 && (
                  <ul className="space-y-4 pt-2">
                    {project.summaryHighlights.map((item: any, i: number) => (
                      <li key={i} className="flex gap-4">
                        <span className="text-primary font-bold">/</span>
                        <p className="text-sm">
                          <span className="text-neutral font-bold">{item.title}:</span>{" "}
                          {item.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {project.involvement?.length > 0 && (
              <div className="space-y-4 pb-8">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral/40">
                  Role
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.involvement.map((item: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-2 bg-neutral/10 border border-neutral/10 rounded-lg text-[9px] font-bold uppercase text-neutral/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto pt-12 border-t border-neutral/10">
            <CTAButton text="Start your project" onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>

      {showModal && <GetStarted isOpen={showModal} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default PortfolioModal;
