import type { InitOptions } from 'i18next';

import { defaultLocale, locales } from './config';

export function getI18nOptions(
  lng: string = defaultLocale,
  ns: string | string[] = 'translation',
): InitOptions {
  return {
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    lng,
    fallbackNS: 'translation',
    defaultNS: 'translation',
    ns,
  };
}
