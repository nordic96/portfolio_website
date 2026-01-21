import { cn } from '@/app/utils';
import { ClassValue } from 'clsx';

export interface SectionHeaderProps {
  /** Label text displayed above the title (e.g., "LIVE WEB PROJECTS") */
  title: string;
  /** Text alignment for the header */
  alignment?: 'left' | 'center' | 'right';
  /** Additional CSS classes */
  className?: string | ClassValue;
}

/**
 * SectionHeader - Reusable section header with label and title
 *
 * Design:
 * - Label: Small, uppercase, accent cyan color, letter-spacing
 * - Title: Large, bold, white, Poppins font
 * - Responsive: Font sizes adjust on mobile
 *
 * Usage:
 * ```tsx
 * <SectionHeader
 *   label="LIVE WEB PROJECTS"
 *   title="Featured Deployments"
 *   alignment="center"
 * />
 * ```
 */
export default function SectionHeader({
  title,
  alignment = 'left',
  className,
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('flex flex-col', alignmentClasses[alignment])}>
      {/* Title: Large, bold, white, Poppins font (optional) */}
      {title && (
        <h2
          className={cn(
            'font-poppins font-bold italic',
            // Font size: 24px mobile, 32px desktop
            'text-2xl lg:text-[32px] lg:leading-tight',
            // White text color
            'text-text-white',
            // Spacing between label and title
            'mt-1 lg:mt-2',
          )}
        >
          {title}
        </h2>
      )}
      {/** Section Colour Highlight Divider */}
      <div
        className={cn(
          'h-2 -translate-y-2 rounded-b-xl drop-shadow-2xl',
          className,
        )}
      />
    </div>
  );
}
