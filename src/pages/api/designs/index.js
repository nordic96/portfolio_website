import connectMongo from '../../../utils/mongoConnect';
import Design from '../../../models/design';
import logger from '../../../logger/logger';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default function handler(req, res) {
    try {
        connectMongo();

        logger.info('Fetching Designs document..');
        Design.find({}, (err, result) => {
            if (err) {
                res.status(500).json({ msg: errMsg });
            } else {
                logger.info(`found ${result.length} designs...`);
                res.status(200).json({ designs: result });
            }
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error });
    }
}
