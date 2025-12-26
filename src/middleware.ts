import { NextRequest, NextResponse } from 'next/server';
import logger from './logger';
import CorsHeaders from './constants/CorsHeaders';

const ALLOWED_ORIGINS: string[] = process.env.BASE_URL
    ? [process.env.BASE_URL]
    : [];

function isSameOrValidOrigin(headers: Headers): boolean {
    if (headers.get('sec-fetch-site') === 'same-origin') {
        return true;
    }
    const origin = headers.get('origin');
    if (!origin) {
        return false;
    }
    // Use exact match instead of includes() to prevent substring attacks
    // e.g., "evil.com" contains "example.com" would fail with includes()
    return ALLOWED_ORIGINS.some((allowedOrigin) => allowedOrigin === origin);
}

const ENV = process.env.NODE_ENV;
export async function middleware(request: NextRequest) {
    const origin = request.headers.get('origin') || '';

    // Handle OPTIONS preflight requests
    if (request.method === 'OPTIONS') {
        if (!isSameOrValidOrigin(request.headers)) {
            return new NextResponse('Forbidden origin', { status: 403 });
        }
        const response = new NextResponse(null, { status: 204 });
        setCorsHeaders(response, origin);
        return response;
    }

    logger.info(`[ENV:${ENV}] [MIDDLEWARE] origin:${origin} => ${request.url}`);

    if (!isSameOrValidOrigin(request.headers)) {
        return new NextResponse('Forbidden origin', { status: 403 });
    }

    const response = NextResponse.next();
    setCorsHeaders(response, origin);
    return response;
}

function setCorsHeaders(res: NextResponse, origin: string): void {
    // Set the origin to the request origin if it's validated, or BASE_URL as fallback
    const allowedOrigin = origin || process.env.BASE_URL || '';
    res.headers.set(CorsHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, allowedOrigin);
    res.headers.set(
        CorsHeaders.ACCESS_CONTROL_ALLOW_METHODS,
        'GET, POST, OPTIONS'
    );
    res.headers.set(
        CorsHeaders.ACCESS_CONTROL_ALLOW_HEADERS,
        'Content-Type, Authorization'
    );
    res.headers.set(CorsHeaders.ACCESS_CONTROL_MAX_AGE, '86400'); // 24 hours
}

export const config = {
    matcher: '/api/:path*',
};
