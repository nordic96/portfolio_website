import { baseWidth } from '@/src/styles';
import { cn } from '@/src/utils';
import { useTranslations } from 'next-intl';

import FooterLocaleSwitcher from './FooterLocaleSwitcher/FooterLocaleSwitcher';
import { PropsWithChildren } from 'react';
import { ClassValue } from 'clsx';
import { getAppVersion } from '@/src/config';
import NameCard from './NameCard';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className={'flex flex-col mt-20 md:mt-24 lg:mt-40'}>
      <div
        className={cn(
          'flex flex-col justify-start items-center',
          'border-t border-t-text-dark',
          // Responsive padding: 16px mobile, 20px tablet, 32px desktop
          'px-4 md:px-5 lg:px-8',
          'pt-3 md:pt-3.5 lg:pt-4',
          'pb-6 md:pb-7 lg:pb-8',
          // Responsive text: 12px mobile, 13px tablet, 14px desktop
          'text-xs md:text-[13px] lg:text-sm font-light',
        )}
      >
        <div
          className={cn(
            baseWidth,
            // Responsive grid columns: smaller on mobile, medium tablet, larger desktop
            'grid grid-cols-[140px_auto] md:grid-cols-[180px_auto] lg:grid-cols-[240px_auto]',
          )}
        >
          <div className={'flex gap-3 md:gap-4 items-start justify-start'}>
            <NameCard variant={'small'} />
          </div>
          <div className={'flex flex-col gap-2 md:gap-2.5 lg:gap-3'}>
            <FooterSection headerKey={'language'}>
              <FooterLocaleSwitcher />
            </FooterSection>
            <FooterSection headerKey={'app_version'}>
              {`v${getAppVersion()}`}
            </FooterSection>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex justify-center py-2',
          // Responsive padding
          'px-4 md:px-5 lg:px-8',
          // Responsive text: 10px mobile, 11px tablet, 12px desktop
          'text-[10px] md:text-[11px] lg:text-xs',
          'bg-text-dark text-white',
        )}
      >
        <span className={cn(baseWidth)}>{t('footline')}</span>
      </div>
    </footer>
  );
}

const FooterSection = ({
  children,
  headerKey,
  containerClass,
  childContainerClass,
}: PropsWithChildren<{
  headerKey: string;
  containerClass?: ClassValue | string;
  childContainerClass?: ClassValue | string;
}>) => {
  const t = useTranslations('Footer');
  return (
    <div className={cn(containerClass)}>
      <h3>{t(headerKey)}</h3>
      <div className={cn(childContainerClass)}>{children}</div>
    </div>
  );
};
