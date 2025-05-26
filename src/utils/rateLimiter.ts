import rateLimit from 'express-rate-limit';

const MAX_CALLS = 15;
const LIMIT_WINDOW = 15 * 60 * 1000; //15 minutes in ms

const rateLimiter = rateLimit({
    windowMs: LIMIT_WINDOW,
    max: MAX_CALLS,
    message: 'Too many requests, please try again later',
    standardHeaders: true,
    legacyHeaders: true,
});

export default rateLimiter;
