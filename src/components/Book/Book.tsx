import { glassCardBaseStyle } from '@/src/styles';
import { BookData } from '@/src/types/book';
import { cn } from '@/src/utils';
import { useState } from 'react';

export default function Book({ book }: { book: BookData }) {
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
