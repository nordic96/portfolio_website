module.exports = () => {
    return {
        reactStrictMode: false,
        swcMinify: true,
        env: {
            VERSION: process.env.REACT_APP_VERSION,
        },
        output: 'standalone',
    };
};
