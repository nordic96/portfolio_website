import { NextResponse } from 'next/server';
import logger from '../../../logger/logger';
import mongoUtils from '../../../utils/mongoUtils';
import { Labels } from 'labelcontainer/build/types';
import { MongoClient, WithId, Document } from 'mongodb';
import schemaUtils from '../../../utils/schemaUtils';
import { ConfigsSchema } from '../../../models/configs';

export async function GET() {
    let data: Labels = {};
    const client: MongoClient = await mongoUtils.connectMongo();
    try {
        const db = client.db(process.env.MONGO_DBNAME);
        const configs = db.collection('configs');

        const cursor = configs.find();
        const labels: WithId<Document>[] = await cursor.toArray();
        if (labels?.[0]) {
            const validConfigs: Labels[] = [];
            schemaUtils.validateSchemaAndPush<Labels>(
                ConfigsSchema,
                labels[0],
                validConfigs
            );
            data = JSON.parse(JSON.stringify(validConfigs[0]));
        } else {
            logger.warn('Config data not found or empty');
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
