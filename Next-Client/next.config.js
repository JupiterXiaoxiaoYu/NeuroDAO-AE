/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: "",
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
