'use client';

import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { type Locale } from '@/i18n/config';

type LangSwitcherProps = {
  className?: ComponentProps<typeof Button>['className'];
};

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language as Locale;

  const localeOrder: Locale[] = ['en', 'ar', 'nl'];
  const localeLabels: Record<Locale, string> = {
    en: 'EN',
    ar: 'AR',
    nl: 'NL',
  };

  const switchLanguage = () => {
    const currentIndex = localeOrder.indexOf(currentLocale);
    const nextIndex = (currentIndex + 1) % localeOrder.length;
    const newLocale = localeOrder[nextIndex];

    i18n.changeLanguage(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;

    // Set RTL for Arabic
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={className}
      onClick={switchLanguage}
      aria-label="Switch language"
    >
      {localeLabels[currentLocale] || 'EN'}
    </Button>
  );
};
