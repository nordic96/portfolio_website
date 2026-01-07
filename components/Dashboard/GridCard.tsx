import { cn } from '@/app/utils';
import { ReactNode } from 'react';

interface GridCardProps {
  children: ReactNode;
  className?: string;
  /** Optional title for the card section */
  title?: string;
  /** Whether to show the card border and background */
  variant?: 'default' | 'transparent';
}

/**
 * GridCard - Base card component for dashboard grid cells
 *
 * Styling:
 * - White background with subtle border
 * - Rounded corners (xl = 12px)
 * - Subtle shadow with hover lift effect
 * - Responsive padding (16px mobile, 20px desktop)
 *
 * Usage:
 * ```tsx
 * <GridCard title="Projects">
 *   <ProjectsList />
 * </GridCard>
 * ```
 */
export default function GridCard({
  children,
  className,
  title,
  variant = 'default',
}: GridCardProps) {
  const baseStyles =
    variant === 'default'
      ? 'bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow'
      : '';

  return (
    <div
      className={cn(
        baseStyles,
        'p-4 lg:p-5',
        'overflow-hidden',
        'h-full',
        className,
      )}
    >
      {title && (
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
