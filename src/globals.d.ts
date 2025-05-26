import { Mongoose } from 'mongoose';

declare module '*.png';
declare module '*.svg';

interface MongooseCache {
    client: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    var mongoose: MongooseCache;
}
