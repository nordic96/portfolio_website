'use client';

import { SimpleIcon } from 'simple-icons';

import { glassCardBaseStyle, hoverLiftStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { useSimpleIcons } from '@/src/hooks';
import { useTranslations } from 'next-intl';

export interface SmallProject {
  id: string;
  title: string;
  url: string;
  techStack: SimpleIcon[];
}

interface SmallProjectCardProps {
  project: SmallProject;
  className?: string;
}

/**
 * SmallProjectCard - Compact card for GitHub/smaller projects
 *
 * Structure (from design spec):
 * - Title (h3, Poppins bold italic, white)
 * - Pill-shaped glassmorphism metadata container
 *   - Mobile (<768px): Icons stacked above description (vertical layout)
 *   - Tablet/Desktop (>=768px): Icons LEFT, Description RIGHT (horizontal layout)
 *
 * Icon sizing (responsive):
 * - Mobile (<768px): 16px (sm) for compact display
 * - Tablet (768-1023px): 20px (md) for intermediate display
 * - Desktop (>=1024px): 24px (lg) for standard display
 */
export default function SmallProjectCard({
  project,
  className,
}: SmallProjectCardProps) {
  const { id, title, url, techStack } = project;
  const projectT = useTranslations('Projects');
  const { IconContainer } = useSimpleIcons({
    icons: techStack,
  });

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('flex flex-col max-sm:w-full', hoverLiftStyle, className)}
      aria-label={`View ${title} project on GitHub`}
    >
      {/* Project Title */}
      <h3 className={'text-h3 md:text-lg text-text-white'}>{title}</h3>

      {/* Pill-shaped Metadata Container */}
      {/* Mobile: vertical stack (icons above description) */}
      {/* Tablet/Desktop: horizontal layout (icons left, description right) */}
      <div
        className={cn(
          // Responsive layout: column on mobile, row on tablet+
          'flex flex-col md:flex-col md:items-start gap-2 md:gap-2.5 lg:gap-3',
          glassCardBaseStyle,
        )}
      >
        {/* Tech Stack Icons */}
        <IconContainer className="shrink-0" />

        {/* Description */}
        <p className="text-secondary text-text-white">
          {projectT(`${id}.desc`)}
        </p>
      </div>
    </a>
  );
}
