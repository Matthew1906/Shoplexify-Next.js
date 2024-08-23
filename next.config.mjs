/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          // {
          //   protocol: 'https',
          //   hostname: 'randomuser.me',
          //   port: '',
          //   pathname: '/api/portraits/**',
          // },
          {
            protocol: 'https',
            hostname: 'ik.imagekit.io',
            port: '',
            pathname: '/matthew1906/shoplexify/**',
          },
        ],
    },
    experimental: {
      serverActions: {
        bodySizeLimit: '25mb',
      },
    },
    env: {
      SERVER_URL: process.env.SERVER_URL,
      PAGE_LENGTH: process.env.PAGE_LENGTH
    }
};

export default nextConfig;
