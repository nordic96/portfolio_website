import logger from '../../../logger';
import Certificate, { ICertificate } from '../../../models/Certificate';
import mongodbUtils from '../../../utils/mongodbUtils';

const resolvers = {
    Query: {
        certificates: async (): Promise<ICertificate[]> => {
            try {
                await mongodbUtils.connectMongoose(); // Ensure DB connection
                logger.info('Fetching certificates from MongoDB...');
                // Using .lean() returns plain JS objects.
                // The virtual 'id' and toJSON/toObject transforms in the schema are primarily for Mongoose documents.
                // When using .lean(), you often need to handle transformations explicitly if they are not simple field mappings.
                const certificatesData = await Certificate.find({})
                    .lean()
                    .exec();

                logger.info(`Found ${certificatesData.length} certificates.`);

                // Manually map _id to id when using .lean() if virtuals aren't automatically applied by lean()
                // (which they typically are not for virtual getters without extra configuration or direct Mongoose doc usage)
                return certificatesData.map((cert) => ({
                    ...cert,
                    id: cert._id.toString(), // Ensure 'id' is populated correctly from '_id'
                })) as ICertificate[]; // Cast to ICertificate[] (ensure your ICertificate has 'id' as optional or string)
            } catch (error) {
                logger.error('Error fetching certificates:', error);
                throw new Error('Failed to fetch certificates from database.');
            }
        },
    },
    // Certificate field resolvers can also be used if you are not using .lean()
    // or want more fine-grained control.
    /*
    Certificate: {
      // This resolver would be used if you returned full Mongoose documents from the 'certificates' query resolver
      // and your GraphQL schema expects an 'id' field.
      // The virtual 'id' on the Mongoose schema should handle this automatically for Mongoose documents.
      id: (parent: ICertificate): string => {
          // If parent._id is already a string due to a transform or it's a lean object with _id.toString()
          // you might not need .toHexString(). Check the type of parent._id.
          // For a Mongoose document, parent._id would be an ObjectId.
          return parent._id.toHexString(); 
      }
    },
    */
};

export default resolvers;
