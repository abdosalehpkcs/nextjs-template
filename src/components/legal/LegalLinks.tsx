'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { useConsent } from '../../lib/consent/context';
import type { LegalLinksProps } from '../../lib/consent/types';

export function LegalLinks({
  className = '',
  showCookiePreferences = true,
  variant = 'inline',
}: LegalLinksProps) {
  const { t } = useTranslation();
  const { setShowPreferences } = useConsent();

  const variantClass =
    variant === 'stacked' ? 'legal-links--stacked' : 'legal-links--inline';

  return (
    <nav
      className={`legal-links ${variantClass} ${className}`}
      aria-label={t('Legal.links.ariaLabel')}
    >
      <Link href="/terms" className="legal-links__item">
        {t('Legal.links.terms')}
      </Link>
      <Link href="/privacy" className="legal-links__item">
        {t('Legal.links.privacy')}
      </Link>
      <Link href="/cookies" className="legal-links__item">
        {t('Legal.links.cookies')}
      </Link>
      {showCookiePreferences && (
        <button
          type="button"
          onClick={() => setShowPreferences(true)}
          className="legal-links__item legal-links__button"
          aria-label={t('Legal.links.cookiePreferencesAriaLabel')}
        >
          {t('Legal.links.cookiePreferences')}
        </button>
      )}
    </nav>
  );
}
