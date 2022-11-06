import connectMongo from '../../../utils/mongoConnect';
import Project from '../../../models/project';
import logger from '../../../logger/logger';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default function handler(req, res) {
    try {
        connectMongo();

        logger.info('Fetching Projects document..');
        Project.find({}, (err, result) => {
            if (err) {
                res.status(500).json({ msg: errMsg });
            } else {
                logger.info(`found ${result.length} projects...`);
                res.status(200).json({ projects: result });
            }
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error });
    }
}
