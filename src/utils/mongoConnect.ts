/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MongoClient } from 'mongodb';
import logger from '../logger/logger';

let client: MongoClient;

const connectMongo = async () => {
    logger.info('Connecting to MongoDB..');
    if (client) {
        return client;
    }
    client = new MongoClient(process.env.MONGO_URI!);
    logger.info('Mongo Connection Established..');
    return client;
};

export default connectMongo;
