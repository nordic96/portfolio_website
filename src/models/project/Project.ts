import Joi from 'joi';
import mongoose, { Document, Schema, Types, Model } from 'mongoose';

export interface ProjectDTO {
    projecttype: string;
    name: string;
    devyear: number;
    videolink: string;
    projectlink: string;
    medialink: string;
    tags: string[];
    desc: string;
}

export interface IProject extends ProjectDTO, Document {
    _id: Types.ObjectId;
}

const ProjectSchema: Schema<IProject> = new Schema(
    {
        projecttype: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        devyear: {
            type: Number,
            required: true,
        },
        videolink: {
            type: String,
            trim: true,
        },
        projectlink: {
            type: String,
            trim: true,
        },
        medialink: {
            type: String,
            trim: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        desc: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        collection: 'projects',
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        toObject: {
            virtuals: true,
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

ProjectSchema.virtual('id').get(function (this: IProject) {
    return this._id.toHexString();
});

const Project: Model<IProject> =
    mongoose.models.Project ||
    mongoose.model<IProject>('Project', ProjectSchema);

export const JoiProjectSchema = Joi.object({
    _id: Joi.object().allow(),
    projecttype: Joi.string(),
    name: Joi.string(),
    devyear: Joi.number(),
    videolink: Joi.string().allow(''),
    projectlink: Joi.string().allow(''),
    medialink: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    desc: Joi.string(),
});

export default Project;
