'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

import { useConsent } from '../../lib/consent/context';
import type { ConsentBannerProps } from '../../lib/consent/types';

export function CookieConsentBanner({
  className = '',
  position = 'bottom',
}: ConsentBannerProps) {
  const { t } = useTranslation();
  const {
    isLoaded,
    showBanner,
    acceptAll,
    rejectNonEssential,
    setShowPreferences,
  } = useConsent();
  const bannerRef = useRef<HTMLDivElement>(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (showBanner && bannerRef.current) {
      const currentBanner = bannerRef.current;
      const focusableElements = currentBanner.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      currentBanner.addEventListener('keydown', handleKeyDown);
      firstElement?.focus();

      return () => {
        currentBanner.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showBanner]);

  if (!isLoaded || !showBanner) {
    return null;
  }

  const positionClasses =
    position === 'bottom' ? 'consent-banner--bottom' : 'consent-banner--top';

  return (
    <div
      ref={bannerRef}
      className={`consent-banner ${positionClasses} ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-banner-title"
      aria-describedby="consent-banner-description"
    >
      <div className="consent-banner__content">
        <div className="consent-banner__text">
          <h2 id="consent-banner-title" className="consent-banner__title">
            {t('Consent.banner.title')}
          </h2>
          <p
            id="consent-banner-description"
            className="consent-banner__description"
          >
            {t('Consent.banner.description')}{' '}
            <Link href="/cookies" className="consent-banner__link">
              {t('Consent.banner.learnMore')}
            </Link>
          </p>
        </div>
        <div className="consent-actions">
          <Button
            variant="outline"
            onClick={() => setShowPreferences(true)}
            className="consent-actions__button consent-actions__button--secondary"
            aria-label={t('Consent.actions.manageAriaLabel')}
          >
            {t('Consent.actions.manage')}
          </Button>
          <Button
            variant="outline"
            onClick={rejectNonEssential}
            className="consent-actions__button consent-actions__button--secondary"
            aria-label={t('Consent.actions.rejectAriaLabel')}
          >
            {t('Consent.actions.reject')}
          </Button>
          <Button
            onClick={acceptAll}
            className="consent-actions__button consent-actions__button--primary"
            aria-label={t('Consent.actions.acceptAriaLabel')}
          >
            {t('Consent.actions.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
}
