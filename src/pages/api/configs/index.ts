import connectMongo from '../../../utils/mongoConnect';
import logger from '../../../logger/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import ConfigSchema from '../../../models/configs';
import { Labels } from 'labelcontainer/build/types';

export async function getConfigData() {
    let data: Labels = {};
    try {
        connectMongo();
        const labels = await ConfigSchema.findOne({});
        if (!!labels) data = JSON.parse(JSON.stringify(labels));
        logger.info(`Config data found: ${labels}`);
    } catch (e) {
        logger.error(e);
    } finally {
        return data;
    }
}

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        connectMongo();
        const config = await ConfigSchema.findOne({});
        if (!!config) {
            logger.info(config);
            res.status(200).json({ configs: config });
        } else {
            res.status(204).json({ msg: 'config data empty / not found' });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error });
    }
}
