import { MongoClient } from 'mongodb';
import logger from '../logger/logger';

let client: MongoClient;

const connectMongo = async () => {
    logger.info('[mongoConnect] Connecting to MongoDB..');
    if (client) {
        return client;
    }
    client = new MongoClient(process.env.MONGO_URI!);
    logger.info(`[${process.env.MONGO_DBNAME}] Mongo Connection Established..`);
    return client;
};

export default connectMongo;
