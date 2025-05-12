import { NextRequest } from 'next/server';
import handler from './handler';

export async function GET(req: NextRequest) {
    return handler(req);
}

export async function POST(req: NextRequest) {
    return handler(req);
}
