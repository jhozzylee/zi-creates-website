import { MetadataRoute } from 'next';
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j61z87re",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false, 
  apiVersion: "2024-01-01",
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.zicreates.com";

  // 1. Static Pages (The core of Zi Creates)
  const staticPages: MetadataRoute.Sitemap = [
    { 
      url: baseUrl, 
      lastModified: new Date(), 
      changeFrequency: 'weekly', 
      priority: 1 
    },
    { 
      url: `${baseUrl}/contact`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.8 
    },
  ];

  try {
    // 2. Fetch Blog Posts (Pre-wired for when you start your blog)
    // Change "post" to whatever your schema name is once you create it
    const query = `*[_type == "post"]{ "slug": slug.current, _updatedAt }`;
    const posts = await client.fetch(query);

    const blogUrls = (posts || []).map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...blogUrls];

  } catch (error) {
    // If Sanity has no "post" type yet, it might throw an error. 
    // This catch ensures your main pages still show up in the sitemap.
    return staticPages;
  }
}