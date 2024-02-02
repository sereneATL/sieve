/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "i.scdn.co",
            port: "",
            pathname: "/image/**",
          },
          { 
            protocol: "https",
            hostname: "i.scdn.co",
            port: "scontent-*.xx.fbcdn.net",
          }
        ],
      },
};

export default nextConfig;

