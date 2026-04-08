import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} from '../config';
import { SpotifyTokenResponse, TopArtistResponse } from '../types';

const TOKEN_URL = 'https://accounts.spotify.com/api/token';

export async function generateAccessToken(): Promise<SpotifyTokenResponse> {
  if (
    SPOTIFY_REFRESH_TOKEN === '' ||
    SPOTIFY_CLIENT_ID === '' ||
    SPOTIFY_CLIENT_SECRET === ''
  ) {
    throw new Error('Error retrieving env vars');
  }
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });
  if (res.status === 200 && res.ok) {
    const data = (await res.json()) as SpotifyTokenResponse;
    return data;
  }
  throw new Error('Failed to refresh token');
}

export async function getTopArtists(token: string): Promise<TopArtistResponse> {
  const url = new URL('https://api.spotify.com/v1/me/top/artists');
  url.searchParams.append('limit', '5');
  const res = await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    next: { revalidate: 3600 },
  });
  if (res.status === 401) {
    throw new Error('Unauthorized Error');
  } else if (res.status === 403) {
    throw new Error('Bad OAuth Request');
  } else if (res.status === 429) {
    throw new Error('Exceeded Rate Limits');
  } else if (!res.ok) {
    throw new Error('Failed to fetch top artist data');
  }
  return res.json();
}
