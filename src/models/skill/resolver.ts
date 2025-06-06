import logger from '../../logger';
import mongodbUtils from '../../utils/mongodbUtils';
import Skill, { ISkill } from './Skill';

export const resolver = {
    Query: {
        skills: async (): Promise<ISkill[]> => {
            try {
                await mongodbUtils.connectMongoose();
                const skillsData = await Skill.find({}).lean().exec();
                return skillsData.map((skill) => ({
                    ...skill,
                    id: skill._id.toString(),
                })) as ISkill[];
            } catch (error) {
                logger.error('Error fetching skills:', error);
                throw new Error('Failed to fetch skills from database.');
            }
        },
        skillsByCategory: async (
            _parent: any,
            args: { category: any },
            _context: any,
            _info: any
        ): Promise<ISkill[]> => {
            try {
                const category = args.category;
                logger.info(`Searching skills by category, ${category}`);
                await mongodbUtils.connectMongoose();
                const skillsData = await Skill.find({ category: category })
                    .lean()
                    .exec();
                logger.info(skillsData);
                return skillsData.map((skill) => ({
                    ...skill,
                    id: skill._id.toString(),
                })) as ISkill[];
            } catch (error) {
                logger.error(
                    `Error fetching skills by category ${args.category}`
                );
                throw new Error(
                    `Failed to fetch skills by category ${args.category}`
                );
            }
        },
    },
};
