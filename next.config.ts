const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
