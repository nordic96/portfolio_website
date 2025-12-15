import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: false,
    env: {
        VERSION: process.env.APP_VERSION,
    },
    serverExternalPackages: ['pino', 'thread-stream', 'pino-pretty'],
    output: 'standalone',
    transpilePackages: ['@mui/material', '@mui/icons-material'],
};

export default nextConfig;
