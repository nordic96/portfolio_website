import { DEFAULT_LOCALE } from './routing';

export function useLangNames(locale?: string) {
  return new Intl.DisplayNames([locale ?? DEFAULT_LOCALE], {
    type: 'language',
  });
}
