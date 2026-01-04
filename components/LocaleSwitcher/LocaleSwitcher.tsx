'use client';

import { useClickOutside } from '@/app/hooks';
import {
  useLangNames,
  LocaleIconMap,
  LOCALES,
  useRouter,
  usePathname,
} from '@/i18n';
import Translate from '@mui/icons-material/Translate';
import { useLocale } from 'next-intl';
import { useRef, useState, useCallback, KeyboardEvent } from 'react';

export default function LocaleSwitcher() {
  const switchRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const localeNames = useLangNames(locale);

  const [expanded, setExpanded] = useState(false);
  useClickOutside(switchRef, () => {
    setExpanded(false);
  });

  const onSwitchLocale = useCallback(
    (newLocale: string) => {
      router.replace(pathname, { locale: newLocale });
      setExpanded(false);
    },
    [router, pathname],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, newLocale: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSwitchLocale(newLocale);
      } else if (e.key === 'Escape') {
        setExpanded(false);
      }
    },
    [onSwitchLocale],
  );

  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <div ref={switchRef} className={'relative flex gap-1 text-text-dark z-50'}>
      <button
        className={
          'cursor-pointer hover:scale-105 hover:text-pastel-green-hover'
        }
        aria-expanded={expanded}
        aria-haspopup={'listbox'}
        aria-label={'Language Selection'}
        onClick={handleToggle}
      >
        <Translate />
      </button>
      <div className={'flex gap-1 items-center'} aria-hidden="true">
        <span className={LocaleIconMap[locale]}></span>
        <span className="text-xs pr-2">{localeNames.of(locale)}</span>
      </div>
      {expanded && (
        <div
          role={'listbox'}
          aria-label={'Select language'}
          className={
            'absolute flex flex-col w-25 gap-1 top-9 max-sm:top-7 right-[50%] translate-x-[50%] bg-white p-2 rounded-md text-sm shadow-lg border border-gray-200'
          }
        >
          {LOCALES.map((localeOption) => {
            const isSelected = localeOption === locale;
            return (
              <button
                key={`locale-${localeOption}`}
                role={'option'}
                aria-selected={isSelected}
                className={`cursor-pointer flex justify-between items-center gap-1 px-2 py-1 rounded hover:bg-pastel-green/20 transition-colors ${
                  isSelected ? 'bg-pastel-green/10 font-semibold' : ''
                }`}
                onClick={() => onSwitchLocale(localeOption)}
                onKeyDown={(e) => handleKeyDown(e, localeOption)}
              >
                <span className={LocaleIconMap[localeOption]}></span>
                <span className="text-xs pr-2">
                  {localeNames.of(localeOption)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
