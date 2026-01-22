'use client';

import { SimpleIcon } from 'simple-icons';

import { glassCardBaseStyle, hoverLiftStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { useSimpleIcons } from '@/src/hooks';

export interface SmallProject {
  id: string;
  title: string;
  url: string;
  description: string;
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
 *   - Mobile (<640px): Icons stacked above description (vertical layout)
 *   - Desktop (>=640px): Icons LEFT, Description RIGHT (horizontal layout)
 *
 * Icon sizing:
 * - Mobile: 20px (md) for better visibility in narrow containers
 * - Desktop: 24px (lg) for standard display
 */
export default function SmallProjectCard({
  project,
  className,
}: SmallProjectCardProps) {
  const { title, url, description, techStack } = project;

  const { IconContainer } = useSimpleIcons({
    icons: techStack,
    size: { mobile: 'md', desktop: 'lg' },
  });

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('flex flex-col', hoverLiftStyle, className)}
      aria-label={`View ${title} project on GitHub`}
    >
      {/* Project Title */}
      <h3 className="text-h3 text-text-white">{title}</h3>

      {/* Pill-shaped Metadata Container */}
      {/* Mobile: vertical stack (icons above description) */}
      {/* Desktop: horizontal layout (icons left, description right) */}
      <div
        className={cn(
          'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3',
          glassCardBaseStyle,
        )}
      >
        {/* Tech Stack Icons */}
        <IconContainer className="shrink-0" />

        {/* Description */}
        <p className="text-secondary text-text-white">{description}</p>
      </div>
    </a>
  );
}
