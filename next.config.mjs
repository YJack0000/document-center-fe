/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://document-center.cerana.tech/api/:path*',
          },
        ]
      },
};

export default nextConfig;
