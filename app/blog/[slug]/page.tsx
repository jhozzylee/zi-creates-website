import { client } from "@/sanity/lib/client";
import MainBlog from "@/components/MainBlog";
import Footer from "@/components/Footer";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Await params (Required in new Next.js versions)
  const { slug } = await params;

  // 2. Fixed GROQ Query (Added missing commas)
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