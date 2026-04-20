/* eslint-disable @next/next/no-img-element */
import { useSimpleIcons } from '@/src/hooks';
import { glassCardBaseStyle } from '@/src/styles';
import { BookApiResponse, BookData } from '@/src/types/book';
import { cn } from '@/src/utils';
import { Skeleton } from '@mui/material';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { siGitbook } from 'simple-icons';

function BookLoadingIndicator({ count = 1 }: { count?: number }) {
  return (
    <>
      {new Array(count).fill(1).map((x, i) => (
        <Skeleton
          key={`skeleton-${i}`}
          variant={'rounded'}
          width={120}
          height={180}
        />
      ))}
    </>
  );
}

function Book({ book }: { book: BookData }) {
  const { key, cover, title, authors, publish_date } = book;
  const [hovered, setHovered] = useState(false);

  if (!cover || !cover.medium) return null;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={
        'flex transition-transform ease-in-out hover:-translate-x-5 cursor-pointer'
      }
    >
      <img
        draggable={false}
        key={key}
        alt={`book-${key}`}
        src={cover.medium}
        className={'lg:h-45 max-sm:h-28'}
      />
      {hovered && (
        <div
          className={cn(
            'absolute bottom-0 left-20 w-40 z-999',
            'flex flex-col gap-4',
            glassCardBaseStyle,
          )}
        >
          <h4 className={'text-h4 font-bold md:text-lg text-text-white'}>
            {title}
          </h4>
          <p>{publish_date}</p>
          {authors && <span className={'italic'}>{authors[0].name}</span>}
        </div>
      )}
    </div>
  );
}

export default function BookSection() {
  const t = useTranslations('MetadataSection');
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(false);
  const [readingBooks, setReadingBooks] = useState<BookData[]>([]);
  const { IconContainer: GitBookIcon } = useSimpleIcons({
    icons: [siGitbook],
    className: {
      'lg:w-7 lg:h-7': true,
    },
  });

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/books');
        if (res.ok) {
          const data = (await res.json()).data as BookApiResponse;
          if (Array.isArray(data.completed_books)) {
            setBooks(data.completed_books || []);
          }
          if (Array.isArray(data.reading_books)) {
            setReadingBooks(data.reading_books || []);
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
    return () => {
      setError(false);
      setLoading(false);
    };
  }, []);

  if (error) {
    return null;
  }

  return (
    <div className={'flex grow justify-between max-sm:flex-col'}>
      <div className={'flex flex-col'}>
        <div className={'flex gap-2 items-center'}>
          <GitBookIcon />
          <p>{t('currently_reading')}</p>
        </div>
        <div className={'mt-4 flex flex-wrap gap-4 max-sm:gap-2'}>
          {loading && <BookLoadingIndicator />}
          {!loading &&
            readingBooks.map((book) => {
              return <Book key={book['key']} book={book} />;
            })}
        </div>
      </div>
      <div className={'flex flex-col'}>
        <div className={'flex gap-2 items-center'}>
          <GitBookIcon />
          <p>{t('completed_reading')}</p>
        </div>
        <div className={'mt-4 flex flex-wrap gap-2 max-sm:gap-2'}>
          {loading && <BookLoadingIndicator count={4} />}
          {!loading &&
            books.map((book) => {
              return <Book key={book['key']} book={book} />;
            })}
        </div>
      </div>
    </div>
  );
}
