"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import { createClient } from "next-sanity";
import CTAButton from "./CTAButton";
import PortfolioModal from "./PortfolioModal"; // Assuming this exists in your components
import { PortfolioItem } from "./Portfoliopage"; // Import the interface we used earlier

// Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j61z87re",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

const Results = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDynamicProjects = async () => {
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
            videoUrl
        }
      }`;

      try {
        const data: PortfolioItem[] = await client.fetch(query);
        
        // Shuffle and take 6 random projects for the home page
        const shuffled = data
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);
          
        setProjects(shuffled);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    getDynamicProjects();
  }, []);

  return (
    <section id="results" className="bg-background text-neutral py-24 md:py-32 overflow-hidden scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-primary text-[11px] font-bold uppercase tracking-[0.4em]">Case Studies</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Proof in the <span className="text-neutral/20 italic font-light">Performance</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 text-neutral/40 group cursor-default">
            <span className="text-sm font-light">Scroll to explore</span>
            <MoveRight className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 md:gap-10 overflow-x-auto pb-12 px-6 md:px-[calc((100vw-1280px)/2+24px)] no-scrollbar cursor-grab active:cursor-grabbing"
      >
        {!loading && projects.map((project, index) => (
          <div 
            key={project._id} 
            onClick={() => setSelectedProject(project)}
            className="flex-none w-[300px] md:w-[500px] group relative cursor-pointer"
          >
            {/* Project Card */}
            <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-neutral/10 bg-neutral/5">
              {project.media === "video" ? (
                <video
                  src={project.videoSrc || project.src}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  muted loop playsInline autoPlay
                />
              ) : (
                <img
                  src={project.thumbnail || project.src}
                  alt={project.brand}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />
              )}
              
              {/* Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 md:p-12">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block">
                    {project.type || project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {project.brand}
                  </h3>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Background Number */}
            <span className="absolute -top-6 -right-4 text-7xl md:text-9xl font-bold text-neutral/[0.03] pointer-events-none group-hover:text-primary/10 transition-colors duration-700">
              {(index + 1).toString().padStart(2, '0')}
            </span>
          </div>
        ))}

        {/* Skeleton State while loading */}
        {loading && [1,2,3].map((i) => (
           <div key={i} className="flex-none w-[300px] md:w-[500px] aspect-[4/5] md:aspect-[16/10] bg-neutral/5 rounded-[3rem] animate-pulse" />
        ))}
        
        {/* "View All" End Card */}
        <Link 
          href="/portfolio" 
          className="flex-none w-[300px] md:w-[500px] flex items-center justify-center rounded-[3rem] border border-dashed border-neutral/20 hover:border-primary/50 transition-colors group"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-neutral/5 flex items-center justify-center mx-auto group-hover:bg-primary transition-colors">
              <ArrowRight className="w-6 h-6 group-hover:text-background" />
            </div>
            <p className="text-lg font-medium">View Full Portfolio</p>
          </div>
        </Link>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 mt-12 flex justify-center">
         <CTAButton text="Explore our work" onClick={() => window.location.href='/portfolio'} />
      </div>

      {/* Modal Integration */}
      {selectedProject && (
        <PortfolioModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          setProject={setSelectedProject}
        />
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Results;