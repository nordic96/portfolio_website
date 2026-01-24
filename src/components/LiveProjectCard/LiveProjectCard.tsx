'use client';

import { SimpleIcon, siGithub } from 'simple-icons';

import { glassCardBaseStyle, hoverLiftStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { useImagePing } from '@/src/hooks';
import WebHealthIndicator from '@/src/components/WebHealthIndicator';
import PrimaryButton from '@/src/components/shared/PrimaryButton';
import { Language } from '@mui/icons-material';
import { useSimpleIcons } from '@/src/hooks';
import IPhoneProFrame from '@/src/components/IPhoneProFrame';
import LiveProjectIframe from '@/src/components/LiveProjectIframe';
import { useTranslations } from 'next-intl';

export interface LiveProject {
  id: string;
  title: string;
  fallbackUrl?: string;
  techStack: SimpleIcon[];
  /** URL for the website (used for "Visit Website" button and iframe preview) */
  websiteUrl: string;
  /** Optional GitHub repository URL */
  githubUrl?: string;
  /** Whether to show health check status indicator (default: true) */
  healthCheckEnabled?: boolean;
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
 * - Health status indicator in metadata container
 * - Dual CTA buttons (Visit Website, View on GitHub)
 */
export default function LiveProjectCard({
  project,
  className,
}: LiveProjectCardProps) {
  const {
    id,
    title,
    techStack,
    websiteUrl,
    githubUrl,
    fallbackUrl,
    healthCheckEnabled = true,
  } = project;

  // Client-side health check via image ping (no SSRF risk)
  const { status, isLoading } = useImagePing(websiteUrl, healthCheckEnabled);
  const cardT = useTranslations('ProjectCard');
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
            url={websiteUrl}
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
      <div className="relative z-20">
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
            <p className="text-secondary text-text-white mt-2">
              {t(`${id}.desc`)}
            </p>

            {/* Health Status Indicator */}
            {healthCheckEnabled && (
              <div className="flex justify-center mt-3">
                <WebHealthIndicator status={status} isLoading={isLoading} />
              </div>
            )}

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
              <PrimaryButton
                as="link"
                href={websiteUrl}
                variant="secondary"
                size="small"
                aria-label={`Visit ${title} website`}
              >
                <Language fontSize={'small'} />
                {cardT('website')}
              </PrimaryButton>

              {githubUrl && (
                <PrimaryButton
                  as="link"
                  href={githubUrl}
                  variant="primary"
                  size="small"
                  icon={siGithub}
                  aria-label={`View ${title} on GitHub`}
                >
                  {cardT('github')}
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
