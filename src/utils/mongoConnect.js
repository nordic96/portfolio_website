import mongoose from 'mongoose';

const connectMongo = async () =>
    mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_SECRET}@clustergh.i9pmr.mongodb.net/<dbname>?retryWrites=true&w=majority`,
        { useUnifiedTopology: true, useNewUrlParser: true }
    );

export default connectMongo;
