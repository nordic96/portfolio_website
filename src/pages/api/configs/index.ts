import logger from '../../../logger/logger';
import connectMongo from '../../../utils/mongoConnect';
import { Labels } from 'labelcontainer/build/types';
import { MongoClient } from 'mongodb';

export async function getConfigData(): Promise<Labels> {
    let data: Labels = {};
    const client: MongoClient = await connectMongo();
    try {
        const db = client.db(process.env.MONGO_DBNAME);
        const configs = db.collection('configs');

        const cursor = configs.find();
        let labels = await cursor.toArray();
        logger.info(labels);
        if (!!labels) {
            data = JSON.parse(JSON.stringify(labels[0]));
            logger.info(`Config data found: ${JSON.stringify(labels[0])}`);
        } else {
            logger.info('Config data not found or empty');
        }
    } catch (e) {
        logger.error(e);
    } finally {
        return data;
    }
}
