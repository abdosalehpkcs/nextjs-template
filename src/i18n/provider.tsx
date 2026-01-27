'use client';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { defaultLocale, locales } from './config';
import { getI18nOptions } from './settings';

// Track initialization state
let isInitialized = false;

// Initialize i18next only once
function initializeI18next() {
  if (isInitialized) return;

  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
      resourcesToBackend(
        (language: string) => import(`../../messages/${language}.json`),
      ),
    )
    .init({
      ...getI18nOptions(defaultLocale),
      fallbackLng: defaultLocale,
      detection: {
        order: ['cookie', 'navigator'],
        caches: ['cookie'],
        lookupCookie: 'NEXT_LOCALE',
      },
      preload: locales,
      react: {
        useSuspense: false,
      },
    });

  isInitialized = true;
}

type I18nProviderProps = {
  children: ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  const [isReady, setIsReady] = useState(isInitialized);

  useEffect(() => {
    initializeI18next();
    setIsReady(true);

    // Update html lang attribute when language changes
    const updateHtmlLang = (lng: string) => {
      document.documentElement.lang = lng;
    };

    i18next.on('languageChanged', updateHtmlLang);
    return () => {
      i18next.off('languageChanged', updateHtmlLang);
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
