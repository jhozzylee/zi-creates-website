import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <div className="relative w-full aspect-video my-12 overflow-hidden rounded-[2.5rem] border border-neutral/5">
          <Image src={urlFor(value).url()} alt="Blog content" fill className="object-cover" />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-16 mb-6">{children}</h2>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-primary pl-8 my-10 italic text-2xl font-light text-neutral/80">{children}</blockquote>
    ),
  },
};

export default function MainBlog({ post }: { post: any }) {
  return (
    <article className="bg-background text-neutral pt-40 pb-32 px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Back Button */}
        <Link href="/blogs" className="inline-flex items-center text-[10px] uppercase tracking-[0.3em] text-neutral/40 hover:text-primary transition-colors mb-12">
          <span className="mr-2">←</span> Back to Journal
        </Link>

        {/* Editorial Header */}
        <header className="max-w-[850px] mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.5em]">
              {post.categories?.[0] || "Insight"}
            </span>
            <div className="w-8 h-[1px] bg-neutral/10" />
            <span className="text-neutral/20 text-[10px] uppercase tracking-widest">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">
            {post.title}
          </h1>

          {post.author && (
            <div className="flex items-center gap-4">
               {/* Optional Author Mini-Avatar */}
               {post.author.image && (
                 <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral/10">
                   <Image src={post.author.image} alt={post.author.name} fill className="object-cover grayscale" />
                 </div>
               )}
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">{post.author.name}</p>
                  <p className="text-[9px] uppercase tracking-widest text-neutral/30">{post.author.role}</p>
               </div>
            </div>
          )}
        </header>

        {/* Cinematic Cover */}
        <div className="relative aspect-[21/9] overflow-hidden rounded-[2.5rem] bg-neutral/5 mb-24">
          {post.coverImage && (
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          )}
        </div>

        {/* The Body Content */}
        <div className="max-w-[720px] mx-auto">
          <div className="prose prose-invert prose-neutral max-w-none 
            prose-p:text-neutral/60 prose-p:leading-relaxed prose-p:text-lg prose-p:font-light">
            <PortableText value={post.body} components={ptComponents} />
          </div>
        </div>
      </div>
    </article>
  );
}