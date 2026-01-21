import { baseWidth } from '@/app/styles';
import { cn } from '@/app/utils';
import LocaleSwitcher from './LocaleSwitcher/LocaleSwitcher';

export default function Header() {
  return (
    <header
      className={
        'h-12 max-sm:h-8 flex justify-center items-center px-8 max-sm:px-4 text-white'
      }
    >
      <div className={cn(baseWidth, 'flex justify-between items-center')}>
        <div className={'flex gap-1 items-center'}>
          <h3 className="font-black max-sm:text-sm italic">{'STEPHEN KO'}</h3>
        </div>
        <div className={'flex items-center'}>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
