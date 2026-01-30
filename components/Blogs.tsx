import React from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

// UPDATED QUERY: We now fetch the direct asset URL for the coverImage
const GET_POSTS_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage.asset->url, 
  publishedAt,
  categories
}`;

export default async function BlogContent() {
  const posts = await client.fetch(GET_POSTS_QUERY);

  return (
    <section className="bg-background text-neutral pt-32 pb-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Editorial Header */}
        <header className="mb-20 md:mb-32">
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.5em] block mb-6">
            Creative Journal
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
            Digital <br />
            <span className="text-neutral/20 italic font-light">Archive</span>
          </h1>
          <div className="h-[1px] w-full bg-neutral/5" />
        </header>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-x-12">
          {posts.map((post: any, index: number) => {
            const isFeature = index === 0;
            return (
              <Link 
                // Ensure this matches your folder name: app/blog/[slug]
                href={`/blog/${post.slug}`} 
                key={post.slug}
                className={`group flex flex-col ${
                  isFeature ? "md:col-span-12" : "md:col-span-6 lg:col-span-4"
                }`}
              >
                {/* Image Wrap */}
                <div className={`relative overflow-hidden rounded-[2.5rem] bg-neutral/[0.02] border border-neutral/5 transition-all duration-700 ${
                  isFeature ? "aspect-[21/9]" : "aspect-[4/5]"
                }`}>
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage} // Directly using the URL string from Sanity
                      alt={post.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                      sizes="(max-w-768px) 100vw, 1200px"
                      priority={isFeature}
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral/5 flex items-center justify-center">
                      <span className="text-[10px] opacity-10">NO IMAGE</span>
                    </div>
                  )}
                </div>

                {/* Text Wrap */}
                <div className={`${isFeature ? "mt-10 max-w-3xl" : "mt-8"}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">
                      {post.categories?.[0] || "Insight"}
                    </span>
                    <span className="text-neutral/20 text-[10px] uppercase tracking-widest">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <h2 className={`${isFeature ? "text-3xl md:text-6xl" : "text-xl md:text-2xl"} font-bold tracking-tighter mb-6 leading-tight group-hover:text-primary transition-colors`}>
                    {post.title}
                  </h2>
                  
                  <p className="text-neutral/40 text-sm font-light leading-relaxed line-clamp-2 mb-6">
                    {post.excerpt}
                  </p>

                  <div className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] border-b border-primary/20 pb-1">
                    Explore <span className="ml-2">→</span>
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