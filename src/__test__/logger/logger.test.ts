/**
 * @jest-environment node
 */
import pino from 'pino';
import loggerOptions from '../../logger/logger';
import pinoTest from 'pino-test';

function is(received: any, expected: any, msg: any) {
    if (received.msg !== expected.msg) {
        throw new Error(
            `expected msg ${expected.msg} doesn't match the received one ${received.msg}`
        );
    }
}

const sink = pinoTest.sink();
const logger = pino(loggerOptions, sink);
describe('logger', () => {
    it('should successfully log', async () => {
        logger.info('test');
        await pinoTest.once(sink, { level: 30, msg: 'test' }, is);
    });
});
