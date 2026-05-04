import { create } from 'zustand';
import { Artist, TopArtistResponse, TopTracksResponse, Track } from '../types';

export const ARTISTS_TO_FETCH = 20;
export const TRACKS_TO_FETCH = 8;

type State = {
  loading: boolean;
  artists: Artist[];
  tracks: Track[];
  error: Error | null;
};

type Actions = {
  fetchArtists: () => Promise<void>;
  fetchTracks: () => Promise<void>;
};

let controller: AbortController | null = null;
let trackRequestController: AbortController | null = null;
type SpotifyState = State & Actions;
export const useSpotifyStore = create<SpotifyState>()((set) => ({
  loading: false,
  artists: [],
  tracks: [],
  error: null,
  fetchArtists: async () => {
    try {
      if (controller !== null) {
        controller.abort();
      }
      set(() => ({ loading: true, error: null }));
      controller = new AbortController();
      const res = await fetch('/api/top_artists', {
        signal: controller.signal,
      });

      if (res.status !== 200) {
        throw new Error(`${res.status}`);
      }
      const data = (await res.json()) as TopArtistResponse;
      if (data.items.length > 0) {
        set(() => ({ artists: data.items }));
      }
    } catch (e) {
      if (e instanceof Error) {
        set(() => ({ error: e }));
      }
    } finally {
      controller = null;
      set(() => ({ loading: false }));
    }
  },
  fetchTracks: async () => {
    try {
      if (trackRequestController !== null) {
        trackRequestController.abort();
      }
      trackRequestController = new AbortController();
      const res = await fetch('/api/v1/spotify/top-tracks', {
        signal: trackRequestController.signal,
      });
      if (res.status !== 200) {
        throw new Error(`${res.status}`);
      }
      const data = (await res.json()) as TopTracksResponse;
      if (data.items.length > 0) {
        set(() => ({ tracks: data.items }));
      }
    } catch (e) {
      if (e instanceof Error) {
        set(() => ({ error: e }));
      }
    } finally {
      controller = null;
      set(() => ({ loading: false }));
    }
  },
}));
