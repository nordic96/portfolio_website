const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProjectSchema = new Schema(
    {
        name: {
            type: String,
        },
        projecttype: {
            type: String,
        },
        projectlink: {
            type: String,
        },
        tags: {
            type: [String],
        },
        devyear: {
            type: Number,
        },
        medialink: {
            type: String,
        },
        videolink: {
            type: String,
        },
        desc: {
            type: String,
        },
    },
    { collection: 'projects' }
);

export default mongoose.models.projects ||
    mongoose.model('projects', ProjectSchema);
