import { SPOTIFY_COOKIE } from '@/src/config';
import { generateAccessToken, getTopArtists } from '@/src/lib/spotify';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { testData } from './testData';

export async function GET() {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json(testData);
  }
  // TODO: Use Token to fire Top Artist API & return response
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(SPOTIFY_COOKIE);
    let token = '';
    if (cookie && cookie.value && cookie.value !== '') {
      token = cookie.value;
    } else {
      const tokenResponse = await generateAccessToken();
      const { access_token, expires_in } = tokenResponse;
      cookieStore.set(SPOTIFY_COOKIE, access_token, {
        expires: new Date(Date.now() + expires_in * 1000),
      });
      token = access_token;
    }

    const topArtistResponse = await getTopArtists(token);
    return NextResponse.json(topArtistResponse);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
