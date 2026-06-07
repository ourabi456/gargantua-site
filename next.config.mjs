/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Heavy game art is served statically from /public — keep unoptimized
  // so no build-time image pipeline is required for the large sprites.
  images: { unoptimized: true },
};

export default nextConfig;
