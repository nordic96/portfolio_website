import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const langSchema = new Schema({
    title: { type: String },
    title_desc: { type: String },
    intro_msg: { type: String },
    intro_note: { type: String },
    cca_msg: { type: String },
    intro_desc: { type: String },
    footer_desc_1: { type: String },
});

const pageSchema = new Schema({
    en: { type: langSchema },
});

const configSchema = new Schema(
    {
        GLOBAL: { type: pageSchema },
    },
    { collection: 'configs' }
);

export interface Config extends Document {
    GLOBAL: {
        en: {
            title: string;
            title_desc: string;
            intro_msg: string;
            intro_note: string;
            cca_msg: string;
            intro_desc: string;
            footer_desc_1: string;
        };
    };
}

const ConfigSchema =
    mongoose.models.configs || mongoose.model('configs', configSchema);
export default ConfigSchema;
