import connectMongo from '../../../utils/mongoConnect';
import Design from '../../../models/design';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default function handler(req, res) {
    try {
        console.info('Connecting to MongoDB..');
        connectMongo();
        console.info('Mongo Connection Established..');

        console.log('Fetching Designs document..');
        Design.find({}, (err, result) => {
            if (err) {
                res.status(500).json({ msg: errMsg });
            } else {
                console.info(`found ${result.length} designs...`);
                res.status(200).json({ designs: result });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}
