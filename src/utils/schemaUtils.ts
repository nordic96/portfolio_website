import { ObjectSchema } from 'joi';
import logger from '../logger';
import { WithId, Document } from 'mongodb';

function validateSchemaAndPush<T>(
    schema: ObjectSchema,
    data: WithId<Document>,
    arr: T[]
): void {
    const { error, value } = schema.validate(data);
    if (error) {
        logger.error(error);
    } else {
        arr.push(value as T);
    }
}

const schemaUtils = { validateSchemaAndPush };
export default schemaUtils;
