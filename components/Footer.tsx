import { baseWidth } from '@/app/styles';
import { cn } from '@/app/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className={'flex flex-col mt-40 max-sm:mt-20 md:mt-30'}>
      <div
        className={
          'flex flex-col justify-center items-center border-t border-t-text-dark px-8 max-sm:px-4 pt-4 pb-8 text-sm font-light'
        }
      >
        <div className={cn(baseWidth, 'grid grid-cols-3 max-sm:text-xs')}>
          <div>
            <Image
              alt={'brand_logo'}
              src={'/assets/sk_logo.svg'}
              width={120}
              height={50}
            />
            <div></div>
          </div>
          <div>
            <span></span>
          </div>
          <div>
            <span></span>
          </div>
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
