import { ApolloServer } from '@apollo/server';
import { merge } from 'lodash';

import { typeDef as projectType } from '../../../models/project/schema';
import { typeDef as certificateType } from '../../../models/cetificate/schema';

import { resolver as projectResolver } from '../../../models/project/resolver';
import { resolver as certificateResolver } from '../../../models/cetificate/resolver';

import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest, NextResponse } from 'next/server';
import rateLimiter from '../../../utils/rateLimiter';

const typeDefs = [certificateType, projectType];
const resolvers = merge(certificateResolver, projectResolver);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
});

export function applyRateLimit(req: NextRequest, res: NextResponse) {
    return new Promise<void>((resolve, reject) => {
        const mockRes: any = {
            statusCode: 200,
            setHeader: (name: string, value: string) => {
                res.headers.set(name, value);
            },
            status: (code: number) => {
                mockRes.statusCode = code;
                return mockRes;
            },
            send: (message: string) => {
                res = new NextResponse(message, { status: mockRes.statusCode });
                reject(res); // Reject to stop further processing if rate-limited
            },
            json: (data: any) => {
                res = NextResponse.json(data, { status: mockRes.statusCode });
                reject(res); // Reject to stop further processing if rate-limited
            },
            end: () => {
                resolve();
            },
        };
        rateLimiter(req as any, mockRes, (err?: any) => {
            if (err) {
                if (mockRes.statusCode === 429) {
                    res = new NextResponse(
                        mockRes.message || 'Too many Requests',
                        {
                            status: 429,
                            headers: mockRes.headers,
                        }
                    );
                } else {
                    res = new NextResponse('Internal Server Error', {
                        status: 500,
                    });
                }
                reject(res);
            } else {
                resolve();
            }
        });
    });
}

const handler = startServerAndCreateNextHandler<NextRequest>(server, {});
export default handler;
