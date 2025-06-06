import mongoose, { Schema, Types, Model, Document } from 'mongoose';
export type Proficiency = 'beginner' | 'intermediate' | 'advanced';

interface Source {
    imgSrc: string;
    pageUrl: string;
    className: string;
}

export interface SkillDTO {
    name: string;
    source: Source;
    category: string;
    proficiency: Proficiency;
}

export interface ISkill extends SkillDTO, Document {
    _id: Types.ObjectId;
}

const SkillSchema: Schema<ISkill> = new Schema(
    {
        name: {
            type: String,
            required: true,
            tim: true,
        },
        source: {
            imgSrc: {
                type: String,
                required: true,
                trim: true,
            },
            pageUrl: {
                type: String,
                required: true,
                trim: true,
            },
            className: {
                type: String,
                required: true,
                trim: true,
            },
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        proficiency: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        collection: 'skills',
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

SkillSchema.virtual('id').get(function (this: ISkill) {
    return this._id.toHexString();
});

const Skill: Model<ISkill> =
    mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;
