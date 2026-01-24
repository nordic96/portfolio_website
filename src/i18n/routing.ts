import { defineRouting } from 'next-intl/routing';

export const LOCALES = ['en', 'ko', 'nl', 'zh', 'ja', 'de'];
export const DEFAULT_LOCALE = 'en';

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});
