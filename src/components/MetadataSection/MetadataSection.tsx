import { useSimpleIcons, useStaggeredAnimation } from '@/src/hooks';
import { Artist, TopArtistResponse } from '@/src/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { siSpotify } from 'simple-icons';

interface ArtistBubbleProps {
  artist: Artist;
}
function ArtistBubble({ artist }: ArtistBubbleProps) {
  const { name, images } = artist;
  const img = images[0];
  return (
    <div className={'flex flex-col items-center gap-1'}>
      {img && (
        <div
          className={
            'overflow-hidden rounded-full transition-transform duration-300 hover:scale-120'
          }
        >
          <Image
            src={img.url}
            alt={`spotify-artist-a${name}-profile-image`}
            height={56}
            width={56}
          />
        </div>
      )}
      <p className={'max-w-16 text-center'}>{name}</p>
    </div>
  );
}

export default function MetadataSection() {
  const [error, setError] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const t = useTranslations('MetadataSection');
  // Staggered animation for project cards
  const { containerRef, getItemClassName } =
    useStaggeredAnimation<HTMLDivElement>({
      itemCount: 5,
      staggerDelay: 500,
    });

  const { IconContainer: SpotifyIcon } = useSimpleIcons({
    icons: [siSpotify],
    className: {
      'lg:w-7 lg:h-7': true,
    },
  });

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch('/api/top_artists');
        if (res.status !== 200) {
          throw new Error(`${res.status}`);
        }
        const data = (await res.json()) as TopArtistResponse;
        if (data.items.length > 0) {
          setArtists(data.items);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(true);
        }
      }
    };
    fetchArtists();

    return () => {
      setError(false);
    };
  }, []);

  if (error) {
    return null;
  }
  return (
    <div>
      <div className={'flex gap-1 items-center'}></div>
      <div className={'flex gap-2 items-center'}>
        <SpotifyIcon />
        <p>{t('spotify_top_artists')}</p>
      </div>
      <div
        ref={containerRef}
        className={'flex flex-wrap gap-4 max-sm:gap-2 mt-4'}
      >
        {artists.map((a, index) => {
          return (
            <div className={getItemClassName(index)} key={a.id}>
              <ArtistBubble artist={a} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
