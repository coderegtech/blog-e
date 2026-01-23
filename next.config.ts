import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["dbumzxiwuncalzypkehc.supabase.co"],
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // Strict mode
  reactStrictMode: true,
};

export default nextConfig;
