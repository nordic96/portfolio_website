'use client';

import { CircularText } from '@/src/components/CircularText';
import { ARTISTS_TO_FETCH, useBookStore, useSpotifyStore } from '@/src/store';
import { cn } from '@/src/utils';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import CircleItem from './CircleItem';

export default function Page() {
  const [artistText, setArtistText] = useState('');
  const [bookText, setBookText] = useState('');
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

  useEffect(() => {
    const constructedText = artists
      .map((x, i) => `#${i + 1}.${x.name}`)
      .join(' ');
    setArtistText(constructedText);
  }, [artists]);

  useEffect(() => {
    const constructedText = books.map((x) => x.authors[0].name).join(', ');
    setBookText(constructedText);
  }, [books]);

  const positionCentreStyle =
    'absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]';

  return (
    <div
      className={
        'h-[70dvh] relative flex grow w-full max-w-360 m-auto overflow-hidden'
      }
    >
      {/** Left Outer Circle Container */}
      <div className={'absolute left-[20%] bottom-[20%]'}>
        {/** Books Outer Circle Container */}
        <div
          className={cn(
            positionCentreStyle,
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
                <CircleItem
                  key={book.key}
                  id={book.key}
                  src={book.cover?.medium}
                  text={book.title}
                />
              );
            })}
        </div>
        <div className={cn(positionCentreStyle)}>
          <CircularText
            text={bookText}
            options={{ width: 650, height: 650, fontSize: 48 }}
          />
        </div>
      </div>
      {/** Artist Outer Circle */}
      <div className={'absolute right-0'}>
        {/** Text Inner Circle */}
        <div className={cn(positionCentreStyle)}>
          <CircularText
            text={artistText}
            options={{
              width: 900,
              height: 900,
              fontSize: 40,
            }}
          />
        </div>
        {/** Spotify Top Artists Inner Circle */}
        <div
          className={cn(
            'animate-spin [animation-duration:50s]',
            'circle-container artist-circle',
            positionCentreStyle,
          )}
        >
          {new Array(ARTISTS_TO_FETCH).fill(1).map((d, i) => {
            if (!artists[i]) {
              return null;
            }
            const x = artists[i];
            return (
              <CircleItem
                key={x.id}
                id={x.id}
                src={x.images[2].url}
                loading={loading}
                text={`#${i + 1}.${x.name}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
