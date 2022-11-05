module.exports = () => {
    return {
        env: {
            VERSION: process.env.REACT_APP_VERSION,
        },
        output: 'standalone',
    };
};
