import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: false,
    env: {
        VERSION: process.env.APP_VERSION,
    },
    output: 'standalone',
    transpilePackages: ['@mui/material', '@mui/icons-material'],
};

export default nextConfig;
