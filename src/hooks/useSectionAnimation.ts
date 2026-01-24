'use client';

import { useEffect, useRef, useState } from 'react';

interface UseSectionAnimationOptions {
  /** Intersection Observer threshold (default: 0.1) */
  threshold?: number;
  /** Root margin for Intersection Observer (default: '0px') */
  rootMargin?: string;
  /** Whether to trigger only once (default: true) */
  triggerOnce?: boolean;
}

interface UseSectionAnimationReturn<T extends HTMLElement> {
  /** Ref to attach to the section element */
  sectionRef: React.RefObject<T | null>;
  /** Whether the section has entered the viewport */
  isVisible: boolean;
  /** CSS class to apply for animation */
  animationClassName: string;
}

/**
 * useSectionAnimation - A hook for section-level fade-in animations
 *
 * Triggers a simple fade-in animation when a section enters the viewport.
 * Respects prefers-reduced-motion preference.
 *
 * Usage:
 * ```tsx
 * const { sectionRef, animationClassName } = useSectionAnimation<HTMLElement>();
 *
 * return (
 *   <section ref={sectionRef} className={animationClassName}>
 *     {content}
 *   </section>
 * );
 * ```
 */
export function useSectionAnimation<T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseSectionAnimationOptions = {}): UseSectionAnimationReturn<T> {
  const sectionRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
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

  // Intersection Observer to trigger animation when visible
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  // Get animation class name
  const animationClassName = prefersReducedMotion
    ? '' // No animation class for reduced motion
    : isVisible
      ? 'animate-section-fade-in'
      : 'opacity-0';

  return {
    sectionRef,
    isVisible,
    animationClassName,
  };
}

export type { UseSectionAnimationOptions, UseSectionAnimationReturn };
