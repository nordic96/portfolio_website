import { create } from 'zustand';
import { Artist, TopArtistResponse } from '../types';

export const ARTISTS_TO_FETCH = 20;

type State = {
  loading: boolean;
  artists: Artist[];
  error: Error | null;
};

type Actions = {
  fetchArtists: () => Promise<void>;
};

let controller: AbortController | null = null;
type SpotifyState = State & Actions;
export const useSpotifyStore = create<SpotifyState>()((set, get) => ({
  loading: false,
  artists: [],
  error: null,
  fetchArtists: async () => {
    try {
      if (controller !== null) {
        controller.abort();
      }
      if (get().artists.length > 0) {
        return;
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
}));
