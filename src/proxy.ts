// proxy.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((x) => x.trim())
  .filter(Boolean);

const intlMiddleware = createMiddleware(routing);

function corsMiddleware(req: NextRequest): NextResponse {
  const origin = req.headers.get('origin') ?? '';
  const isAllowed = ALLOWED_ORIGINS.includes(origin);

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': isAllowed ? origin : '',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const response = NextResponse.next();
  if (isAllowed) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  return response;
}

export default function middleware(req: NextRequest) {
  const isApiRoute = req.nextUrl.pathname.startsWith('/api');

  if (isApiRoute) {
    return corsMiddleware(req);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // API routes for CORS
    '/api/:path*',
    // next-intl original matcher (unchanged)
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
};
