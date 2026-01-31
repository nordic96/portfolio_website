'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SimpleIcon } from 'simple-icons';

import { glassCardBaseStyle, hoverLiftStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { useSimpleIcons } from '@/src/hooks';
import { useTranslations } from 'next-intl';

/**
 * Tag with optional custom color
 */
export interface ProjectTag {
  label: string;
  /** Optional custom hex color (default: use TAG_COLORS mapping) */
  color?: string;
}

export interface SmallProject {
  id: string;
  title: string;
  url: string;
  techStack: SimpleIcon[];
  /** Project category/technology tags with color accents */
  tags?: ProjectTag[];
  /** URL for hover preview image */
  previewImage?: string;
}

/**
 * Default color mapping for common tag labels
 * Colors from design spec (Issue #472)
 */
export const TAG_COLORS: Record<string, string> = {
  '#frontend': '#00d4ff', // cyan
  '#backend': '#10b981', // green
  '#mobile': '#f59e0b', // amber
  '#ai/ml': '#c084fc', // purple
  '#devops': '#ef4444', // red
  '#iot': '#06b6d4', // teal
  '#ml': '#c084fc', // purple
  '#data': '#8b5cf6', // violet
  '#game': '#ec4899', // pink
};

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
 *
 * New features (Issue #472):
 * - Color-accented hashtags below tech icons
 * - Hover-triggered image preview with slide-in animation
 */
export default function SmallProjectCard({
  project,
  className,
}: SmallProjectCardProps) {
  const { id, title, url, techStack, tags, previewImage } = project;
  const projectT = useTranslations('Projects');
  const { IconContainer } = useSimpleIcons({
    icons: techStack,
  });

  // Hover state for preview image
  const [isHovered, setIsHovered] = useState(false);
  // Touch device state - tap to reveal preview
  const [isTapped, setIsTapped] = useState(false);
  // Track if reduced motion is preferred
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Show preview on hover or tap (for touch devices)
  const showPreview = isHovered || isTapped;

  // Handle touch interaction
  const handleTouchStart = () => {
    if (previewImage) {
      setIsTapped((prev) => !prev);
    }
  };

  /**
   * Get color for a tag label
   * Priority: custom color > TAG_COLORS mapping > default cyan
   */
  const getTagColor = (tag: ProjectTag): string => {
    if (tag.color) return tag.color;
    return TAG_COLORS[tag.label.toLowerCase()] || '#00d4ff';
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('flex flex-col max-sm:w-full', hoverLiftStyle, className)}
      aria-label={`View ${title} project on GitHub`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
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
          'relative overflow-hidden',
          glassCardBaseStyle,
        )}
      >
        {/* Hover Preview Image - slides in from top */}
        {previewImage && (
          <div
            className={cn(
              'absolute inset-0 z-10',
              prefersReducedMotion
                ? showPreview
                  ? 'opacity-100'
                  : 'opacity-0'
                : 'transition-all duration-300 ease-out',
              showPreview
                ? 'translate-y-0 opacity-100'
                : '-translate-y-full opacity-0',
            )}
            aria-hidden={!showPreview}
          >
            <Image
              src={previewImage}
              alt={`${title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover rounded-3xl"
              loading="lazy"
            />
            {/* Gradient overlay for better text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-3xl" />
          </div>
        )}

        {/* Content - fades slightly when preview is shown */}
        <div
          className={cn(
            'relative z-0 flex flex-col gap-2 md:gap-2.5 lg:gap-3 w-full',
            prefersReducedMotion
              ? ''
              : 'transition-opacity duration-300 ease-out',
            showPreview && previewImage ? 'opacity-40' : 'opacity-100',
          )}
        >
          {/* Tech Stack Icons */}
          <IconContainer className="shrink-0" />

          {/* Hashtags - color-accented tags */}
          {tags && tags.length > 0 && (
            <div
              className="flex flex-wrap gap-1.5 md:gap-2"
              role="list"
              aria-label="Project categories"
            >
              {tags.map((tag) => (
                <span
                  key={tag.label}
                  role="listitem"
                  className="text-xs md:text-sm font-medium px-2 py-0.5 rounded-full bg-white/10"
                  style={{ color: getTagColor(tag) }}
                >
                  {tag.label.startsWith('#') ? tag.label : `#${tag.label}`}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-secondary text-text-white">
            {projectT(`${id}.desc`)}
          </p>
        </div>
      </div>
    </a>
  );
}
