module.exports = () => {
    const rewrites = async () => {
        return [
            {
                source: '/api/:slug*',
                destination: 'http://localhost:4000/api/:slug*',
            },
        ];
    };
    return {
        rewrites,
        env: {
            VERSION: process.env.REACT_APP_VERSION,
        },
    };
};
