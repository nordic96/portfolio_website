'use client';

import Image from 'next/image';
import { hoverLiftStyle } from '@/src/styles';
import { cn } from '@/src/utils';
import { useTranslations } from 'next-intl';

export interface CertificationCardProps {
  /** Full name of the certification (e.g., "AWS Solutions Architect - Associate") */
  name: string;
  /** Short name for compact display (e.g., "AWS SA Associate") */
  shortName?: string;
  /** Name of the issuing organization (e.g., "Amazon Web Services") */
  issuer: string;
  /** Issue date in ISO format (e.g., "2023-02-14") */
  issueDate: string;
  /** Path to the badge image */
  badgeImage: string;
  /** Alt text for the badge image */
  badgeAlt?: string;
  /** Optional verification URL (opens in new tab) */
  verificationUrl?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Formats an ISO date string to a readable format (e.g., "Feb 14, 2023")
 */
function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * CertificationCard - Displays a professional certification with badge,
 * name, issuing organization, and dates.
 *
 * Design Reference (from issue #444):
 * +----------------------------------------+
 * |  +------+                              |
 * |  | BADGE|   AWS Solutions Architect    |
 * |  | LOGO |   Associate                  |
 * |  +------+                              |
 * |           Amazon Web Services          |
 * |           Issued: Feb 14, 2023         |
 * |                                        |
 * |           [Verify ->]                  |
 * +----------------------------------------+
 *
 * Styling:
 * - Uses glassCardBaseStyle for consistent glassmorphism look
 * - Hover state with subtle lift animation
 * - Dark theme with v5 Night Sky color palette
 */
export default function CertificationCard({
  name,
  shortName,
  issuer,
  issueDate,
  badgeImage,
  badgeAlt,
  verificationUrl,
  className,
}: CertificationCardProps) {
  const t = useTranslations('Certifications');
  const displayName = shortName || name;
  const formattedIssueDate = formatDate(issueDate);

  const cardContent = (
    <div
      className={cn(
        // Glass card styling with responsive padding
        'bg-dark-gray/50 backdrop-blur-md rounded-3xl',
        'p-2 md:p-2.5 lg:p-3',
        // Flexbox layout: badge on left, info on right
        // Responsive gap: 12px mobile, 14px tablet, 16px desktop
        'flex lg:flex-row md:flex-col max-sm:flex-row items-center gap-3 md:gap-3.5 lg:gap-4',
        // Hover effects
        hoverLiftStyle,
        // Subtle glow on hover
        'hover:shadow-[0_0_20px_rgba(0,192,232,0.15)]',
        className,
      )}
    >
      {/* Badge Image - Left Side - Responsive sizing */}
      <div className="shrink-0">
        <div className="w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 relative">
          <Image
            src={badgeImage}
            alt={badgeAlt || `${name} badge`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 48px, (max-width: 1024px) 56px, 80px"
          />
        </div>
      </div>

      {/* Certification Info - Right Side */}
      <div className="flex flex-col min-w-0 flex-1">
        {/* Issuing Organization */}
        <p className="text-secondary text-text-white mt-0.5 md:mt-1">
          {displayName}
        </p>

        {/* Dates - Responsive text sizing */}
        <div className="flex flex-col gap-0.5 mt-1 md:mt-1.5 lg:mt-2">
          <p className="text-[10px] md:text-[11px] lg:text-xs text-text-white">
            {t('issued_label')}: {formattedIssueDate}
          </p>
        </div>

        {/* Verification Link - Responsive sizing */}
        {verificationUrl && (
          <span className="inline-flex items-center gap-1 text-xs md:text-sm text-accent-cyan mt-2 md:mt-2.5 lg:mt-3 group-hover:underline">
            {t('verify_label')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-0.5 md:w-3.5 md:h-3.5"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );

  // Wrap in anchor if verification URL is provided
  if (verificationUrl) {
    return (
      <div className={'flex flex-col'}>
        {/* Certification Name */}
        <h3 className="text-h3 text-text-white leading-snug">{issuer}</h3>
        <a
          href={verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
          aria-label={`Verify ${name} certification`}
        >
          {cardContent}
        </a>
      </div>
    );
  }

  return (
    <div className={'flex flex-col'}>
      {/* Certification Name */}
      <h3 className="text-h3 text-text-white leading-snug">{issuer}</h3>
      {cardContent}
    </div>
  );
}
