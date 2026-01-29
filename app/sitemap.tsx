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

  try {
    // 1. Fetch Projects
    const query = `*[_type == "portfolio"]{ "slug": slug.current, _updatedAt }`;
    const projects = await client.fetch(query);

    // 2. Map Projects
    const projectUrls = (projects || []).map((project: any) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: project._updatedAt ? new Date(project._updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    // 3. Static Pages
    const staticPages: MetadataRoute.Sitemap = [
      { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
      { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
      { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ];

    return [...staticPages, ...projectUrls];

  } catch (error) {
    console.error("Sitemap error:", error);
    // FALLBACK: If Sanity fails, at least return the home page so Google doesn't see an error
    return [
      { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ];
  }
}