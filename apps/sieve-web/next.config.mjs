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
        ],
      },
};

export default nextConfig;

//https://i.scdn.co/image/ab67757000003b825226df2006a41cd88a6d8559