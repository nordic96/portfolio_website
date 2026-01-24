import { baseWidth } from '@/src/styles';
import { cn } from '@/src/utils';
import LocaleSwitcher from './LocaleSwitcher/LocaleSwitcher';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <header
      className={cn(
        // Base height with responsive sizing: 32px mobile, 40px tablet, 48px desktop
        'h-8 md:h-10 lg:h-12',
        'flex justify-center items-center',
        // Responsive horizontal padding: 16px mobile, 24px tablet, 32px desktop
        'px-4 md:px-6 lg:px-8',
        'text-white',
        // Responsive bottom margin: 20px mobile, 32px tablet, 40px desktop
        'mb-5 md:mb-8 lg:mb-10',
      )}
      role="banner"
    >
      <div className={cn(baseWidth, 'flex justify-between items-center')}>
        <div className={'flex gap-1 items-center'}>
          <Link
            href="/"
            className={cn(
              'font-black italic',
              // Responsive font size: 14px mobile, 15px tablet, 16px desktop
              'text-sm md:text-[0.9375rem] lg:text-base',
              'hover:text-pastel-green-hover transition-colors',
            )}
            aria-label={t('home_link_label')}
          >
            {t('site_title')}
          </Link>
        </div>
        <nav aria-label={t('navigation_label')}>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
