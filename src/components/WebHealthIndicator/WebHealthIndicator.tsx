'use client';

import { cn } from '@/src/utils';
import type { PingStatus } from '@/src/hooks/useImagePing';
import { useTranslations } from 'next-intl';

interface WebHealthIndicatorProps {
  status: PingStatus;
  isLoading?: boolean;
  className?: string;
}

/**
 * Status color mapping based on design specs:
 * Colors are defined as CSS variables in globals.css:
 * - --status-live (#22c55e): Site is live and responsive
 * - --status-unknown (#9ca3af): Status unknown/checking
 *
 * Simplified to two states for client-side image ping approach
 * (no SSRF risk, graceful CORS fallback)
 */
const statusConfig: Record<
  PingStatus,
  { color: string; label: string; ariaLabel: string }
> = {
  live: {
    color: 'bg-status-live',
    label: 'Live',
    ariaLabel: 'Website is live and responsive',
  },
  unknown: {
    color: 'bg-status-unknown',
    label: 'Unknown',
    ariaLabel: 'Website status is unknown',
  },
};

/**
 * WebHealthIndicator - Displays website health status with colored dot
 *
 * Features:
 * - Colored status dot (green/yellow/red/gray)
 * - Loading animation state
 * - Accessible with ARIA labels
 */
export default function WebHealthIndicator({
  status,
  isLoading = false,
  className,
}: WebHealthIndicatorProps) {
  const config = statusConfig[status];
  const t = useTranslations('WebHealthIndicator');
  return (
    <div
      className={cn('flex items-center gap-2 text-sm', className)}
      role="status"
      aria-label={isLoading ? 'Checking website status' : t(`status_${status}`)}
    >
      <span className="text-text-secondary">Status:</span>
      <span
        className={cn(
          'w-3 h-3 rounded-full',
          isLoading ? 'bg-status-unknown animate-pulse' : config.color,
          // Add a subtle glow effect for live status
          status === 'live' &&
            !isLoading &&
            'shadow-[0_0_8px_var(--status-live)]',
        )}
        aria-hidden="true"
      />
      {!isLoading && (
        <span className="text-text-secondary text-xs">{config.label}</span>
      )}
    </div>
  );
}
