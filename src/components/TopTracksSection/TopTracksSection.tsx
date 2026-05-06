'use client';

import { useStaggeredAnimation } from '@/src/hooks';
import { ARTISTS_TO_FETCH, useSpotifyStore } from '@/src/store';
import { useEffect } from 'react';
import Image from 'next/image';
import { glassCardBaseStyle, hoverLiftStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { Track } from '@/src/types';

function TrackCard({ track, rank }: { track: Track; rank: number }) {
  const { name, album } = track;
  return (
    <div
      className={cn(
        glassCardBaseStyle,
        'flex gap-2 items-center',
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
  const { tracks, fetchTracks } = useSpotifyStore();
  const { containerRef, getItemClassName } =
    useStaggeredAnimation<HTMLDivElement>({
      itemCount: ARTISTS_TO_FETCH,
      staggerDelay: 500,
    });

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  return (
    <div ref={containerRef} className={'flex flex-col gap-4'}>
      {tracks.map((track, i) => (
        <div key={track.id} className={getItemClassName(i)}>
          <TrackCard rank={i + 1} track={track} />
        </div>
      ))}
    </div>
  );
}
