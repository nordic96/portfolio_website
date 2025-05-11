/**
 * @jest-environment node
 */
import { testApiHandler } from 'next-test-api-route-handler';
import * as appHandler from '../../../../app/api/projects/route';
import testUtils from '../../../../utils/testUtils';
import mongoUtils from '../../../../utils/mongoUtils';
import { IProject } from '../../../../models/projects';

jest.mock('../../../../utils/mongoUtils');

describe('/api/projects', () => {
    const { mockConnectMongo, mockCollections } =
        testUtils.mockEssentialDBPackages();
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 for empty response', async () => {
        (mongoUtils.connectMongo as jest.Mock).mockImplementationOnce(
            mockConnectMongo
        );
        (mockCollections.find().toArray as jest.Mock).mockResolvedValue([]);
        await testApiHandler({
            appHandler,
            async test({ fetch }) {
                const res = await fetch({ method: 'GET' });
                expect(res.status).toBe(200);
                const body = await res.json();
                expect(body).toHaveProperty('data');
            },
        });
    });

    it('should return 200 for valid non-empty response', async () => {
        (mongoUtils.connectMongo as jest.Mock).mockImplementationOnce(
            mockConnectMongo
        );
        const mockProjects: (IProject & { _id: Object })[] = [
            {
                _id: new Object(),
                projectlink: 'asdasdasd',
                videolink: 'adsadad',
                name: 'test',
                devyear: 2024,
                projecttype: 'school',
                medialink: 'dasdsad',
                tags: [],
                desc: 'test_desc',
            },
        ];
        (mockCollections.find().toArray as jest.Mock).mockResolvedValueOnce(
            mockProjects
        );
        await testApiHandler({
            appHandler,
            async test({ fetch }) {
                const res = await fetch({ method: 'GET' });
                expect(res.status).toBe(200);
                const body = await res.json();
                expect(body).toHaveProperty('data');
                expect(body.data.length).toBe(1);
            },
        });
    });

    it('should return 500 for invalid occasions', async () => {
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
