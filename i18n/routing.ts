import { defineRouting } from 'next-intl/routing';

const LOCALES = ['en'];
const DEFAULT_LOCALE = 'en';

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});
