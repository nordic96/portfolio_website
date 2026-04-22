import { prepareRepoMetadata } from '@/src/lib/github';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const repo_name = (await params).slug;
  try {
    const data = await prepareRepoMetadata(repo_name);
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({
        error: e.message,
      });
    }
  }
  throw new ReferenceError();
}
