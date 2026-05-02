'use client';

import { glassCardBaseStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { Skeleton } from '@mui/material';
import Image from 'next/image';

export default function CircleItem({
  id,
  src,
  text,
  loading = false,
}: {
  id: string;
  src?: string;
  text?: string;
  loading?: boolean;
}) {
  return (
    <div className={'flex flex-col items-center'}>
      {loading && <Skeleton variant={'circular'} width={100} height={100} />}
      {src && !loading && (
        <Image
          alt={`circle-item-${id}`}
          src={src || ''}
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
          'absolute bottom-[-20]',
        )}
      >
        {text}
      </span>
    </div>
  );
}
