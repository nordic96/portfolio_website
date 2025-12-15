import { NextRequest, NextResponse } from 'next/server';
import handler, { applyRateLimit } from './handler';
import logger from '../../../logger';

export async function GET(req: NextRequest) {
    try {
        let res = new NextResponse();
        await applyRateLimit(req, res);

        return handler(req);
    } catch (err) {
        logger.error(`Rate Limited ${err}`);
    }
}

export async function POST(req: NextRequest) {
    try {
        let res = new NextResponse();
        await applyRateLimit(req, res);

        return handler(req);
    } catch (err) {
        logger.error(`Rate Limited ${err}`);
    }
}
