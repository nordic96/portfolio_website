module.exports = () => {
    return {
        reactStrictMode: false,
        env: {
            VERSION: process.env.APP_VERSION,
        },
        output: 'standalone',
        experimental: {
            optimizePackageImports: ['@mui/material', '@mui/icons-material'],
        },
    };
};
