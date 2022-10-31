import connectMongo from '../../../utils/mongoConnect';
import Project from '../../../models/project';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default function handler(req, res) {
    try {
        console.info('Connecting to MongoDB..');
        connectMongo();
        console.info('Mongo Connection Established..');

        console.log('Fetching Projects document..');
        Project.find({}, (err, result) => {
            if (err) {
                res.status(500).json({ msg: errMsg });
            } else {
                console.info(`found ${result.length} projects...`);
                res.status(200).json({ projects: result });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}
