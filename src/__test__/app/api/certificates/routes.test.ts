/**
 * @jest-environment node
 */
import { testApiHandler } from 'next-test-api-route-handler';
import * as appHandler from '../../../../app/api/certifications/route';
import schemaUtils from '../../../../utils/schemaUtils';
import { Collection, Db } from 'mongodb';
import connectMongo from '../../../../utils/mongoConnect';
import { ICertificate } from '../../../../models/certification';

jest.mock('../../../../utils/mongoConnect');
jest.mock('../../../../utils/schemaUtils');

describe('/api/certificates', () => {
    let mockConnectMongo: jest.Mock;
    let mockDb: { collection: jest.Mock } & Db;
    let mockCertsCollection: {
        find: jest.Mock;
        toArray: jest.Mock;
    } & Collection;

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        // Set up the mocked MongoDB client and database
        mockCertsCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn(),
            }),
            toArray: jest.fn(), // Added this line for type safety
        } as unknown as { find: jest.Mock; toArray: jest.Mock } & Collection;

        mockDb = {
            collection: jest.fn().mockReturnValue(mockCertsCollection),
        } as unknown as { collection: jest.Mock } & Db;

        mockConnectMongo = jest.fn().mockResolvedValue({
            db: jest.fn().mockReturnValue(mockDb),
            close: jest.fn(),
        });
    });
    it('should return 200 for valid request', async () => {
        (connectMongo as jest.Mock).mockImplementationOnce(mockConnectMongo);
        const mockCertificates: (ICertificate & { _id: string })[] = [
            {
                _id: '1',
                name: 'Certificate A',
                year_obtained: '2023-01-15',
                credentials_url: 'test',
                logo_src: 'test',
                theme_color: 'black',
            },
            {
                _id: '2',
                name: 'Certificate B',
                year_obtained: '2023-03-20',
                credentials_url: 'test',
                logo_src: 'test',
                theme_color: 'blue',
            },
        ];
        (mockCertsCollection.find().toArray as jest.Mock).mockResolvedValue(
            mockCertificates
        );
        (schemaUtils.validateSchemaAndPush as jest.Mock).mockImplementation(
            (schema, data, arr) => {
                arr.push(data);
            }
        );

        await testApiHandler({
            appHandler,
            async test({ fetch }) {
                const res = await fetch({ method: 'GET' });
                //expect(schemaUtils.validateSchemaAndPush).toHaveBeenCalled();
                expect(res.status).toBe(200);
                const body = await res.json();
                expect(body).toHaveProperty('data');
                expect(body.data.length).toBe(2);
            },
        });
    });

    it('should return 500 for invalid error', async () => {
        (connectMongo as jest.Mock).mockImplementationOnce(() => {
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
