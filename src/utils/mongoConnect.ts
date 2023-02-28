import mongoose from 'mongoose';
import logger from '../logger/logger';

const connectMongo = async () => {
    logger.info('Connecting to MongoDB..');
    await mongoose.connect(
        `mongodb+srv://${process.env.MONGO_CLUSTER}.i9pmr.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
        { user: process.env.MONGO_USER, pass: process.env.MONGO_SECRET }
    );
    logger.info('Mongo Connection Established..');
};
export default connectMongo;
