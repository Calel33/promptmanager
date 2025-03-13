/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/prompts',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/auth/reset-password',
        destination: '/auth/reset-password',
      },
      {
        source: '/auth/update-password',
        destination: '/auth/update-password',
      },
    ];
  },
};

module.exports = nextConfig; 