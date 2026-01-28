import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["media.istockphoto.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
