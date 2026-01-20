import type { Metadata } from 'next';
import { Poppins, Roboto } from 'next/font/google';

import '../globals.css';
import '@/node_modules/flag-icons/css/flag-icons.min.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { StarField } from '@/components/StarField';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

// Poppins for headings (Bold Italic)
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  display: 'swap',
});

// Roboto for body text (Normal/Light)
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Stephen Ko - Software Engineer',
  description:
    'Portfolio of Stephen Ko, a software engineer based in Singapore specializing in modern web technologies.',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  //Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${poppins.variable} ${roboto.variable} antialiased`}>
        {/* StarField background - renders behind all content */}
        <StarField starCount={150} />
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
