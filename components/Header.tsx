import { Activity } from 'react';

export default function Header() {
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;
  return (
    <header
      className={
        'h-12 max-sm:h-8 flex justify-center items-center px-8 max-sm:px-4 bg-white text-text-dark border-b-2 border-b-text-dark'
      }
    >
      <div className={'flex lg:max-w-360 w-full justify-between items-center'}>
        <h3 className={'font-black max-sm:text-sm'}>{'Stephen Ko'}</h3>
        <Activity mode={appVersion ? 'visible' : 'hidden'}>
          <span className={'text-xs font-light'}>{`v${appVersion}`}</span>
        </Activity>
      </div>
    </header>
  );
}
