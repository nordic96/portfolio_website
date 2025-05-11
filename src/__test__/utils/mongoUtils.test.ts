/**
 * @jest-environment node
 */
import { MongoClient } from 'mongodb';
import mongoUtils from '../../utils/mongoUtils';
import logger from '../../logger';

jest.mock('../../logger/logger');
jest.mock('mongodb');

describe('mongoUtils', () => {
    beforeEach(() => {
        jest.resetModules(); // Resets module registry to ensure fresh imports
        process.env.MONGO_URI = 'mongodb://localhost:27017';
        mongoUtils.resetInstance();
    });

    it('should successfully connect to MongoDB on the first call', async () => {
        const client = await mongoUtils.connectMongo();

        expect(MongoClient).toHaveBeenCalledTimes(1);
        expect(MongoClient).toHaveBeenCalledWith(process.env.MONGO_URI);
        expect(client.connect).toHaveBeenCalledTimes(1);

        // Check if event listeners are attached
        expect(client.on).toHaveBeenCalledWith('close', expect.any(Function));
        expect(client.on).toHaveBeenCalledWith('error', expect.any(Function));
    });

    it('should successfully return predefined client instance', async () => {
        await mongoUtils.connectMongo();
        await mongoUtils.connectMongo();
        expect(MongoClient).toHaveBeenCalledTimes(2);
        expect(logger.info).toHaveBeenCalledWith(
            '[mongoConnect] returning existing MongoClient instance'
        );
    });

    it('should successfully handle where URI is not been provided', async () => {
        delete process.env.MONGO_URI;
        await expect(mongoUtils.connectMongo()).rejects.toThrow(
            'MONGO_URI environment variable is not set. Cannot connect to MongoDB.'
        );
        expect(logger.error).toHaveBeenCalledWith(
            '[mongoConnect] MONGO_URI environment variable is not set.'
        );
    });

    it('should throw error when client instantiating fails', async () => {
        (MongoClient as unknown as jest.Mock).mockImplementationOnce(() => {
            throw new Error('instantiate error');
        });
        await expect(mongoUtils.connectMongo()).rejects.toThrow(
            'instantiate error'
        );
    });
});
