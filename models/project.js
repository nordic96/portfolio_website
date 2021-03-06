const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let project = new Schema(
    {
        name: {
            type: String
        },
        projecttype: {
            type: String
        },
        projectlink: {
            type: String
        },
        tags: {
            type: [String]
        },
        devyear: {
            type: Number
        },
        medialink: {
            type: String
        },
        videolink: {
            type: String
        },
        desc: {
            type: String
        }
    },
    { collection: "projects" }
);

module.exports = mongoose.model("projects", project);