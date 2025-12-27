import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../../i18n';
import '@/styles/globals.css';

const siteUrl = 'https://ela-gabriel-wedding.vercel.app';

export const metadata: Metadata = {
  title: 'Ela & Gabriel - Wedding 2025',
  description: 'Join us to celebrate our love in Israel - July 2025. Civil ceremony in France, Huppa in Jaffa by the Mediterranean Sea.',
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Ela & Gabriel - Wedding 2025',
    description: 'Join us to celebrate our love in Israel - July 2025',
    url: siteUrl,
    siteName: 'Ela & Gabriel Wedding',
    images: [
      {
        url: '/engagement.jpg',
        width: 1200,
        height: 630,
        alt: 'Ela & Gabriel - Save the Date',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ela & Gabriel - Wedding 2025',
    description: 'Join us to celebrate our love in Israel - July 2025',
    images: ['/engagement.jpg'],
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const isRTL = locale === 'he';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-base-100 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
