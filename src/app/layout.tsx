import '@/styles/globals.css';

import type { Metadata } from 'next';

import { LangSwitcher } from '@/components/lang-switcher';
import {
  AnalyticsProvider,
  CookieConsentBanner,
  CookiePreferencesModal,
  LegalLinks,
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
      <body className={cn('min-h-screen font-sans', fonts)}>
        <I18nProvider>
          <ThemeProvider attribute="class">
            <ConsentProvider>
              <AnalyticsProvider
                googleAnalyticsId={env.GOOGLE_SITE_ANALYTICS_ID}
              >
                {children}
                {/* Footer with Legal Links */}
                <footer className="border-border bg-background border-t px-4 py-6">
                  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-muted-foreground text-sm">
                      © {new Date().getFullYear()} {siteConfig.title}
                    </p>
                    <LegalLinks />
                  </div>
                </footer>
                {/* Cookie Consent Banner */}
                <CookieConsentBanner position="bottom" />
                {/* Cookie Preferences Modal */}
                <CookiePreferencesModal />
              </AnalyticsProvider>
            </ConsentProvider>
            <LangSwitcher className="absolute right-5 bottom-16 z-10" />
            <ThemeSwitcher className="absolute right-5 bottom-5 z-10" />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
