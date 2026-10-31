/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com" },
      { hostname: "d14vymw7cvldyc.cloudfront.net" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
