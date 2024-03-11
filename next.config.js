/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "files.edgestore.dev",
      "res.cloudinary.com",
    ],  },
  experimental: {
    appDir: true,
    serverActions: true,
    optimizeFonts: true,
  },
};

module.exports = nextConfig;
