/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "files.edgestore.dev",
      "res.cloudinary.com",
    ],
    loader: "cloudinary",
    path: "https://res.cloudinary.com/dgi0pwcxz/image/upload/", // Replace with your Cloudinary URL prefix
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
};

module.exports = nextConfig;
