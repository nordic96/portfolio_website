import connectMongo from '../../../utils/mongoConnect';
import logger from '../../../logger/logger';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await connectMongo();
            const db = client.db(process.env.MONGO_DBNAME);
            const projectCollection = db.collection('projects');

            logger.info('Fetching Projects document..');
            const cursor = projectCollection.find();
            logger.info(
                `found ${await projectCollection.countDocuments()} projects...`
            );
            const projects = [];
            await cursor.forEach((doc) => {
                projects.push(doc);
            });
            res.status(200).json({ projects: projects });
            client.close();
            resolve();
        } catch (error) {
            logger.error(error);
            res.status(500).json({ error });
            reject();
        }
    });
}
