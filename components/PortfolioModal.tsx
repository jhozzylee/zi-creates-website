"use client";

import React, { useState, useEffect, useRef } from "react";
import CTAButton from "./CTAButton";
import GetStarted from "./GetStarted";
import { urlFor } from "@/sanity/lib/image";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j61z87re',
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
    return () => { document.body.style.overflow = ""; };
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
        // Only scroll to top when a NEW project is loaded
        scrollContainerRef.current?.scrollTo(0, 0);
      }
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const renderImage = (source: any, width: number) => {
    if (!source) return "";
    if (typeof source === "string") return source;
    return urlFor(source).width(width).auto("format").url();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-background/60 backdrop-blur-xl">
      {/* Overlay - Click anywhere outside the content to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        ref={scrollContainerRef}
        className={`
          relative bg-background text-neutral w-full h-full md:h-[90vh] md:max-w-[1280px]
          flex flex-col lg:grid lg:grid-cols-[1fr_450px]
          rounded-none md:rounded-[2.5rem] overflow-y-auto overflow-x-hidden
          border-x md:border border-neutral/10 shadow-2xl transition-all duration-300
          ${loading ? "opacity-50" : "opacity-100"}
        `}
      >
        
        {/* CLOSE BUTTON - Positioned to stay visible but out of the way */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 lg:top-8 lg:right-10 text-neutral/40 hover:text-primary transition-colors z-[80] text-2xl p-2"
        >
          ✕
        </button>

        {/* --- SECTION 1: MEDIA (Top on Mobile, Left on Desktop) --- */}
        <div className="w-full p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col gap-6 md:gap-12">
          {/* Main Showcase */}
          <div className="mt-12 lg:mt-0 aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-neutral/5 border border-neutral/10">
            {project.videoUrl ? (
              <iframe
                src={project.videoUrl.includes("?") ? `${project.videoUrl}&autoplay=1` : `${project.videoUrl}?autoplay=1`}
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

          {/* Related Projects (Desktop Only) */}
          {relatedProjects.length > 0 && (
            <div className="hidden lg:block">
              <div className="flex items-center gap-4 mb-8">
                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Related</h4>
                <div className="h-px flex-1 bg-neutral/10" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {relatedProjects.map((item: any) => (
                  <div key={item._id} onClick={() => handleRelatedClick(item._id)} className="cursor-pointer group">
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

        {/* --- SECTION 2: CONTENT (Bottom on Mobile, Right on Desktop) --- */}
        <div className="w-full bg-neutral/5 p-8 md:p-12 lg:p-16 border-t lg:border-t-0 lg:border-l border-neutral/10 flex flex-col justify-between h-auto lg:min-h-full">
          <div className="space-y-10">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">{project.category || project.type}</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{project.brand}</h2>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral/40">Overview</h3>
              <div className="text-neutral/70 font-light text-sm leading-relaxed space-y-4">
                {project.description && <p>{project.description}</p>}
                {project.summaryHighlights?.length > 0 && (
                  <ul className="space-y-4 pt-2">
                    {project.summaryHighlights.map((item: any, i: number) => (
                      <li key={i} className="flex gap-4">
                        <span className="text-primary font-bold">/</span>
                        <p className="text-sm"><span className="text-neutral font-bold">{item.title}:</span> {item.text}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {project.involvement?.length > 0 && (
              <div className="space-y-4 pb-8">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral/40">Role</h3>
                <div className="flex flex-wrap gap-2">
                  {project.involvement.map((item: string, i: number) => (
                    <span key={i} className="px-3 py-2 bg-neutral/10 border border-neutral/10 rounded-lg text-[9px] font-bold uppercase text-neutral/60">
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