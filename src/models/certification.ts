import Joi from 'joi';

export interface ICertificate {
    name: string;
    credentials_url: string;
    year_obtained: string;
    theme_color: string;
    logo_src: string;
}

export const CertificationSchema = Joi.object({
    _id: Joi.object().allow(),
    name: Joi.string().required(),
    credentials_url: Joi.string().required(),
    year_obtained: Joi.string().required(),
    theme_color: Joi.string().optional(),
    logo_src: Joi.string().optional(),
});
