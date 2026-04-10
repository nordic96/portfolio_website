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
