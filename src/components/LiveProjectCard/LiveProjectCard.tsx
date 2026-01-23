'use client';

import { SimpleIcon } from 'simple-icons';

import { glassCardBaseStyle, hoverLiftStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { useSimpleIcons } from '@/src/hooks';
import IPhoneProFrame from '@/src/components/IPhoneProFrame';
import LiveProjectIframe from '@/src/components/LiveProjectIframe';
import { useTranslations } from 'next-intl';

export interface LiveProject {
  id: string;
  title: string;
  url: string;
  fallbackUrl?: string;
  techStack: SimpleIcon[];
}

interface LiveProjectCardProps {
  project: LiveProject;
  className?: string;
}

/**
 * LiveProjectCard - Complete card with iPhone frame, live iframe, and project info
 *
 * Structure (from issue spec):
 * - iPhone Pro Frame (Layer 1)
 * - Live iframe content (Layer 2)
 * - Subtle gradient overlay (Layer 3)
 * - External info section below phone (Title, Tech logos, Description)
 */
export default function LiveProjectCard({
  project,
  className,
}: LiveProjectCardProps) {
  const { id, title, url, fallbackUrl, techStack } = project;
  const t = useTranslations('Projects');
  const { IconContainer } = useSimpleIcons({
    icons: techStack,
  });

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* iPhone Frame with iframe content - responsive max-width */}
      {/* Mobile: full width, Tablet: 180px, Desktop: 240px */}
      <div className="w-full md:max-w-40 lg:max-w-60">
        <IPhoneProFrame>
          {/* Live iframe (Layer 2) - uses static fallback image on mobile */}
          <LiveProjectIframe
            url={url}
            title={title}
            fallbackUrl={fallbackUrl}
          />

          {/* Dark gradient overlay (Layer 3) - darker at bottom for text readability */}
          <div
            className={cn('absolute inset-0 z-10 pointer-events-none')}
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.7) 100%)',
            }}
          />
        </IPhoneProFrame>
      </div>

      {/* External Info Section - Overlapping bottom of phone frame */}
      <a href={url} target={'_blank'} className="relative z-20 w-full">
        <div
          className={cn(
            'text-center w-full md:max-w-55 lg:max-w-60 mx-auto',
            // Responsive overlap: smaller on mobile
            '-mt-16 md:-mt-18 lg:-mt-20',
            hoverLiftStyle,
          )}
        >
          {/* Project Title */}
          <h3 className="text-h3 font-bold text-text-white">{title}</h3>
          <div
            className={cn(
              glassCardBaseStyle,
              'flex flex-col',
              // Enhanced blur for overlap effect
              'backdrop-blur-lg',
              // Responsive padding: smaller on mobile
              'p-2 md:p-2.5 lg:p-3',
            )}
          >
            {/* Tech Stack Icons Row */}
            <IconContainer className="flex justify-center items-center gap-1 mt-1 md:mt-2" />
            {/* Description */}
            <p className="text-secondary text-text-white mt-1.5 md:mt-2">
              {t(`${id}.desc`)}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
