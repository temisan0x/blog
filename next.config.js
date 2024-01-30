/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  experimental: {
    appDir: true,
    serverActions: true
  },
};

module.exports = nextConfig;

module.exports.webpack = (config) => {
  config.experiments = { ...config.experiments, topLevelAwait: true };
  return config;
};
