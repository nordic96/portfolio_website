import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    env: {
        VERSION: process.env.APP_VERSION,
    },
    images: {
        remotePatterns: [new URL('https://cdn.jsdelivr.net/**')],
    },
    serverExternalPackages: ['pino', 'thread-stream', 'pino-pretty'],
    output: 'standalone',
    transpilePackages: ['@mui/material', '@mui/icons-material'],
};

export default nextConfig;
