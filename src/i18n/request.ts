import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export async function geti18nConfig(locale: string) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
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
