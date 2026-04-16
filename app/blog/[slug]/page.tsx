import { client } from "@/sanity/lib/client";
import MainBlog from "@/components/MainBlog";
import Footer from "@/components/Footer";
import type { Metadata } from 'next';

// --- NEW: DYNAMIC METADATA GENERATOR ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // We fetch just enough data for the social preview
  const post = await client.fetch(`*[_type == "blog" && slug.current == $slug][0]{
    title,
    excerpt,
    "ogImage": coverImage.asset->url
  }`, { slug });

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://yourdomain.com/blog/${slug}`, // Update to your actual domain
      siteName: "Zi Creates",
      images: [
        {
          url: post.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage],
    },
  };
}
// --- END OF METADATA ---

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const query = `*[_type == "blog" && slug.current == $slug][0] {
    title,
    excerpt,
    publishedAt,
    body,
    categories,
    "coverImage": coverImage.asset->url,
    "author": author-> {
      name,
      role,
      "image": image.asset->url
    }
  }`;

  const post = await client.fetch(query, { slug });

  if (!post) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-neutral">
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">Article not found</p>
      </div>
    );
  }

  return (
    <main className="bg-background">
      <MainBlog post={post} />
      <Footer />
    </main>
  );
}