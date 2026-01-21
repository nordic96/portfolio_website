'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Star interface for Canvas rendering
 */
interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface StarFieldProps {
  /** Number of stars to render (default: 150) */
  starCount?: number;
  /** Minimum star radius in pixels (default: 0.5) */
  minRadius?: number;
  /** Maximum star radius in pixels (default: 2) */
  maxRadius?: number;
  /** Minimum base opacity (default: 0.3) */
  minOpacity?: number;
  /** Maximum base opacity (default: 1) */
  maxOpacity?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * StarField - Twinkling Night Sky Background
 *
 * Renders a canvas-based star field with twinkling animation.
 * Uses requestAnimationFrame for smooth 60fps performance.
 *
 * Performance optimizations:
 * - Canvas 2D API for efficient rendering of 100+ stars
 * - Single animation loop with requestAnimationFrame
 * - Memoized star generation to avoid re-computation
 * - Cleanup on unmount to prevent memory leaks
 *
 * Accessibility:
 * - Respects prefers-reduced-motion media query
 * - Shows static stars when reduced motion is preferred
 * - Canvas is decorative (aria-hidden)
 *
 * @example
 * ```tsx
 * <StarField starCount={150} />
 * ```
 */
export default function StarField({
  starCount = 150,
  minRadius = 0.5,
  maxRadius = 2,
  minOpacity = 0.3,
  maxOpacity = 1,
  className = '',
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>(0);
  const isReducedMotionRef = useRef(false);

  /**
   * Generate stars with random positions and properties
   * Called once on mount and on window resize
   */
  const generateStars = useCallback(
    (width: number, height: number): Star[] => {
      const stars: Star[] = [];

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: minRadius + Math.random() * (maxRadius - minRadius),
          baseOpacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
          // Varying twinkle speeds for natural effect (0.0005 to 0.002)
          twinkleSpeed: 0.0005 + Math.random() * 0.0015,
          // Random offset so stars don't all twinkle in sync
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }

      return stars;
    },
    [starCount, minRadius, maxRadius, minOpacity, maxOpacity],
  );

  /**
   * Draw all stars on canvas
   * Uses opacity modulation for twinkle effect
   */
  const drawStars = useCallback(
    (ctx: CanvasRenderingContext2D, timestamp: number) => {
      const { width, height } = ctx.canvas;
      ctx.clearRect(0, 0, width, height);

      starsRef.current.forEach((star) => {
        // Calculate twinkle opacity using sine wave
        // For reduced motion, use base opacity (no animation)
        let opacity = star.baseOpacity;

        if (!isReducedMotionRef.current) {
          // Oscillate between 30% and 100% of base opacity
          const twinkle =
            0.3 +
            0.7 * Math.sin(timestamp * star.twinkleSpeed + star.twinkleOffset);
          opacity = star.baseOpacity * twinkle;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });
    },
    [],
  );

  /**
   * Handle canvas resize to maintain full viewport coverage
   */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use devicePixelRatio for crisp rendering on high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Set canvas size accounting for device pixel ratio
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Scale context for high-DPI rendering
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Regenerate stars for new dimensions
    starsRef.current = generateStars(width, height);

    // Draw immediately after resize
    if (ctx) {
      drawStars(ctx, performance.now());
    }
  }, [generateStars, drawStars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = mediaQuery.matches;

    /**
     * Animation loop using requestAnimationFrame
     * Defined inside useEffect to avoid stale closure issues
     */
    const animate = (timestamp: number) => {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        drawStars(ctx, timestamp);
      }

      // Continue animation loop only if not reduced motion
      if (!isReducedMotionRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Handle reduced motion preference changes
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;

      if (e.matches) {
        // Stop animation
        cancelAnimationFrame(animationFrameRef.current);
        // Draw static stars
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawStars(ctx, 0);
        }
      } else {
        // Restart animation
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    // Initial setup
    handleResize();

    // Start animation if motion is not reduced
    if (!isReducedMotionRef.current) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function - Critical for preventing memory leaks
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [handleResize, drawStars]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
