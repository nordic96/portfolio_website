'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseStaggeredAnimationOptions {
  /** Number of items to animate */
  itemCount: number;
  /** Delay between each item animation in milliseconds (default: 500) */
  staggerDelay?: number;
  /** Intersection Observer threshold (default: 0.1) */
  threshold?: number;
  /** Root margin for Intersection Observer (default: '0px') */
  rootMargin?: string;
  /** Whether animations are enabled (default: true, set false for reduced motion) */
  enabled?: boolean;
}

interface UseStaggeredAnimationReturn<T extends HTMLElement> {
  /** Ref to attach to the container element */
  containerRef: React.RefObject<T | null>;
  /** Whether the container has entered the viewport */
  isVisible: boolean;
  /** Array of item indices that are currently visible */
  visibleItems: number[];
  /** Function to get inline styles for an item at a given index */
  getItemStyle: (index: number) => React.CSSProperties;
  /** Function to get CSS classes for an item at a given index */
  getItemClassName: (index: number) => string;
}

/**
 * useStaggeredAnimation - A reusable hook for scroll-triggered staggered animations
 *
 * Creates a staggered entrance animation where items appear one by one
 * from top to bottom when the container enters the viewport.
 *
 * Features:
 * - Uses Intersection Observer for scroll-triggered animations
 * - Respects prefers-reduced-motion preference
 * - Configurable delay between items (default: 500ms)
 * - Returns both inline styles and CSS classes for flexibility
 *
 * Usage:
 * ```tsx
 * const { containerRef, getItemClassName } = useStaggeredAnimation<HTMLDivElement>({
 *   itemCount: items.length,
 *   staggerDelay: 500,
 * });
 *
 * return (
 *   <div ref={containerRef}>
 *     {items.map((item, index) => (
 *       <div key={item.id} className={getItemClassName(index)}>
 *         {item.content}
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useStaggeredAnimation<T extends HTMLElement = HTMLDivElement>({
  itemCount,
  staggerDelay = 500,
  threshold = 0.1,
  rootMargin = '0px',
  enabled = true,
}: UseStaggeredAnimationOptions): UseStaggeredAnimationReturn<T> {
  const containerRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

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
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            observer.disconnect(); // Only trigger once
          }
        });
      },
      { threshold, rootMargin },
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, isVisible]);

  // Stagger the item visibility when container becomes visible
  useEffect(() => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];

    if (!isVisible || !enabled) {
      return;
    }

    // If reduced motion is preferred, show all items immediately
    if (prefersReducedMotion) {
      setVisibleItems(Array.from({ length: itemCount }, (_, i) => i));
      return;
    }

    // Stagger each item's visibility
    for (let i = 0; i < itemCount; i++) {
      const timeout = setTimeout(() => {
        setVisibleItems((prev) => [...prev, i]);
      }, i * staggerDelay);
      timeoutsRef.current.push(timeout);
    }

    return () => {
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, [isVisible, itemCount, staggerDelay, prefersReducedMotion, enabled]);

  // Get inline styles for an item (useful for custom animations)
  const getItemStyle = useCallback(
    (index: number): React.CSSProperties => {
      // If reduced motion or not enabled, show immediately
      if (prefersReducedMotion || !enabled) {
        return { opacity: 1, transform: 'translateY(0)' };
      }

      const isItemVisible = visibleItems.includes(index);
      return {
        opacity: isItemVisible ? 1 : 0,
        transform: isItemVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
      };
    },
    [visibleItems, prefersReducedMotion, enabled],
  );

  // Get CSS classes for an item (uses CSS animations)
  const getItemClassName = useCallback(
    (index: number): string => {
      // If reduced motion or not enabled, return no animation class
      if (prefersReducedMotion || !enabled) {
        return 'stagger-item stagger-item-visible';
      }

      const isItemVisible = visibleItems.includes(index);
      return isItemVisible
        ? 'stagger-item stagger-item-visible'
        : 'stagger-item';
    },
    [visibleItems, prefersReducedMotion, enabled],
  );

  return {
    containerRef,
    isVisible,
    visibleItems,
    getItemStyle,
    getItemClassName,
  };
}

export type { UseStaggeredAnimationOptions, UseStaggeredAnimationReturn };
