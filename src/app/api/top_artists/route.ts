import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_COOKIE,
} from '@/src/config';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

type SpotifyTokenResponse = {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
};

async function generateAccessToken(): Promise<SpotifyTokenResponse> {
  try {
    if (SPOTIFY_CLIENT_ID === '' || SPOTIFY_CLIENT_SECRET === '') {
      throw new Error('Error retrieving configs');
    }
    const data = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error(`${res.status}`);
    });
    return data;
  } catch (e) {
    throw e;
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SPOTIFY_COOKIE);
  let token = '';
  if (!cookie || !cookie.value || cookie.value === '') {
    //fire auth api to retrieve fresh new token
    try {
      const refreshToken = await generateAccessToken();
      cookieStore.set(SPOTIFY_COOKIE, refreshToken.access_token, {
        expires: new Date(Date.now() + refreshToken.expires_in),
      });
      token = refreshToken.access_token;
    } catch (e) {
      console.error(e);
      return NextResponse.error();
    }
  } else {
    token = cookie.value;
  }
  // TODO: Use Token to fire Top Artist API & return response
  return NextResponse.json({ token: token });
}
