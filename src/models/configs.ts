import Joi from 'joi';

export const ConfigsSchema = Joi.object({
    _id: Joi.object().allow(),
    GLOBAL: Joi.object({
        en: Joi.object(),
    }),
});

export default ConfigsSchema;
