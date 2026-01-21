import { baseWidth } from '@/app/styles';
import { cn } from '@/app/utils';
import LocaleSwitcher from './LocaleSwitcher/LocaleSwitcher';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <header
      className={
        'h-12 max-sm:h-8 flex justify-center items-center px-8 max-sm:px-4 text-white mb-10 max-sm:mb-5'
      }
      role="banner"
    >
      <div className={cn(baseWidth, 'flex justify-between items-center')}>
        <div className={'flex gap-1 items-center'}>
          <Link
            href="/"
            className="font-black max-sm:text-sm italic hover:text-pastel-green-hover transition-colors"
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
