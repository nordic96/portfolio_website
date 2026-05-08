export interface ImageObject {
  url: string;
  height: number;
  width: number;
}

export interface Artist {
  id: string;
  name: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  images: ImageObject[];
}

export interface TopArtistResponse {
  offset: number;
  previous: string;
  total: number;
  items: Artist[];
}

export type SpotifyTokenResponse = {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
};

export interface Album {
  album_type: string;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_prevision: string;
  type: string;
  uri: string;
  artists: Artist[];
  is_playable: boolean;
}

export interface Track {
  album: Album;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  name: string;
  popularity: number;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface TopTracksResponse {
  href: string;
  next: string;
  limit: number;
  offset: number;
  previous: string;
  total: number;
  items: Track[];
}
