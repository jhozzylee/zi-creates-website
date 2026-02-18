"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added motion imports
import { createClient } from "next-sanity";
import PortfolioModal from "./PortfolioModal";

// Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j61z87re",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

const filters = ["All", "Branding", "Websites", "Marketing", "Designs", "Motion Designs", "Product Designs"];

export interface PortfolioItem {
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
  involvement?: string;
  summaryHighlights?: string;
  related?: PortfolioItem[];
}

const Portfoliopage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const query = `*[_type == "portfolio"]{
        _id, brand, caption, type, category,
        "src": src.asset->url,
        "thumbnail": thumbnail.asset->url,
        "videoSrc": videoFile.asset->url,
        videoUrl, media, description, involvement, summaryHighlights,
        "related": related[]->{
            _id, brand, caption, type, category,
            "src": src.asset->url,
            "thumbnail": thumbnail.asset->url,
            videoUrl, description, involvement, summaryHighlights
        }
      }`;
      const data: PortfolioItem[] = await client.fetch(query);
      setPortfolioItems(data);
    };
    fetchPortfolio();
  }, []);

  const filteredItems: PortfolioItem[] =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.type === activeFilter);

  return (
    <section className="bg-background text-neutral py-24 md:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header with entrance animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-primary mb-2 block">
            Our Work
          </span>
          <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight">
            Creative <span className="text-primary">Footprints</span>
          </h2>
        </motion.div>

        {/* Filter Navigation */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar border-b border-neutral/10 mb-12 pb-4">
          {filters.map((filter, index) => (
            <button
              key={filter}
              ref={(el) => { if (el) buttonRefs.current[index] = el; }}
              onClick={() => setActiveFilter(filter)}
              className={`
                relative flex-shrink-0 text-xs md:text-sm font-medium transition-all duration-300
                ${activeFilter === filter ? "text-primary" : "text-neutral/40 hover:text-neutral"}
              `}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div 
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-primary" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Portfolio Grid with FLIP animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item._id}
                layout // This makes items glide when the filter changes
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(item)}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral/5 border border-neutral/10">
                  {item.media === "video" ? (
                    <video
                      src={item.videoSrc || item.src}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                      onMouseOver={(e) => e.currentTarget.play()}
                      onMouseOut={(e) => e.currentTarget.pause()}
                    />
                  ) : (
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={item.thumbnail || item.src}
                      alt={item.brand}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold">
                      View Project
                    </p>
                  </div>
                </div>

                <div className="mt-4 px-1">
                  <h3 className="text-sm font-bold truncate">{item.brand}</h3>
                  <p className="text-[11px] text-neutral/40 uppercase tracking-wider mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selectedProject && (
          <PortfolioModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            setProject={setSelectedProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfoliopage;