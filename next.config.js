module.exports = () => {
    return {
        reactStrictMode: false,
        swcMinify: true,
        env: {
            VERSION: process.env.APP_VERSION,
        },
        output: 'standalone',
    };
};
