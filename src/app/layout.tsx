import '@/app/globals.css';

import type { Metadata } from 'next';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LangSwitcher } from '@/components/lang-switcher';
import {
  AnalyticsProvider,
  CookieConsentBanner,
  CookiePreferencesModal,
} from '@/components/legal';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { env } from '@/env';
import { I18nProvider } from '@/i18n/provider';
import { ConsentProvider } from '@/lib/consent';
import { fonts } from '@/lib/fonts';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
  },
  verification: {
    google: env.GOOGLE_SITE_VERIFICATION_ID || '',
  },
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: '/opengraph-image.jpg',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: '/opengraph-image.jpg',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('flex min-h-screen flex-col font-sans', fonts)}>
        <I18nProvider>
          <ThemeProvider attribute="class">
            <ConsentProvider>
              <AnalyticsProvider
                googleAnalyticsId={env.GOOGLE_SITE_ANALYTICS_ID}
              >
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <CookieConsentBanner position="bottom" />
                <CookiePreferencesModal />
              </AnalyticsProvider>
            </ConsentProvider>
            <LangSwitcher className="fixed bottom-16 right-5 z-10" />
            <ThemeSwitcher className="fixed bottom-5 right-5 z-10" />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
