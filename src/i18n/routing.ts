import { defineRouting } from 'next-intl/routing';

export const LOCALES = ['en', 'ko'];
export const DEFAULT_LOCALE = 'en';

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});
