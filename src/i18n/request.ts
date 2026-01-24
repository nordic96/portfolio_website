import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { CDN_BASE } from '../config';

/**
 * Will fetch locale json file from CDN, if error or not found, will return backup defualt en locale file (/messages/en.json)
 * @param locale locale requested in code (i.e. en, ko, ja)
 * @returns Locale File JSON
 */
export async function geti18nConfig(locale: string) {
  const cdnUrl = new URL(`${CDN_BASE}/resources/messages/${locale}.json`);
  let messages;
  try {
    const res = await fetch(cdnUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      messages = await res.json();
    } else {
      throw new Error(
        `error while fetching locale from CDN ${cdnUrl.toString()}`,
      );
    }
  } catch (e) {
    console.error(e);
    messages = (await import('@/messages/en.json')).default;
  }

  return {
    locale,
    messages,
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const { messages } = await geti18nConfig(locale);

  return {
    locale,
    messages: messages,
  };
});
