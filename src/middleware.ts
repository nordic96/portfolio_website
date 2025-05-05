import { NextRequest, NextResponse } from 'next/server';
import logger from './logger';

export async function middleware(request: NextRequest) {
    logger.info(request.url);
    const response = NextResponse.next();
    const responseClone = response.clone();
    let data;
    try {
        data = await responseClone.json();
    } catch (error) {
        logger.error(`[ERR RETRIEVING JSON BODY FROM NEXT RESPONSE] ${error}`);
        data = responseClone.text();
    }
    logger.info(`[RESPONSE CODE: ${response.status} ${request.url}] ${data}`);
    return response;
}

export const config = {
    matcher: '/api/:path*',
};
