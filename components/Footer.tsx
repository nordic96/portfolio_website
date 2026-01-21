import { baseWidth } from '@/app/styles';
import { cn } from '@/app/utils';
import { useTranslations } from 'next-intl';

import FooterLocaleSwitcher from './FooterLocaleSwitcher/FooterLocaleSwitcher';
import { PropsWithChildren } from 'react';
import { ClassValue } from 'clsx';
import { getAppVersion } from '@/app/config';
import NameCard from './NameCard';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className={'flex flex-col mt-40 max-sm:mt-20 md:mt-30'}>
      <div
        className={
          'flex flex-col justify-start items-center border-t border-t-text-dark px-8 max-sm:px-4 pt-4 pb-8 text-sm font-light'
        }
      >
        <div className={cn(baseWidth, 'grid grid-cols-3 max-sm:text-xs')}>
          <div className={'flex gap-4 items-start justify-starts'}>
            <NameCard variant={'small'} />
          </div>
          <FooterSection headerKey={'language'}>
            <FooterLocaleSwitcher />
          </FooterSection>
          <FooterSection headerKey={'app_version'}>
            {`v${getAppVersion()}`}
          </FooterSection>
        </div>
      </div>
      <div
        className={
          'flex justify-center px-8 max-sm:px-4 py-2 text-xs bg-text-dark text-white'
        }
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
