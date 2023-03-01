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
            const designCollection = db.collection('designs');

            logger.info('Fetching Designs document..');
            const cursor = designCollection.find();

            logger.info(
                `found ${await designCollection.countDocuments()} designs...`
            );
            const designs = [];
            await cursor.forEach((doc) => {
                // logger.info(doc);
                designs.push(doc);
            });
            res.status(200).json({ designs: designs });

            client.close();
            resolve();
        } catch (error) {
            logger.error(error);
            res.status(500).json({ error });
            reject();
        }
    });
}
