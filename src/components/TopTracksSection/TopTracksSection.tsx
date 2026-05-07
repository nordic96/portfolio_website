'use client';

import { useStaggeredAnimation } from '@/src/hooks';
import { ARTISTS_TO_FETCH, useSpotifyStore } from '@/src/store';
import { useEffect } from 'react';
import Image from 'next/image';
import { glassCardBaseStyle, hoverLiftStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { Track } from '@/src/types';
import { Refresh } from '@mui/icons-material';
import { Skeleton } from '@mui/material';

function TrackCard({ track, rank }: { track: Track; rank: number }) {
  const { name, album } = track;
  return (
    <div
      className={cn(
        glassCardBaseStyle,
        'flex gap-2 items-center max-sm:p-2!',
        hoverLiftStyle,
      )}
    >
      <Image
        alt={album.id}
        src={album.images[0].url}
        width={60}
        height={60}
        className={'w-15 h-15 object-cover rounded-full'}
      />
      <div className={'flex flex-col gap-2'}>
        <span
          className={'text-lg font-semibold max-w-70'}
        >{`#${rank}. ${name}`}</span>
        <span>{album.artists[0].name}</span>
      </div>
    </div>
  );
}

export default function TopTracksSection() {
  const { tracks, fetchTracks, loadingTracks } = useSpotifyStore();
  const { containerRef, getItemClassName } =
    useStaggeredAnimation<HTMLDivElement>({
      itemCount: ARTISTS_TO_FETCH,
      staggerDelay: 500,
    });

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  return (
    <div>
      <div className={'flex gap-4 items-center'}>
        <h3 className={'text-2xl font-semibold'}>My Top #8 Tracks</h3>
        <button
          onClick={fetchTracks}
          disabled={loadingTracks}
          className={cn(
            loadingTracks ? 'animate-spin' : '',
            'p-0.5 rounded-full bg-[#1ED760]',
            'cursor-pointer',
            'disabled:bg-gray-400',
          )}
        >
          <Refresh fontSize={'medium'} sx={{ color: '#000' }} />
        </button>
      </div>
      <div ref={containerRef} className={'flex flex-col gap-4 mt-4'}>
        {loadingTracks &&
          new Array(5).fill(1).map((x, i) => {
            return (
              <div
                key={`track-loading-skeleton-${i}`}
                className={cn(glassCardBaseStyle, 'flex gap-2 items-center')}
              >
                <div className={'w-15 h-15'}>
                  <Skeleton width={50} height={50} variant={'circular'} />
                </div>
                <div className={'w-full'}>
                  <Skeleton variant={'text'} />
                  <Skeleton variant={'text'} />
                </div>
              </div>
            );
          })}
        {!loadingTracks &&
          tracks.map((track, i) => (
            <div key={track.id} className={getItemClassName(i)}>
              <TrackCard rank={i + 1} track={track} />
            </div>
          ))}
      </div>
    </div>
  );
}
