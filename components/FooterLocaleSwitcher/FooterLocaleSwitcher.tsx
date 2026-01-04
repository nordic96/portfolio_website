'use client';

import { LOCALES, useLangNames } from '@/i18n';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function FooterLocaleSwitcher() {
  const currentLocale = useLocale();
  const localeNames = useLangNames(currentLocale);

  const pathname = usePathname();
  const router = useRouter();

  const onChangeLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    router.replace(pathname, { locale: e.target.value });
  };

  return (
    <select
      className="border border-[#333] py-1 w-30 mt-1"
      value={currentLocale}
      onChange={onChangeLocale}
      aria-label="Select language"
    >
      {LOCALES.map((locale, id) => (
        <option value={locale} key={id}>
          {localeNames.of(locale)}
        </option>
      ))}
    </select>
  );
}
