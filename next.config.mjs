/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: `${process.env.NEXT_PUBLIC_APP_URL}/api/:path*`,
          },
        ]
      },
};

export default nextConfig;
