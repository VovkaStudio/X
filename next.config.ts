import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['fakestoreapi.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }
};

export default nextConfig;