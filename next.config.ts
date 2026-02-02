import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["ai"],

  images: {
    domains: ["media.istockphoto.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
