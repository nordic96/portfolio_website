import logger from '../../logger';
import mongodbUtils from '../../utils/mongodbUtils';
import Project, { IProject } from './Project';

export const resolver = {
    Query: {
        projects: async (
            _parent: any,
            args: any,
            _context: any
        ): Promise<IProject[]> => {
            try {
                await mongodbUtils.connectMongoose(); // Ensure DB connection
                logger.info('Fetching projects from MongoDB...');
                // Using .lean() returns plain JS objects.
                // The virtual 'id' and toJSON/toObject transforms in the schema are primarily for Mongoose documents.
                // When using .lean(), you often need to handle transformations explicitly if they are not simple field mappings.
                let projectsData;
                if (args.orderBy.year === 'ASC') {
                    projectsData = await Project.find({})
                        .sort({ devyear: 1 })
                        .lean()
                        .exec();
                } else {
                    projectsData = await Project.find({})
                        .sort({ devyear: -1 })
                        .lean()
                        .exec();
                }

                logger.info(`Found ${projectsData.length} projects.`);

                // Manually map _id to id when using .lean() if virtuals aren't automatically applied by lean()
                // (which they typically are not for virtual getters without extra configuration or direct Mongoose doc usage)
                return projectsData.map((cert) => ({
                    ...cert,
                    id: cert._id.toString(), // Ensure 'id' is populated correctly from '_id'
                })) as IProject[]; // Cast to ICertificate[] (ensure your ICertificate has 'id' as optional or string)
            } catch (error) {
                logger.error('Error fetching projects:', error);
                throw new Error('Failed to fetch projects from database.');
            }
        },
    },
};
