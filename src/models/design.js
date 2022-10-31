import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let DesignSchema = new Schema(
    {
        name: {
            type: String,
        },
        organisation: {
            type: String,
        },
        year: {
            type: Number,
        },
        medialink: {
            type: String,
        },
        desc: {
            type: String,
        },
    },
    { collection: 'designs' }
);

module.exports =
    mongoose.models.designs || mongoose.model('designs', DesignSchema);
