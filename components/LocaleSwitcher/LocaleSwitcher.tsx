'use client';

import { useClickOutside } from '@/app/hooks';
import { useLangNames, LocaleIconMap, LOCALES } from '@/i18n';
import Translate from '@mui/icons-material/Translate';
import { useLocale } from 'next-intl';
import { Activity, useRef, useState } from 'react';

export default function LocaleSwitcher() {
  const switchRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const localeNames = useLangNames(locale);

  const [expanded, setExpanded] = useState(false);
  useClickOutside(switchRef, () => {
    setExpanded(false);
  });

  return (
    <div ref={switchRef} className={'relative flex gap-1 text-text-dark z-50'}>
      <button
        className={
          'cursor-pointer hover:scale-105 hover:text-pastel-green-hover'
        }
        aria-expanded={expanded}
        aria-haspopup={'menu'}
        aria-label={'Language Selection'}
        onClick={() => setExpanded(true)}
      >
        <Translate />
      </button>
      <div className={'flex gap-1 items-center'}>
        <span className={LocaleIconMap[locale]}></span>
        <span className="text-xs pr-2">{localeNames.of(locale)}</span>
      </div>
      <Activity mode={expanded ? 'visible' : 'hidden'}>
        <div
          role={'menu'}
          aria-label={'locale options'}
          className={
            'absolute flex flex-col w-25 gap-1 top-9 right-[50%] translate-x-[50%] bg-white p-2 rounded-md text-sm'
          }
        >
          {LOCALES.map((locale, key) => {
            return (
              <div
                key={`locale-${key}-${locale}`}
                className={
                  'cursor-pointer flex justify-between items-center gap-1'
                }
              >
                <span className={LocaleIconMap[locale]}></span>
                <span className="text-xs pr-2">{localeNames.of(locale)}</span>
              </div>
            );
          })}
        </div>
      </Activity>
    </div>
  );
}
