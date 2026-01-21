'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface CalligraphySignatureProps {
  /** Animation duration in seconds (default: 2.5) */
  animationDuration?: number;
  /** Delay before animation starts in seconds (default: 0.3) */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Width of the signature */
  width?: number;
  /** Height of the signature */
  height?: number;
}

/**
 * CalligraphySignature - Animated signature with writing reveal effect
 *
 * Uses CSS clip-path animation to create a left-to-right reveal
 * that simulates the signature being written.
 *
 * Accessibility:
 * - Respects prefers-reduced-motion media query
 * - Shows static signature immediately when reduced motion is preferred
 * - Proper alt text for screen readers
 *
 * @example
 * ```tsx
 * <CalligraphySignature
 *   animationDuration={2.5}
 *   delay={0.3}
 *   alt="Stephen Ko signature"
 * />
 * ```
 */
export default function CalligraphySignature({
  animationDuration = 2.5,
  delay = 0.3,
  className = '',
  alt = 'Signature',
  width = 289,
  height = 96,
}: CalligraphySignatureProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    // Start animation after delay if motion is allowed and hasn't run yet
    if (!mediaQuery.matches && !hasAnimatedRef.current) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        hasAnimatedRef.current = true;
      }, delay * 1000);

      return () => {
        clearTimeout(timer);
        mediaQuery.removeEventListener('change', handleMotionChange);
      };
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [delay]);

  // Calculate animation styles
  const animationStyle = prefersReducedMotion
    ? {} // No animation for reduced motion
    : {
        clipPath: isAnimating ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
        transition: isAnimating
          ? `clip-path ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`
          : 'none',
      };

  return (
    <div
      className={`relative overflow-visible ${className}`}
      style={{
        width,
        height,
      }}
    >
      <Image
        src="/images/signature.svg"
        width={width}
        height={height}
        alt={alt}
        priority
        style={{
          ...animationStyle,
          // For reduced motion, show full signature immediately
          ...(prefersReducedMotion ? { clipPath: 'inset(0 0 0 0)' } : {}),
        }}
      />
    </div>
  );
}
