import { MongoClient } from 'mongodb';
import logger from '../logger/logger';
import mongoose, { Mongoose, MongooseOptions } from 'mongoose';

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { client: null, promise: null };
}

async function connectMongoose(): Promise<Mongoose> {
    const MONGODB_URI = process.env.MONGO_URI;
    const DB_NAME = process.env.MONGO_DBNAME;
    const URI_OPTIONS = process.env.URI_OPTIONS;
    if (!MONGODB_URI || !DB_NAME) {
        throw new Error(
            'MONGODB_URI or DB_NAME environment variable is not set.'
        );
    }
    if (cached.client) {
        logger.info(
            '[connectMongoose] returning existing mongo client instance'
        );
        return cached.client;
    }
    if (!cached.promise) {
        const opts: MongooseOptions = { bufferCommands: false };
        logger.info('[connectMongoose] Creating new Connection...');
        const connStr = `${MONGODB_URI}/${DB_NAME}${URI_OPTIONS ?? ''}`;
        cached.promise = mongoose
            .connect(connStr, opts)
            .then((mongooseInstance) => {
                logger.info('[connectMongo] Connection Successful');
                return mongooseInstance;
            })
            .catch((err) => {
                logger.error('[connectMongo] Connection Error', err);
                throw err;
            });
    }
    try {
        cached.client = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.client;
}

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
                logger.error('[mongoConnect] MongoDB connection error', err);
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

const mongoUtils = { connectMongo, resetInstance, connectMongoose };
export default mongoUtils;
