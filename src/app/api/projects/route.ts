import connectMongo from '../../../utils/mongoConnect';
import logger from '../../../logger/logger';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function GET() {
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
        return projects;
    } catch (error) {
        logger.error(error);
        return { error };
    }
}
