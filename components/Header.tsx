import { baseWidth } from '@/app/styles';
import { cn } from '@/app/utils';
import Image from 'next/image';
import LocaleSwitcher from './LocaleSwitcher/LocaleSwitcher';

export default function Header() {
  return (
    <header
      className={
        'h-12 max-sm:h-8 flex justify-center items-center px-8 max-sm:px-4 ext-text-dark border-b-2 border-b-text-dark'
      }
    >
      <div className={cn(baseWidth, 'flex justify-between items-center')}>
        <div className={'flex gap-1 items-center'}>
          <div className={'max-sm:w-7'}>
            <Image
              alt={'brand_logo'}
              src={'/assets/sk_logo_only.svg'}
              width={50}
              height={50}
            />
          </div>
          <h3 className="font-black max-sm:text-sm italic">{'STEPHEN KO'}</h3>
        </div>
        <div className={'flex items-center'}>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
