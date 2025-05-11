import mongoUtils from '../../../utils/mongoUtils';
import logger from '../../../logger/logger';
import { NextResponse } from 'next/server';
import { WithId, Document } from 'mongodb';
import schemaUtils from '../../../utils/schemaUtils';
import { IProject, ProjectSchema } from '../../../models/projects';

export async function GET() {
    try {
        const client = await mongoUtils.connectMongo();
        const db = client.db(process.env.MONGO_DBNAME);
        const projectCollection = db.collection('projects');

        const cursor = projectCollection.find({});
        const projectArr: WithId<Document>[] = await cursor.toArray();
        const projects: IProject[] = [];
        for (let doc of projectArr) {
            schemaUtils.validateSchemaAndPush<IProject>(
                ProjectSchema,
                doc,
                projects
            );
        }
        return NextResponse.json({ data: projects });
    } catch (error) {
        logger.error(error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
