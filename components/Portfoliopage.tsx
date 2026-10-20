
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "next-sanity";
import { usePortfolio } from "@/context/PortfolioContext";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j61z87re",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

const filters = [
  "All",
  "Branding",
  "Websites",
  "Marketing",
  "Designs",
  "Motion Designs",
  "Product Designs",
  "Video",
  "AI Automation",
];

export interface PortfolioItem {
  _id: string;
  brand: string;
  caption?: string;
  type?: string;
  types?: string[];
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
  related?: PortfolioItem[];
}

interface NormalizedPortfolioProject
  extends Omit<PortfolioItem, "type" | "related"> {
  type: string;
  related?: NormalizedPortfolioProject[];
}

const normalizeProject = (
  item: PortfolioItem
): NormalizedPortfolioProject => {
  return {
    ...item,
    type: item.type || item.types?.[0] || "",
    related: item.related?.map(normalizeProject),
  };
};

const Portfoliopage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);

  const { openProject } = usePortfolio();

  useEffect(() => {
    let isMounted = true;

    const fetchPortfolio = async () => {
      try {
        const query = `*[_type == "portfolio"]{
          _id,
          brand,
          caption,
          type,
          types,
          category,
          "src": src.asset->url,
          "thumbnail": thumbnail.asset->url,
          "videoSrc": videoFile.asset->url,
          videoUrl,
          media,
          description,
          involvement,
          summaryHighlights,
          "related": related[]->{
            _id,
            brand,
            caption,
            type,
            types,
            category,
            "src": src.asset->url,
            "thumbnail": thumbnail.asset->url,
            "videoSrc": videoFile.asset->url,
            videoUrl,
            media,
            description,
            involvement,
            summaryHighlights,
            "related": related[]->{
              _id,
              brand,
              caption,
              type,
              types,
              category,
              "src": src.asset->url,
              "thumbnail": thumbnail.asset->url,
              "videoSrc": videoFile.asset->url,
              videoUrl,
              media,
              description,
              involvement,
              summaryHighlights
            }
          }
        }`;

        const data: PortfolioItem[] = await client.fetch(query);

        if (isMounted) {
          setPortfolioItems(data);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
      }
    };

    fetchPortfolio();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredItems =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => {
          const projectTypes = [
            ...(item.types || []),
            ...(item.type ? [item.type] : []),
          ];

          return projectTypes.includes(activeFilter);
        });

  return (
    <section
      id="portfolio"
      className="bg-background text-neutral py-12 sm:py-16 md:py-32 px-4 sm:px-6"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-primary mb-2 block">
            Our Work
          </span>

          <h2 className="text-[28px] sm:text-[36px] md:text-[48px] font-bold tracking-tight">
            Creative <span className="text-primary">Footprints</span>
          </h2>
        </motion.div>

        {/* Filter Navigation */}
        <div className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar border-b border-neutral/10 mb-6 sm:mb-8 md:mb-12 pb-4">
          {filters.map((filter, index) => (
            <button
              key={filter}
              ref={(el) => {
                if (el) buttonRefs.current[index] = el;
              }}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`
                relative flex-shrink-0 whitespace-nowrap text-xs md:text-sm font-medium transition-colors duration-300
                ${
                  activeFilter === filter
                    ? "text-primary"
                    : "text-neutral/40 hover:text-neutral"
                }
              `}
            >
              {filter}

              {activeFilter === filter && (
                <motion.div
                  layoutId="activeTab"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                  className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 sm:gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group min-w-0 cursor-pointer"
                onClick={() => openProject(normalizeProject(item))}
              >
                {/* Project Image */}
                <div className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-neutral/5 border border-neutral/10">
                  {item.media === "video" ? (
                    <video
                      src={item.videoSrc || item.src}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                      onMouseOver={(e) => {
                        void e.currentTarget.play().catch(() => {});
                      }}
                      onMouseOut={(e) => e.currentTarget.pause()}
                    />
                  ) : (
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={item.thumbnail || item.src || ""}
                      alt={item.brand}
                      loading="lazy"
                    />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-transparent to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-5">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-primary sm:text-[10px]">
                      View Project
                    </p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="mt-2 min-w-0 px-0.5 sm:mt-4 sm:px-1">
                  <h3 className="truncate text-xs font-bold sm:text-sm">
                    {item.brand}
                  </h3>

                  {item.caption && (
                    <p className="mt-0.5 truncate text-[9px] uppercase tracking-wider text-neutral/40 sm:text-[11px]">
                      {item.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <p className="py-12 text-center text-sm text-neutral/50">
            No projects found in this category yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default Portfoliopage;
