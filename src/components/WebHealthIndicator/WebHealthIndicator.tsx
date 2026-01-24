'use client';

import { cn } from '@/src/utils';
import type { HealthStatus } from '@/src/app/api/health-check/route';

interface WebHealthIndicatorProps {
  status: HealthStatus;
  isLoading?: boolean;
  className?: string;
}

/**
 * Status color mapping based on design specs:
 * - Green (#22c55e): Site is live and responsive
 * - Yellow (#eab308): Site is slow or partially available
 * - Red (#ef4444): Site is down or unreachable
 * - Gray (#9ca3af): Status unknown/checking
 */
const statusConfig: Record<
  HealthStatus,
  { color: string; label: string; ariaLabel: string }
> = {
  live: {
    color: 'bg-[#22c55e]',
    label: 'Live',
    ariaLabel: 'Website is live and responsive',
  },
  slow: {
    color: 'bg-[#eab308]',
    label: 'Slow',
    ariaLabel: 'Website is slow or partially available',
  },
  down: {
    color: 'bg-[#ef4444]',
    label: 'Down',
    ariaLabel: 'Website is down or unreachable',
  },
  unknown: {
    color: 'bg-[#9ca3af]',
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

  return (
    <div
      className={cn('flex items-center gap-2 text-sm', className)}
      role="status"
      aria-label={isLoading ? 'Checking website status' : config.ariaLabel}
    >
      <span className="text-text-secondary">Status:</span>
      <span
        className={cn(
          'w-3 h-3 rounded-full',
          isLoading ? 'bg-[#9ca3af] animate-pulse' : config.color,
          // Add a subtle glow effect for live status
          status === 'live' && !isLoading && 'shadow-[0_0_8px_rgba(34,197,94,0.5)]'
        )}
        aria-hidden="true"
      />
      {!isLoading && (
        <span className="text-text-secondary text-xs">{config.label}</span>
      )}
    </div>
  );
}
