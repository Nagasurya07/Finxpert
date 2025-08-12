/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
      allowedOrigins: [
        'localhost:3000',
        '.app.github.dev',
      ],
    },
  },
};

export default nextConfig;
