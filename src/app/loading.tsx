'use client';

import CalligraphySignature from '@/src/components/CalligraphySignature';

/**
 * Global Loading Page - v5 Night Sky Theme
 *
 * Displays a centered CalligraphySignature with animation and a subtle loading bar.
 * Uses the Night Sky gradient background to match the main theme.
 *
 * Accessibility:
 * - Respects prefers-reduced-motion for loading bar animation
 * - CalligraphySignature handles its own reduced motion internally
 * - Proper ARIA attributes for loading state
 */
export default function Loading() {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center bg-night-sky-gradient"
      role="status"
      aria-label="Loading page content"
    >
      {/* Centered Signature with Animation */}
      <CalligraphySignature
        width={300}
        height={100}
        animationDuration={2.5}
        delay={0.3}
        alt="Stephen Ko signature"
      />

      {/* Loading Bar */}
      <div
        className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden"
        aria-hidden="true"
      >
        <div className="h-full bg-accent-yellow animate-loading-bar" />
      </div>

      {/* Screen reader text */}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
