"use client";

import React from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full aspect-video my-16 overflow-hidden rounded-[2.5rem] border border-neutral/10 bg-neutral/5"
        >
          <Image 
            src={urlFor(value).url()} 
            alt="Blog content" 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
          />
        </motion.div>
      );
    },
  },
  // --- LIST STYLING ---
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc ml-8 md:ml-12 mb-10 space-y-4 text-neutral/60">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal ml-8 md:ml-12 mb-10 space-y-4 text-neutral/60">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-lg md:text-xl font-light leading-relaxed pl-2 text-justify">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-lg md:text-xl font-light leading-relaxed pl-2 text-justify">
        {children}
      </li>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mt-20 mb-8 text-neutral">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold tracking-tight mt-12 mb-4 text-neutral">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-neutral/60 leading-relaxed text-lg md:text-xl font-light mb-8 text-justify">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-primary pl-8 my-12 italic text-2xl md:text-3xl font-light text-neutral/90 tracking-tight text-justify">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a 
        href={value.href} 
        className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
        target="_blank" 
        rel="noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => <strong className="font-bold text-neutral">{children}</strong>,
  },
};

export default function MainBlog({ post }: { post: any }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- SHARE FUNCTIONALITY ---
  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: `Check out this post: ${post.title}`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <article className="bg-background text-neutral pt-40 pb-32 px-6 relative">
      {/* Reading Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[150] origin-left" 
        style={{ scaleX }} 
      />

      <div className="max-w-[1100px] mx-auto">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/blogs" className="group inline-flex items-center text-[10px] uppercase tracking-[0.4em] text-neutral/40 hover:text-primary transition-all mb-16">
            <span className="mr-3 group-hover:-translate-x-2 transition-transform duration-300">←</span> 
            Back to Journal
          </Link>
        </motion.div>

        {/* Editorial Header */}
        <header className="max-w-[900px] mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.5em]">
              {post.category || "Insight"}
            </span>
            <div className="w-12 h-[1px] bg-neutral/10" />
            <span className="text-neutral/30 text-[10px] uppercase tracking-widest font-medium">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.95] mb-12"
          >
            {post.title}
          </motion.h1>

          {post.author && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-5"
            >
               {post.author.image && (
                 <div className="relative w-12 h-12 rounded-full overflow-hidden border border-neutral/10 bg-neutral/5">
                   <Image src={post.author.image} alt={post.author.name} fill className="object-cover grayscale" />
                 </div>
               )}
               <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-neutral mb-1">{post.author.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-neutral/30">{post.author.role || "Strategist"}</p>
               </div>
            </motion.div>
          )}
        </header>

        {/* Cinematic Cover */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[2.5rem] bg-neutral/5 mb-24 border border-neutral/10"
        >
          {post.coverImage && (
            <Image 
              src={post.coverImage} 
              alt={post.title} 
              fill 
              className="object-cover" 
              priority 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </motion.div>

        {/* The Body Content */}
        <div className="max-w-[760px] mx-auto">
          {/* Applied 'hyphens-auto' here to prevent weird spacing in justified text */}
          <div className="prose prose-invert prose-neutral max-w-none hyphens-auto">
            <PortableText value={post.body} components={ptComponents} />
          </div>

          {/* Bottom Divider & Share */}
          <div className="mt-32 pt-12 border-t border-neutral/5 flex justify-between items-center">
             <div className="text-[10px] uppercase tracking-widest text-neutral/60 font-bold">
               © Zi Creates Archive
             </div>
             <div className="flex gap-6">
                <button 
                  onClick={handleShare}
                  className="text-neutral/60 hover:text-primary transition-all text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 group"
                >
                  <span className="group-hover:mr-1 transition-all">Share</span>
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="group-hover:-translate-y-0.5 transition-transform"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </button>
             </div>
          </div>
        </div>
      </div>
    </article>
  );
}