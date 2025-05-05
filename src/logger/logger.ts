import pino from 'pino';

const logger = pino({
    browser: {
        write(obj) {
            try {
                console.log(JSON.stringify(obj));
            } catch (err) {
                if (err instanceof Error) {
                    // Without a `replacer` argument, stringify on Error results in `{}`
                    console.log(
                        JSON.stringify(err, ['name', 'message', 'stack'])
                    );
                } else {
                    console.log(
                        JSON.stringify({ message: 'Unknown error type' })
                    );
                }
            }
        },
    },
});

export default logger;
