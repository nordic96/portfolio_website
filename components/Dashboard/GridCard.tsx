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
      {title && <CardLabel>{title}</CardLabel>}
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

function CardLabel({ children }: React.PropsWithChildren<object>) {
  return (
    <div
      className={
        'flex justify-center items-center rounded-lg bg-gray-50 border-gray-400 border shadow-md p-1 max-w-50 max-sm:w-full'
      }
    >
      <div
        className={
          'border-2 border-red-300 rounded-md flex grow items-center px-4 max-sm:px-2'
        }
      >
        <h2
          className={
            'text-lg max-sm:text-sm font-semibold font-stretch-extra-condensed text-text-dark'
          }
        >
          {children}
        </h2>
      </div>
    </div>
  );
}
