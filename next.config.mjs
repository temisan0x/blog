/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'images.unsplash.com',
              pathname: '**',
          },
      ],
      domains: ['pwrites.princeton.edu'],
  },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
        };
      }
  
      return config;
    },
}

export default nextConfig