'use client';

import Image from 'next/image';
import { cn } from '@/src/utils';
import { GitHub, LinkedIn, Mail } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import CalligraphySignature from '@/src/components/CalligraphySignature';
import { StatusIndicator } from '@/src/components/StatusIndicator';
import { GITHUB_URL, LINKEDIN_URL } from '@/src/config';
import { useSectionAnimation } from '@/src/hooks';

interface NameCardProps {
  variant?: 'small' | 'large';
}

interface NamecardIconProps {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}

export default function NameCard({ variant = 'large' }: NameCardProps) {
  const t = useTranslations('NameCard');

  // Section fade-in animation (only for large variant which is the hero)
  const { sectionRef, animationClassName } = useSectionAnimation();

  // Signature dimensions based on variant - responsive sizing
  // Large: 220px mobile -> 250px tablet -> 289px desktop
  // Small: 150px mobile -> 165px tablet -> 180px desktop
  const signatureClassName =
    variant === 'small'
      ? 'w-[150px] h-[50px] md:w-[165px] md:h-[55px] lg:w-[180px] lg:h-[60px]'
      : 'w-[220px] h-[73px] md:w-[250px] md:h-[83px] lg:w-[289px] lg:h-[96px]';

  return (
    <section
      ref={variant === 'large' ? sectionRef : undefined}
      className={cn(
        'flex flex-col max-md:items-center',
        variant === 'large' && animationClassName,
      )}
      aria-label={t('section_label')}
    >
      {/** Signature Container - Animated calligraphy signature */}
      <CalligraphySignature
        animationDuration={2.5}
        delay={0.3}
        alt={t('signature_alt')}
        width={variant === 'small' ? 180 : 289}
        height={variant === 'small' ? 60 : 96}
        className={signatureClassName}
      />
      <div className={'flex gap-2 md:gap-3'}>
        {/** Profile Image Container - responsive sizing */}
        {variant === 'large' && (
          <Image
            className={cn(
              // Responsive min-width: 72px mobile, 80px tablet, 88px desktop
              'min-w-18 md:min-w-20 lg:min-w-22',
              'aspect-auto border-2 border-accent-yellow rounded-xl p-1 object-cover',
            )}
            src={'/images/profile_img.png'}
            width={88}
            height={88}
            alt={t('profile_alt')}
            draggable={false}
          />
        )}
        {/** Metadata Container */}
        <div className={'flex flex-col'}>
          {/** Name with Status Indicator */}
          {variant === 'large' && (
            <div className="flex items-center gap-2">
              <h2 className={'text-h2'}>{t('name')}</h2>
              <StatusIndicator
                size={28}
                className="ml-1 max-md:hidden md:block lg:ml-2"
              />
            </div>
          )}
          {variant === 'small' && (
            <div className="flex items-center gap-1.5">
              <h3 className={'text-h3'}>{t('name')}</h3>
              <StatusIndicator size={20} className="ml-0.5" />
            </div>
          )}
          {variant === 'large' && (
            <span className={'text-secondary'}>
              {t('job_title')}&nbsp;
              <span
                className={'not-italic'}
                aria-label={t('location_flag_label')}
              >
                🇸🇬
              </span>
            </span>
          )}
          {/** NameCard Icons Container - responsive icon sizing */}
          <nav
            className={cn(
              {
                // Large variant: 24px mobile, 28px tablet, 30px desktop
                'text-2xl md:text-[28px] lg:text-3xl': variant === 'large',
                // Small variant: 18px mobile, 20px tablet, 24px desktop
                'text-lg md:text-xl lg:text-xl': variant === 'small',
              },
              // Removed gap since 44px touch targets provide sufficient spacing
              // Use negative margin to align icons with text edge
              'flex items-center mt-0.5 md:mt-1 -ml-2',
            )}
            aria-label={t('social_links_label')}
          >
            <NamecardIcon href={LINKEDIN_URL} ariaLabel={t('linkedin_label')}>
              <LinkedIn fontSize={'inherit'} />
            </NamecardIcon>
            <NamecardIcon
              href={'mailto:rhrlgns96@gmail.com'}
              ariaLabel={t('email_label')}
            >
              <Mail fontSize={'inherit'} />
            </NamecardIcon>
            <NamecardIcon href={GITHUB_URL} ariaLabel={t('github_label')}>
              <GitHub fontSize={'inherit'} />
            </NamecardIcon>
          </nav>
        </div>
      </div>
    </section>
  );
}

function NamecardIcon({ href, ariaLabel, children }: NamecardIconProps) {
  return (
    <a
      href={href}
      target={'_blank'}
      rel="noopener noreferrer"
      className={cn(
        // Base styles with minimum 44x44px touch target for accessibility
        'min-w-11 min-h-11 inline-flex items-center justify-center',
        // Hover animation - subtle scale and lift
        'transition-all duration-200 ease-in-out',
        'hover:-translate-y-1 hover:scale-110 hover:text-accent-yellow',
        // Focus-visible state for keyboard navigation (WCAG AA)
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-accent-cyan focus-visible:rounded-lg',
        // Remove default focus outline for mouse users
        'focus:outline-none',
      )}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
