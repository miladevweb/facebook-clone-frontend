/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'ivebook-clone-backend.onrender.com',
            port: '',
            pathname: '/**',
         },
      ],
   },
};

module.exports = nextConfig;
