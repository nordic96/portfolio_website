'use client';

import { ARTISTS_TO_FETCH, useBookStore, useSpotifyStore } from '@/src/store';
import { glassCardBaseStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { Skeleton } from '@mui/material';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Page() {
  const { artists, loading, fetchArtists } = useSpotifyStore();
  const {
    books,
    loading: loadingBooks,
    readingBooks,
    fetchBooks,
  } = useBookStore();

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div
      className={
        'h-[70dvh] relative flex grow w-full max-w-360 m-auto overflow-hidden'
      }
    >
      <div
        className={cn(
          'absolute bottom-[40%] translate-y-[70%] left-[15%] translate-x-[-50%]',
          'animate-spin [animation-duration:50s]',
          'circle-container book-circle',
        )}
      >
        {loadingBooks &&
          new Array(6).fill(1).map((x, i) => {
            return (
              <div
                key={`book-loading-${i}`}
                className={'flex flex-col items-center'}
              >
                <Skeleton variant={'circular'} width={160} height={160} />
                <Skeleton variant={'text'} width={120} />
              </div>
            );
          })}
        {!loadingBooks &&
          books.concat(readingBooks).map((book) => {
            return (
              <div key={book.key} className={'flex flex-col items-center'}>
                {book.cover && (
                  <Image
                    alt={`book-${book.key}`}
                    src={book.cover.medium || ''}
                    loading={'eager'}
                    className={
                      'w-40 h-40 max-sm:w-30 max-sm:h-30 rounded-full object-cover'
                    }
                    width={100}
                    height={100}
                  />
                )}
                <span
                  className={cn(
                    glassCardBaseStyle,
                    'whitespace-pre-line text-center max-w-45',
                  )}
                >{`${book.title}\n${book.authors[0].name.trim()}`}</span>
              </div>
            );
          })}
      </div>

      <div
        className={cn(
          'absolute top-[30%] translate-y-[-60%] max-sm:top-[10%] right-[15%] translate-x-[85%]',
          'animate-spin [animation-duration:50s]',
          'circle-container artist-circle',
        )}
      >
        {new Array(ARTISTS_TO_FETCH).fill(1).map((d, i) => {
          if (!artists[i]) {
            return null;
          }
          const x = artists[i];
          return (
            <div key={x.id} className={'flex relative flex-col items-center'}>
              {loading && (
                <Skeleton variant={'circular'} width={100} height={100} />
              )}
              {!loading && (
                <Image
                  alt={`artists-img-${x.id}`}
                  src={x.images[0].url}
                  width={100}
                  height={100}
                  className={
                    'w-35 h-35 max-sm:w-30 max-sm:h-30 rounded-full object-cover'
                  }
                />
              )}
              <span className={cn(glassCardBaseStyle)}>{x.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
