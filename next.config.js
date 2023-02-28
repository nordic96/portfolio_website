module.exports = () => {
    return {
        reactStrictMode: true,
        swcMinify: true,
        env: {
            VERSION: process.env.REACT_APP_VERSION,
        },
        output: 'standalone',
    };
};
