import { cn } from '@/app/utils';
import { ClassValue } from 'clsx';
import { ReactNode } from 'react';
import SectionHeader from './SectionHeader';

interface GridCardProps {
  children: ReactNode;
  className?: string | ClassValue;
  headerClass?: string | ClassValue;
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
export const gridCardDefaultStyle = '';
export default function GridCard({
  children,
  className,
  headerClass,
  title,
  variant = 'default',
}: GridCardProps) {
  const baseStyles = variant === 'default' ? gridCardDefaultStyle : '';

  return (
    <div className={'flex flex-col grow h-full'}>
      {title && (
        <SectionHeader
          title={title}
          alignment={'center'}
          className={headerClass}
        />
      )}
      <div className={cn(baseStyles, 'overflow-hidden', 'h-full', className)}>
        {children}
      </div>
    </div>
  );
}
