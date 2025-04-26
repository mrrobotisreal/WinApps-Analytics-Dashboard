import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: { appDocumentPreloading: true },
  reactStrictMode: true,
  images: { domains: [] }
};

export default nextConfig;
