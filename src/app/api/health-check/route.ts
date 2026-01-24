import { NextRequest, NextResponse } from 'next/server';

export type HealthStatus = 'live' | 'slow' | 'down' | 'unknown';

interface HealthCheckResponse {
  url: string;
  status: HealthStatus;
  responseTime?: number;
  checkedAt: string;
}

// Response time thresholds (ms)
const SLOW_THRESHOLD = 3000;
const TIMEOUT = 10000;

/**
 * Health Check API Route
 *
 * Checks if a website is live and responsive.
 * Returns status: live, slow, down, or unknown
 *
 * Usage: GET /api/health-check?url=https://example.com
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 },
    );
  }

  // Validate URL format
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
  }

  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    const response = await fetch(url, {
      method: 'HEAD', // Use HEAD for faster response
      signal: controller.signal,
      headers: {
        'User-Agent': 'PortfolioHealthCheck/1.0',
      },
    });

    clearTimeout(timeoutId);

    const responseTime = Date.now() - startTime;

    let status: HealthStatus;
    if (!response.ok) {
      status = 'down';
    } else if (responseTime > SLOW_THRESHOLD) {
      status = 'slow';
    } else {
      status = 'live';
    }

    const result: HealthCheckResponse = {
      url,
      status,
      responseTime,
      checkedAt: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    const responseTime = Date.now() - startTime;

    // Determine if it was a timeout or connection error
    const isTimeout = error instanceof Error && error.name === 'AbortError';

    const result: HealthCheckResponse = {
      url,
      status: isTimeout ? 'slow' : 'down',
      responseTime,
      checkedAt: new Date().toISOString(),
    };

    return NextResponse.json(result);
  }
}
