/**
 * @jest-environment node
 */
import Joi from 'joi';
import schemaUtils from '../../utils/schemaUtils';
import { Document, ObjectId, WithId } from 'mongodb';
import logger from '../../logger';

describe('schemaUtils', () => {
    interface Test {
        name: string;
    }
    const testSchema = Joi.object({
        _id: Joi.object().required(),
        name: Joi.string().required(),
    });
    it('validateSchemaAndPush - should validate and push data to array', () => {
        const ans: Test[] = [];
        const data: WithId<Document> = {
            _id: new ObjectId(),
            name: 'test_name',
        };
        schemaUtils.validateSchemaAndPush<Test>(testSchema, data, ans);
        expect(ans.length).toBe(1);
        expect(ans[0].name).toBe('test_name');
    });

    it('validateSchemaAndPush - should validate invalid data', () => {
        const ans: Test[] = [];
        const data: WithId<Document> = {
            _id: new ObjectId(),
        };
        schemaUtils.validateSchemaAndPush<Test>(testSchema, data, ans);
        expect(ans.length).toEqual(0);
    });
});
