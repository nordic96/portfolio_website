'use client';

import Image from 'next/image';
import { cn } from '@/app/utils';
import { hoverLiftStyle } from '@/app/styles';
import { GitHub, LinkedIn, Mail } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import CalligraphySignature from '@/components/CalligraphySignature';

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

  return (
    <section
      className={'flex flex-col max-sm:items-center'}
      aria-label={t('section_label')}
    >
      {/** Signature Container - Animated calligraphy signature */}
      <CalligraphySignature
        animationDuration={2.5}
        delay={0.3}
        alt={t('signature_alt')}
        width={289}
        height={96}
      />
      <div className={'flex gap-3'}>
        {/** Profile Image Container */}
        {variant === 'large' && (
          <div
            className={
              'w-22 aspect-auto border-2 border-accent-yellow rounded-xl p-1 flex items-center'
            }
          >
            <Image
              src={'/images/profile_img.png'}
              width={88}
              height={88}
              alt={t('profile_alt')}
            />
          </div>
        )}
        {/** Metadata Container */}
        <div className={'flex flex-col'}>
          {variant === 'large' && <h2 className={'text-h2'}>{t('name')}</h2>}
          {variant === 'small' && <h3 className={'text-h3'}>{t('name')}</h3>}
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
          {/** NameCard Icons Container */}
          <nav
            className={cn(
              {
                'text-3xl': variant === 'large',
                'text-xl': variant === 'small',
              },
              'max-sm:text-xl',
              'flex items-center lg:mt-1 gap-1 max-sm:gap-0.5',
            )}
            aria-label={t('social_links_label')}
          >
            <NamecardIcon
              href={'https://www.linkedin.com/in/gi-hun-ko-863619184/'}
              ariaLabel={t('linkedin_label')}
            >
              <LinkedIn fontSize={'inherit'} />
            </NamecardIcon>
            <NamecardIcon
              href={'mailto:rhrlgns96@gmail.com'}
              ariaLabel={t('email_label')}
            >
              <Mail fontSize={'inherit'} />
            </NamecardIcon>
            <NamecardIcon
              href={'https://github.com/nordic96'}
              ariaLabel={t('github_label')}
            >
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
      className={cn(hoverLiftStyle)}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
