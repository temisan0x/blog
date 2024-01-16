/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
      domains: ['lh3.googleusercontent.com',],
    },
    experimental: {
      appDir: true,
    }
};

module.exports = nextConfig;

// Add webpack configuration within the same file
module.exports.webpack = (config) => {
  config.experiments = { ...config.experiments, topLevelAwait: true };
  return config;
}