import React from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

// Keep your working query
const GET_POSTS_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage.asset->url, 
  publishedAt,
  "category": categories[0]->title
}`;

export default async function BlogContent() {
  const posts = await client.fetch(GET_POSTS_QUERY);

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <p className="text-neutral/20 uppercase tracking-[0.5em] text-[10px] font-bold">
          No entries found in archive.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-background text-neutral pt-40 pb-24 px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Editorial Header */}
        <header className="mb-24 md:mb-32">
          <div>
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.5em] block mb-6">
              Creative Journal
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-12">
            Digital <br />
            <span className="text-neutral/10 italic font-light font-serif">Archive</span>
          </h1>
          {/* Static Border to prevent layout jump */}
          <div className="h-[1px] w-full bg-neutral/10" />
        </header>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
          {posts.map((post: any, index: number) => {
            const isFeature = index === 0;
            return (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.slug}
                className={`group flex flex-col ${
                  isFeature ? "md:col-span-12" : "md:col-span-6 lg:col-span-4"
                }`}
              >
                {/* Image Wrap - Fixed Twitching with persistent aspect ratio */}
                <div className={`relative overflow-hidden rounded-[2.5rem] bg-neutral/[0.02] border border-neutral/10 transition-all duration-700 ${
                  isFeature ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/5]"
                }`}>
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                      sizes={isFeature ? "100vw" : "(max-w-768px) 100vw, 400px"}
                      priority={isFeature}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-5 italic font-serif">
                      No Visual
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-60" />
                </div>

                {/* Text Wrap */}
                <div className={`${isFeature ? "mt-12 max-w-4xl" : "mt-8"}`}>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">
                      {post.category || "Insight"}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-neutral/20" />
                    <span className="text-neutral/30 text-[10px] uppercase tracking-widest font-medium">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <h2 className={`${
                    isFeature ? "text-4xl md:text-7xl" : "text-xl md:text-3xl"
                  } font-bold tracking-tighter mb-6 leading-[1.05] transition-colors duration-500 group-hover:text-primary`}>
                    {post.title}
                  </h2>
                  
                  <p className={`text-neutral/40 font-light leading-relaxed mb-8 line-clamp-2 ${
                    isFeature ? "text-lg md:text-2xl md:max-w-3xl" : "text-sm"
                  }`}>
                    {post.excerpt}
                  </p>

                  <div className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.4em] text-neutral/40 group-hover:text-primary transition-all duration-300">
                    <span className="border-b border-neutral/20 group-hover:border-primary/40 pb-1">
                      Read Entry
                    </span>
                    <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}