// __mocks__/mongodb.js

// Mocking the MongoClient
export const mockConnect = jest.fn();
export const mockClose = jest.fn();
export const mockOn = jest.fn();

// This is the object that `new MongoClient()` will return in our tests
export const mockClientInstance = {
    connect: mockConnect,
    close: mockClose,
    on: mockOn,
    // Add any other methods or properties your code might access
    // For example, if you were checking client.topology.isConnected()
    // topology: { isConnected: jest.fn().mockReturnValue(true) },
};

// This mocks the MongoClient constructor
export const mockMongoClientConstructor = jest
    .fn()
    .mockImplementation(() => mockClientInstance);

export const mockObjectIdConstructor = jest.fn().mockImplementation(() => ({}));

module.exports = {
    MongoClient: mockMongoClientConstructor,
    ObjectId: mockObjectIdConstructor,
};
