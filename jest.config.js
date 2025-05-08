module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'], // Or try '@vercel/turbopack-jest' if available/recommended
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
