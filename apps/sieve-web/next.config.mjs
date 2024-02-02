/** @type {import('next').NextConfig} */
const nextConfig = {
    appDir: true,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
      },
};

export default nextConfig;

