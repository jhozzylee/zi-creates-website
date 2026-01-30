import { Metadata } from "next";
import Footer from "@/components/Footer";
import BlogContent from "@/components/Blogs"; 

// Premium SEO Metadata
export const metadata: Metadata = {
  title: "The Journal | Zi Creates",
  description: "Bespoke branding and creative development insights from Zi Creates.",
  openGraph: {
    title: "The Journal | Zi Creates",
    description: "Bespoke branding and creative development insights.",
    url: "https://zicreates.com/blogs",
    siteName: "Zi Creates",
    images: [
      {
        url: "https://zicreates.com/og-zicreates.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Blogpage() {
  return (
    <>
      <main className="bg-background">
        {/* This component handles the Async Sanity Fetching */}
        <BlogContent />
        
        <Footer />

        {/* This component handles the Client-side state for modals */}
      </main>
    </>
  );
}