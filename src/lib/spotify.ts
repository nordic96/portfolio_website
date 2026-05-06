import {
  SPOTIFY_API_BASE_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
  SPOTIFY_TIME_RANGE,
} from '../config';
import {
  SpotifyTokenResponse,
  TopArtistResponse,
  TopTracksResponse,
} from '../types';

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

/**
 * prepares Spotify API Base URL with suffix and searchParams with limit & locale
 * @param suffix '/me/top/{artists|tracks}
 * @param limit default 5
 * @param locale locale string 'SG_EN' 'KO_KR'
 * @returns appended API URL instance
 */
function prepareSpotifyApiUrl(suffix: string, limit = 5, locale?: string): URL {
  const spotifyApiBaseUrl = SPOTIFY_API_BASE_URL;
  const url = new URL(suffix, spotifyApiBaseUrl);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('time_range', SPOTIFY_TIME_RANGE);
  if (locale) {
    url.searchParams.append('locale', locale);
  }
  return url;
}

export async function getTopTracks(
  token: string,
  limit = 5,
  locale?: string,
): Promise<TopTracksResponse> {
  const url = prepareSpotifyApiUrl('v1/me/top/tracks', limit, locale);
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

export async function getTopArtists(
  token: string,
  limit = 5,
  locale?: string,
): Promise<TopArtistResponse> {
  const url = prepareSpotifyApiUrl('v1/me/top/artists', limit, locale);
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
