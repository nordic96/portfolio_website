/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MongoClient } from 'mongodb';
import logger from '../logger/logger';

let client: MongoClient;

const connectMongo = async () => {
    logger.info('Connecting to MongoDB..' + process.env.MONGO_URI);
    if (client) {
        return client;
    }
    logger.info('Mongo Connection Established..');
    client = new MongoClient(process.env.MONGO_URI!);
    return client;
};

export default connectMongo;
