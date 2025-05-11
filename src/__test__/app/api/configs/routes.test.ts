/**
 * @jest-environment node
 */
import { Collection, Db } from 'mongodb';
import { testApiHandler } from 'next-test-api-route-handler';
import * as appHandler from '../../../../app/api/configs/route';
import mongoUtils from '../../../../utils/mongoUtils';
import { Labels } from 'labelcontainer/build/types';

jest.mock('../../../../utils/mongoUtils');

describe('api/configs/', () => {
    let mockConnectMongo: jest.Mock;
    let mockDb: { collection: jest.Mock } & Db;
    let mockCollection: {
        find: jest.Mock;
        toArray: jest.Mock;
    } & Collection;

    beforeEach(() => {
        // Reset mocks before each test
        jest.resetAllMocks();
        jest.resetModules();

        // Set up the mocked MongoDB client and database
        mockCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn(),
            }),
            toArray: jest.fn(), // Added this line for type safety
        } as unknown as { find: jest.Mock; toArray: jest.Mock } & Collection;

        mockDb = {
            collection: jest.fn().mockReturnValue(mockCollection),
        } as unknown as { collection: jest.Mock } & Db;

        mockConnectMongo = jest.fn().mockResolvedValue({
            db: jest.fn().mockReturnValue(mockDb),
            close: jest.fn(),
        });
        (mongoUtils.connectMongo as jest.Mock).mockImplementation(
            mockConnectMongo
        );
    });

    it('should return 200 for valid response', async () => {
        const mockLabels: Labels[] = [
            {
                GLOBAL: {
                    en: {
                        home: 'home',
                    },
                },
            },
        ];
        (mockCollection.find().toArray as jest.Mock).mockResolvedValue(
            mockLabels
        );
        await testApiHandler({
            appHandler,
            async test({ fetch }) {
                const res = await fetch({ method: 'GET' });
                expect(res.status).toBe(200);
                const body = await res.json();

                expect(mockDb.collection).toHaveBeenCalled();
                expect(mockCollection.find).toHaveBeenCalled();
                expect(mockCollection.find().toArray).toHaveBeenCalled();
                expect(body).toHaveProperty('configs');
            },
        });
    });

    it('should handle empty labels response', async () => {
        (mockCollection.find().toArray as jest.Mock).mockResolvedValueOnce(
            null
        );
        await testApiHandler({
            appHandler,
            async test({ fetch }) {
                const res = await fetch({ method: 'GET' });
                expect(res.status).toBe(500);

                expect(mockDb.collection).toHaveBeenCalled();
                expect(mockCollection.find).toHaveBeenCalled();
                expect(mockCollection.find().toArray).toHaveBeenCalled();
            },
        });
    });

    it('should return 500 for invalid error', async () => {
        (mongoUtils.connectMongo as jest.Mock).mockImplementationOnce(() => {
            throw Error('error');
        });
        await testApiHandler({
            appHandler,
            async test({ fetch }) {
                const res = await fetch({ method: 'GET' });
                expect(res.status).toBe(500);
            },
        });
    });
});
