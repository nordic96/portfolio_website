import Joi from 'joi';

export interface IProject {
    projecttype: string;
    name: string;
    devyear: number;
    videolink: string;
    projectlink: string;
    medialink: string;
    tags: string[];
    desc: string;
}

export const ProjectSchema = Joi.object({
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
