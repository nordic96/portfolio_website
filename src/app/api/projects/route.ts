import connectMongo from '../../../utils/mongoConnect';
import logger from '../../../logger/logger';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const client = await connectMongo();
        const db = client.db(process.env.MONGO_DBNAME);
        const projectCollection = db.collection('projects');

        logger.info('Fetching Projects document..');
        const cursor = projectCollection.find();
        logger.info(
            `found ${await projectCollection.countDocuments()} projects...`
        );
        const projects = await cursor.toArray();
        return NextResponse.json({ projects: projects || [] });
    } catch (error) {
        logger.error(error);
        return NextResponse.error();
    }
}
