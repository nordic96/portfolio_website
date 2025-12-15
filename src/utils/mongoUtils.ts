import { MongoClient } from 'mongodb';
import logger from '../logger/logger';

let client: MongoClient | null = null;
let connectionPromise: Promise<MongoClient> | null = null;

async function connectMongo(): Promise<MongoClient> {
    if (client) {
        logger.info('[mongoConnect] returning existing MongoClient instance');
        return client;
    }
    if (connectionPromise) {
        logger.info(
            '[mongoConnect] Connection attempt already in progress, returning existing promise.'
        );
        return connectionPromise;
    }
    connectionPromise = (async () => {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri || mongoUri === '') {
            logger.error(
                '[mongoConnect] MONGO_URI environment variable is not set.'
            );
            throw new Error(
                'MONGO_URI environment variable is not set. Cannot connect to MongoDB.'
            );
        }
        try {
            const newClient = new MongoClient(mongoUri);

            logger.info('[mongoConnect] Connecting to server...');
            await newClient.connect();
            logger.info('[mongoConnect] successfully connected');

            client = newClient;
            client.on('close', () => {
                logger.warn('[mongoConnect] MongoDB connection closed');
            });
            client.on('error', (err) => {
                logger.error(`[mongoConnect] MongoDB connection error ${err}`);
            });
            return client;
        } catch (error) {
            logger.error(error);
            connectionPromise = null;
            throw error;
        }
    })();
    return connectionPromise;
}

function resetInstance() {
    client = null;
    connectionPromise = null;
}

const mongoUtils = { connectMongo, resetInstance };
export default mongoUtils;
