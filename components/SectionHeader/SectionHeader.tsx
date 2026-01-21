import { cn } from '@/app/utils';

export interface SectionHeaderProps {
  /** Label text displayed above the title (e.g., "LIVE WEB PROJECTS") */
  label: string;
  /** Optional title text displayed below the label (e.g., "Featured Deployments") */
  title?: string;
  /** Text alignment for the header */
  alignment?: 'left' | 'center' | 'right';
  /** Additional CSS classes */
  className?: string;
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
  label,
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
    <div
      className={cn('flex flex-col', alignmentClasses[alignment], className)}
    >
      {/* Label: Small, uppercase, accent cyan, letter-spacing */}
      <span
        className={cn(
          'font-roboto font-medium uppercase tracking-wider',
          // Font size: 12px mobile, 14px desktop
          'text-xs lg:text-sm',
          // Accent cyan color
          'text-accent-cyan',
        )}
      >
        {label}
      </span>

      {/* Title: Large, bold, white, Poppins font (optional) */}
      {title && (
        <h2
          className={cn(
            'font-poppins font-bold',
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
    </div>
  );
}
