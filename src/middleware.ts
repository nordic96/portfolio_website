import { NextRequest, NextResponse } from 'next/server';
import logger from './logger';
import CorsHeaders from './constants/CorsHeaders';

const ALLOWED_ORIGINS: string = process.env.BASE_URL || '';
function isSameOrValidOrigin(headers: Headers): boolean {
    if (headers.get('sec-fetch-site') === 'same-origin') {
        return true;
    }
    const origin = headers.get('origin');
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
        return false;
    }
    return true;
}

const ENV = process.env.NODE_ENV;
export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const responseClone = response.clone();

    const origin = request.headers.get('origin') || '';
    logger.info(`[ENV:${ENV}] [MIDDLEWARE] origin:${origin} => ${request.url}`);
    if (!isSameOrValidOrigin(request.headers)) {
        return new NextResponse('Forbidden origin', { status: 403 });
    }

    let data;
    try {
        data = await responseClone.json();
    } catch (error) {
        logger.error(`[ERR RETRIEVING JSON BODY FROM NEXT RESPONSE] ${error}`);
        data = responseClone.text();
    }
    logger.info(
        `[RESPONSE CODE: ${response.status} ${request.url}] ${JSON.stringify(
            data
        )}`
    );
    setCorsHeaders(response);
    return response;
}

function setCorsHeaders(res: NextResponse): void {
    const baseUrl = process.env.BASE_URL || '';
    res.headers.set(CorsHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, baseUrl);
    res.headers.set(
        CorsHeaders.ACCESS_CONTROL_ALLOW_METHODS,
        'GET, POST, OPTIONS'
    );
    res.headers.set(
        CorsHeaders.ACCESS_CONTROL_ALLOW_HEADERS,
        'Content-Type, Authorization'
    );
}

export const config = {
    matcher: '/api/:path*',
};
