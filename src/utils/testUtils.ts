import { Collection, Db } from 'mongodb';

function mockEssentialDBPackages() {
    let mockConnectMongo: jest.Mock;
    let mockDb: { collection: jest.Mock } & Db;
    let mockCollections: {
        find: jest.Mock;
        toArray: jest.Mock;
    } & Collection;

    mockCollections = {
        find: jest.fn().mockReturnValue({
            toArray: jest.fn(),
        }),
        toArray: jest.fn(), // Added this line for type safety
    } as unknown as { find: jest.Mock; toArray: jest.Mock } & Collection;

    mockDb = {
        collection: jest.fn().mockReturnValue(mockCollections),
    } as unknown as { collection: jest.Mock } & Db;

    mockConnectMongo = jest.fn().mockResolvedValue({
        db: jest.fn().mockReturnValue(mockDb),
        close: jest.fn(),
    });
    return { mockConnectMongo, mockDb, mockCollections };
}

const testUtils = { mockEssentialDBPackages };
export default testUtils;
