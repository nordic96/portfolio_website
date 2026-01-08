import { cn } from '@/app/utils';
import { ClassValue } from 'clsx';
import { ReactNode } from 'react';

interface GridCardProps {
  children: ReactNode;
  className?: string | ClassValue;
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
export const gridCardDefaultStyle =
  'bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow';
export default function GridCard({
  children,
  className,
  title,
  variant = 'default',
}: GridCardProps) {
  const baseStyles = variant === 'default' ? gridCardDefaultStyle : '';

  return (
    <div className={'flex flex-col grow h-full'}>
      {title && (
        <h2 className="text-lg font-normal text-text-dark tracking-wider mb-3">
          {title}
        </h2>
      )}
      <div
        className={cn(
          baseStyles,
          'lg:p-3 max-sm:p-2',
          'overflow-hidden',
          'h-full',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
