/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'h7s6fkxi0hijadl6.public.blob.vercel-storage.com',
                pathname: '/**',
            },
        ],
    }
};

export default nextConfig;
