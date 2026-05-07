'use client';

import { CircularText } from '@/src/components/CircularText';
import { ARTISTS_TO_FETCH, useBookStore, useSpotifyStore } from '@/src/store';
import { cn } from '@/src/utils';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import CircleItem from './CircleItem';
import TopTracksSection from '@/src/components/TopTracksSection/TopTracksSection';
import PrimaryButton from '@/src/components/shared/PrimaryButton';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useBreakpoint } from '@/src/hooks';
import {
  BOOK_CIRCLE_MOBILE_STYLE,
  BOOK_CIRCLE_STYLE,
  CircularTextOptions,
  DESKTOP_CIRCLE_STYLE,
  MOBILE_CIRCLE_STYLE,
} from '@/src/components/CircularText/CircularText';

export default function Page() {
  const isMobile = useBreakpoint() === 'mobile';
  const locale = useLocale();
  const t = useTranslations('SandBoxPage');
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
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    fetchArtists();
  }, [locale, fetchArtists]);

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

  const getArtistCircleStyleByBreakpoint = (): CircularTextOptions => {
    if (isMobile) return MOBILE_CIRCLE_STYLE;
    return DESKTOP_CIRCLE_STYLE;
  };

  const getBookCircleStyleByBreakpoint = (): CircularTextOptions => {
    if (isMobile) return BOOK_CIRCLE_MOBILE_STYLE;
    return BOOK_CIRCLE_STYLE;
  };

  const positionCentreStyle =
    'absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]';

  return (
    <div
      className={
        'h-screen relative flex grow w-full max-w-360 m-auto overflow-hidden justify-center'
      }
    >
      {/** Left Outer Circle Container */}
      <div className={'z-0 absolute left-[5%] top-125'}>
        {/** Books Outer Circle Container */}
        <div
          className={cn(
            positionCentreStyle,
            'animate-spin [animation-duration:50s]',
            isMobile ? 'book-circle-mobile' : 'book-circle',
            'circle-container',
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
            options={getBookCircleStyleByBreakpoint()}
          />
        </div>
      </div>
      {/** Right Artist Outer Circle */}
      <div className={'absolute right-[-10%] top-[40%] translate-y-[-40%]'}>
        {/** Text Inner Circle */}
        <div className={cn(positionCentreStyle)}>
          <CircularText
            text={artistText}
            options={getArtistCircleStyleByBreakpoint()}
          />
        </div>
        {/** Spotify Top Artists Inner Circle */}
        <div
          className={cn(
            'animate-spin [animation-duration:50s]',
            'circle-container',
            isMobile ? 'artist-circle-mobile' : 'artist-circle',
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
      {/** Back To Home Page Btn Container */}
      <div
        className={cn(
          'absolute top-0 left-0 w-full z-20',
          'px-4 md:px-6 lg:px-8',
        )}
      >
        <div className={'max-w-200'}>
          <h2 className={'text-3xl font-semibold'}>SANDBOX PAGE</h2>
          <p>{t('header')}</p>
        </div>
        <div className={'mt-4'}>
          <Link href={'/'}>
            <PrimaryButton>
              <ArrowBack />
              {t('btn_back_to_homepage')}
            </PrimaryButton>
          </Link>
        </div>
        <div className={'flex justify-center items-center'}>
          <TopTracksSection />
        </div>
      </div>
    </div>
  );
}
