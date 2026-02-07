'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CONSENT_CATEGORIES } from '../../lib/consent/constants';
import { useConsent } from '../../lib/consent/context';

export function CookiePreferencesModal() {
  const { t } = useTranslation();
  const {
    consent,
    showPreferences,
    setShowPreferences,
    savePreferences,
    acceptAll,
  } = useConsent();

  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync local state with consent state when modal opens
  useEffect(() => {
    if (showPreferences) {
      setAnalytics(consent?.analytics ?? false);
    }
  }, [showPreferences, consent?.analytics]);

  const handleSave = useCallback(() => {
    savePreferences({ analytics });
  }, [analytics, savePreferences]);

  const handleAcceptAll = useCallback(() => {
    acceptAll();
    setShowPreferences(false);
  }, [acceptAll, setShowPreferences]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowPreferences(false);
      }
    },
    [setShowPreferences],
  );

  return (
    <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
      <DialogContent
        ref={modalRef}
        onKeyDown={handleKeyDown}
        className="consent-modal"
      >
        <DialogHeader className="consent-modal__header">
          <DialogTitle className="consent-modal__title">
            {t('Consent.preferences.title')}
          </DialogTitle>
          <DialogDescription className="consent-modal__description">
            {t('Consent.preferences.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="consent-modal__body">
          {/* Necessary Cookies - Always On */}
          <div className="consent-toggle">
            <div className="consent-toggle__info">
              <label className="consent-toggle__label">
                {t(CONSENT_CATEGORIES.necessary.i18nKey + '.title')}
              </label>
              <p className="consent-toggle__description">
                {t(CONSENT_CATEGORIES.necessary.i18nKey + '.description')}
              </p>
            </div>
            <div className="consent-toggle__control">
              <button
                type="button"
                role="switch"
                aria-checked="true"
                disabled
                className="consent-toggle__switch consent-toggle__switch--on consent-toggle__switch--disabled"
                aria-label={t('Consent.preferences.alwaysOn')}
              >
                <span className="consent-toggle__thumb" />
              </button>
              <span className="consent-toggle__status">
                {t('Consent.preferences.alwaysOn')}
              </span>
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="consent-toggle">
            <div className="consent-toggle__info">
              <label
                htmlFor="analytics-toggle"
                className="consent-toggle__label"
              >
                {t(CONSENT_CATEGORIES.analytics.i18nKey + '.title')}
              </label>
              <p className="consent-toggle__description">
                {t(CONSENT_CATEGORIES.analytics.i18nKey + '.description')}
              </p>
            </div>
            <div className="consent-toggle__control">
              <button
                id="analytics-toggle"
                type="button"
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics(!analytics)}
                className={`consent-toggle__switch ${analytics ? 'consent-toggle__switch--on' : 'consent-toggle__switch--off'}`}
                aria-label={
                  analytics
                    ? t('Consent.preferences.disable')
                    : t('Consent.preferences.enable')
                }
              >
                <span className="consent-toggle__thumb" />
              </button>
            </div>
          </div>
        </div>

        <DialogFooter className="consent-modal__footer">
          <Button
            variant="outline"
            onClick={handleSave}
            className="consent-actions__button consent-actions__button--secondary"
          >
            {t('Consent.preferences.savePreferences')}
          </Button>
          <Button
            onClick={handleAcceptAll}
            className="consent-actions__button consent-actions__button--primary"
          >
            {t('Consent.actions.accept')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
