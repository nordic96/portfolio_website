import { NextRequest, NextResponse } from 'next/server';
import logger from '../logger';

export function middleware(request: NextRequest) {
    logger.info(request.url);
    const response = NextResponse.next();
    logger.info(`[Response from ${request.url}] ${response.json()}`);
    return response;
}
