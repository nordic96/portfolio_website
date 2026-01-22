'use client';

import { SimpleIcon } from 'simple-icons';

import { glassCardBaseStyle, hoverLiftStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { useSimpleIcons } from '@/src/hooks';
import IPhoneProFrame from '@/src/components/IPhoneProFrame';
import LiveProjectIframe from '@/src/components/LiveProjectIframe';

export interface LiveProject {
  id: string;
  title: string;
  url: string;
  fallbackUrl?: string;
  description: string;
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
  const { title, url, fallbackUrl, description, techStack } = project;
  const { IconContainer } = useSimpleIcons({
    icons: techStack,
    size: { mobile: 'md', desktop: 'lg' },
  });

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* iPhone Frame with iframe content - full width on mobile, constrained on sm+ */}
      <div className="w-full sm:max-w-50 lg:max-w-60">
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
      <a href={url} target={'_blank'} className="relative z-20">
        <div
          className={cn(
            'text-center w-full sm:max-w-50 lg:max-w-60',
            // Pull up to overlap with phone frame bottom
            '-mt-20',
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
            )}
          >
            {/* Tech Stack Icons Row */}
            <IconContainer className="flex justify-center items-center gap-1 mt-2" />
            {/* Description */}
            <p className="text-secondary text-text-white mt-2">{description}</p>
          </div>
        </div>
      </a>
    </div>
  );
}
