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

  const switchLanguage = () => {
    const newLocale: Locale = currentLocale === 'en' ? 'de' : 'en';

    // Change language client-side (instant, no reload)
    i18n.changeLanguage(newLocale);

    // Store preference in cookie
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={className}
      onClick={switchLanguage}
    >
      {currentLocale === 'en' ? 'DE' : 'EN'}
    </Button>
  );
};
