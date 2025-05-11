import { NextResponse } from 'next/server';
import logger from '../../../logger/logger';
import mongoUtils from '../../../utils/mongoUtils';
import { Labels } from 'labelcontainer/build/types';
import { MongoClient } from 'mongodb';

export async function GET() {
    let data: Labels = {};
    const client: MongoClient = await mongoUtils.connectMongo();
    try {
        const db = client.db(process.env.MONGO_DBNAME);
        const configs = db.collection('configs');

        const cursor = configs.find();
        const labels = await cursor.toArray();
        console.log(!!labels);
        if (!!labels) {
            data = JSON.parse(JSON.stringify(labels[0]));
            logger.info(`Config data found: ${JSON.stringify(labels[0])}`);
        } else {
            logger.info('Config data not found or empty');
            throw new Error('empty data');
        }
        return NextResponse.json({
            configs: data,
        });
    } catch (e) {
        logger.error(e);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500, statusText: 'Internal Server Error' }
        );
    }
}
