import pino, { LoggerOptions, WriteFn } from 'pino';

const writeFunction: WriteFn = (obj) => {
    try {
        console.log(JSON.stringify(obj));
    } catch (err) {
        if (err instanceof Error) {
            // Without a `replacer` argument, stringify on Error results in `{}`
            console.log(JSON.stringify(err, ['name', 'message', 'stack']));
        } else {
            console.log(JSON.stringify({ message: 'Unknown error type' }));
        }
    }
};

export const loggerOptions: LoggerOptions = {
    browser: {
        write: writeFunction,
    },
};

const logger = pino(loggerOptions);
export default logger;
