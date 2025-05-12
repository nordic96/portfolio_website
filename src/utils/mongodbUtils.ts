import mongoose, { Mongoose, MongooseOptions } from 'mongoose';
import logger from '../logger';

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { client: null, promise: null };
}

async function connectMongoose(): Promise<Mongoose> {
    const MONGODB_URI = process.env.MONGO_URI;
    const DB_NAME = process.env.MONGO_DBNAME;
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
        const connStr = `${MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`;
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

const mongodbUtils = { connectMongoose };
export default mongodbUtils;
