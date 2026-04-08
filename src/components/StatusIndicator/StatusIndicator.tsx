'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/src/utils';
import { useCurrentStatus, StatusType } from '@/src/hooks/useCurrentStatus';

/**
 * Map status types to their GIF and fallback PNG paths
 * Placeholder paths in /assets/status/ directory
 */
const STATUS_ASSETS: Record<StatusType, { gif: string; png: string }> = {
  sleeping: {
    gif: '/assets/status/sleeping.gif',
    png: '/assets/status/sleeping.png',
  },
  coding: {
    gif: '/assets/status/coding.gif',
    png: '/assets/status/coding.png',
  },
  eating: {
    gif: '/assets/status/eating.gif',
    png: '/assets/status/eating.png',
  },
  break: {
    gif: '/assets/status/break.gif',
    png: '/assets/status/break.png',
  },
};

interface StatusIndicatorProps {
  /** Size of the indicator in pixels (default: 28) */
  size?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * StatusIndicator - Displays animated status icon based on Singapore Time
 *
 * Features:
 * - Real-time status updates (every minute)
 * - GIF animation for motion-enabled users
 * - Static PNG fallback for reduced-motion preference
 * - Emoji fallback if images fail to load
 * - Accessible with proper ARIA labels
 * - Responsive sizing with Tailwind
 *
 * Position: Intended to be placed near the profile name
 *
 * Fallback chain:
 * 1. GIF (if motion enabled)
 * 2. PNG (if reduced motion or GIF fails)
 * 3. Emoji (if both GIF and PNG fail)
 *
 * Usage:
 * ```tsx
 * <StatusIndicator size={28} />
 * ```
 */
export default function StatusIndicator({
  size = 28,
  className,
}: StatusIndicatorProps) {
  const { status, label, emoji } = useCurrentStatus();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [gifError, setGifError] = useState(false);
  const [pngError, setPngError] = useState(false);

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

  // Reset image errors when status changes
  useEffect(() => {
    setGifError(false);
    setPngError(false);
  }, [status]);

  const assets = STATUS_ASSETS[status];

  // Determine which image source to use based on preference and error states
  const getImageSrc = useCallback(() => {
    // If reduced motion is preferred, skip GIF entirely
    if (prefersReducedMotion) {
      return pngError ? null : assets.png;
    }
    // If GIF failed, try PNG
    if (gifError) {
      return pngError ? null : assets.png;
    }
    // Default to GIF
    return assets.gif;
  }, [prefersReducedMotion, gifError, pngError, assets]);

  const imageSrc = getImageSrc();

  // Handle image error - try fallback chain
  const handleImageError = useCallback(() => {
    if (!prefersReducedMotion && !gifError) {
      // GIF failed, try PNG next
      setGifError(true);
    } else {
      // PNG failed too, will fall back to emoji
      setPngError(true);
    }
  }, [prefersReducedMotion, gifError]);

  // Fallback to emoji if all images fail
  if (!imageSrc) {
    return (
      <span
        role="img"
        aria-label={`Current status: ${label}`}
        className={cn(
          'inline-flex items-center justify-center',
          'select-none',
          className,
        )}
        style={{ fontSize: size * 0.8 }}
      >
        {emoji}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        // Smooth transition between status changes
        'transition-opacity duration-300 ease-in-out',
        className,
      )}
      aria-label={`Current status: ${label}`}
      role="img"
    >
      <Image
        src={imageSrc}
        alt={`Status: ${label}`}
        width={size}
        height={size}
        className={cn(
          'object-contain',
          // Disable image dragging
          'select-none pointer-events-none',
        )}
        onError={handleImageError}
        // Eager loading since this is in the hero section
        priority
        // Disable image optimization for GIFs to preserve animation
        unoptimized={imageSrc.endsWith('.gif')}
      />
    </span>
  );
}
