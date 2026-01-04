import { baseWidth } from '@/app/styles';
import { cn } from '@/app/utils';
import Image from 'next/image';
import { Activity } from 'react';

export default function Header() {
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;
  return (
    <header
      className={
        'h-12 max-sm:h-8 flex justify-center items-center px-8 max-sm:px-4 bg-white text-text-dark border-b-2 border-b-text-dark'
      }
    >
      <div className={cn(baseWidth, 'flex justify-between items-center')}>
        <div className={'flex gap-1 items-center'}>
          <Image
            alt={'brand_logo'}
            src={'/assets/sk_logo_only.svg'}
            width={50}
            height={50}
          />
          <h3 className="font-black italic">{'STEPHEN KO'}</h3>
        </div>
        <Activity mode={appVersion ? 'visible' : 'hidden'}>
          <span className={'text-xs font-light'}>{`v${appVersion}`}</span>
        </Activity>
      </div>
    </header>
  );
}
