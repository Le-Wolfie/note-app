/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/notes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
