/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['enertechups.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'enertechups.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
