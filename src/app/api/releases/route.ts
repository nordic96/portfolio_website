import { NextResponse } from 'next/server';
import logger from '../../../logger';

export async function GET() {
    try {
        const token = process.env.GITHUB_PAT;
        const path = process.env.GITHUB_API_PATH || '';
        if (path === '' || !token) {
            throw new Error('path or token empty');
        }
        const data = await fetch(path, {
            headers: {
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
        logger.info(data);
        return NextResponse.json({
            data: {
                releases: data,
            },
        });
    } catch (e) {
        logger.error(e);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500, statusText: 'Internal Server Error' }
        );
    }
}
