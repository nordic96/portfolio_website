'use client';

import { useMemo } from 'react';
import { SimpleIcon } from 'simple-icons';
import { Tooltip } from '@mui/material';
import { cn } from '@/src/utils';

/**
 * Size presets for SimpleIcon rendering
 * - sm: 16px (mobile compact)
 * - md: 20px (mobile default)
 * - lg: 24px (desktop default)
 */
type IconSize = 'sm' | 'md' | 'lg';

interface UseSimpleIconsOptions {
  /** Array of SimpleIcon objects to render */
  icons: SimpleIcon[];
  /** Size preset or responsive object */
  size?: IconSize | { mobile: IconSize; desktop: IconSize };
  /** Additional className for the icon container */
  className?: string;
  /** Show tooltip on hover (default: true) */
  showTooltip?: boolean;
  /** Icon color class (default: 'fill-white') */
  colorClass?: string;
}

interface RenderedIcon {
  key: string;
  title: string;
  element: React.ReactNode;
}

interface UseSimpleIconsReturn {
  /** Array of rendered icon elements with metadata */
  icons: RenderedIcon[];
  /** Pre-composed icon container with flex layout */
  IconContainer: ({ className }: { className?: string }) => React.JSX.Element;
}

/**
 * Size mapping to Tailwind classes
 */
const sizeClasses: Record<IconSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

/**
 * Responsive size mapping to Tailwind classes
 */
const getResponsiveSizeClass = (
  size: IconSize | { mobile: IconSize; desktop: IconSize },
): string => {
  if (typeof size === 'string') {
    return sizeClasses[size];
  }
  // Responsive: mobile size + md: desktop size
  const mobileClass = sizeClasses[size.mobile];
  const desktopClass = sizeClasses[size.desktop]
    .replace('w-', 'md:w-')
    .replace('h-', 'md:h-');
  return `${mobileClass} ${desktopClass}`;
};

/**
 * useSimpleIcons - Hook for consistent SimpleIcon rendering across components
 *
 * Features:
 * - Responsive sizing (sm/md/lg or mobile/desktop object)
 * - Consistent color handling with fill-white default
 * - Optional tooltips for accessibility
 * - Pre-built IconContainer with responsive flex layout
 *
 * @example
 * ```tsx
 * const { IconContainer } = useSimpleIcons({
 *   icons: [siReact, siNextdotjs],
 *   size: { mobile: 'md', desktop: 'lg' },
 * });
 *
 * return <IconContainer className="justify-center" />;
 * ```
 */
export function useSimpleIcons({
  icons,
  size = { mobile: 'md', desktop: 'lg' },
  className,
  showTooltip = true,
  colorClass = 'fill-white',
}: UseSimpleIconsOptions): UseSimpleIconsReturn {
  const sizeClass = getResponsiveSizeClass(size);

  const renderedIcons: RenderedIcon[] = useMemo(
    () =>
      icons.map((icon) => {
        const iconElement = (
          <div
            className={cn(
              'flex items-center justify-center shrink-0',
              sizeClass,
              colorClass,
              className,
            )}
            /**
             * SAFETY: SVG content from 'simple-icons' package (trusted source).
             * No user input involved. Static SVG strings only.
             */
            dangerouslySetInnerHTML={{ __html: icon.svg }}
            aria-label={icon.title}
            role="img"
          />
        );

        const element = showTooltip ? (
          <Tooltip key={`icon-${icon.slug}`} title={icon.title} arrow>
            {iconElement}
          </Tooltip>
        ) : (
          <span key={`icon-${icon.slug}`}>{iconElement}</span>
        );

        return {
          key: icon.slug,
          title: icon.title,
          element,
        };
      }),
    [icons, sizeClass, className, showTooltip, colorClass],
  );

  /**
   * IconContainer - Pre-built flex container with responsive layout
   *
   * Features:
   * - flex-wrap for mobile overflow handling
   * - Responsive gap (gap-1.5 on mobile, gap-2 on desktop)
   * - Centered alignment by default
   */
  const IconContainer = useMemo(() => {
    const Component = ({
      className: containerClassName,
    }: {
      className?: string;
    }) => (
      <div
        className={cn(
          'flex flex-wrap items-center gap-1.5 md:gap-2',
          containerClassName,
        )}
        role="list"
        aria-label="Technologies used"
      >
        {renderedIcons.map(({ key, element }) => (
          <span key={key} role="listitem">
            {element}
          </span>
        ))}
      </div>
    );
    return Component;
  }, [renderedIcons]);

  return {
    icons: renderedIcons,
    IconContainer,
  };
}

export type { IconSize, UseSimpleIconsOptions, UseSimpleIconsReturn };
