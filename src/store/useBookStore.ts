import { create } from 'zustand';
import { BookApiResponse, BookData } from '../types/book';

type BookState = {
  loading: boolean;
  error: Error | null;
  books: BookData[];
  readingBooks: BookData[];
};

type BookAction = {
  fetchBooks: () => Promise<void>;
};

type BookStore = BookState & BookAction;
let controller: AbortController | null = null;
export const useBookStore = create<BookStore>()((set) => ({
  loading: false,
  error: null,
  books: [],
  readingBooks: [],
  fetchBooks: async () => {
    try {
      if (controller !== null) {
        controller.abort();
      }
      set(() => ({ loading: true }));
      controller = new AbortController();
      const res = await fetch('/api/books', { signal: controller.signal });
      if (res.ok) {
        const data = (await res.json()).data as BookApiResponse;
        if (Array.isArray(data.completed_books)) {
          set(() => ({ books: data.completed_books }));
        }
        if (Array.isArray(data.reading_books)) {
          set(() => ({ readingBooks: data.reading_books }));
        }
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
