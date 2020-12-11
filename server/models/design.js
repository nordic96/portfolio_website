const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let design = new Schema(
    {
        name: {
            type: String
        },
        organisation: {
            type: String
        },
        year: {
            type: Number
        },
        medialink: {
            type: String
        },
        desc: {
            type: String
        }
    },
    { collection: "designs" }
);

module.exports = mongoose.model("designs", design);