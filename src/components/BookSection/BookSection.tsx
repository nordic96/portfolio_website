import { useEffect, useState } from 'react';
import Book from '../Book/Book';
import { Skeleton } from '@mui/material';
import { useSimpleIcons } from '@/src/hooks';
import { BookApiResponse, BookData } from '@/src/types/book';

import { useTranslations } from 'next-intl';
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
