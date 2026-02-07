'use client';

import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

import { useConsent } from '../../lib/consent/context';
import type { LegalPageProps } from '../../lib/consent/types';

export function CookiePolicyContent({ className = '' }: LegalPageProps) {
  const { t } = useTranslation();
  const { setShowPreferences } = useConsent();

  return (
    <div className={`legal-container ${className}`}>
      <h1 className="legal-title">{t('Legal.cookies.title')}</h1>
      <p className="legal-meta">{t('Legal.cookies.lastUpdated')}</p>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.cookies.sections.whatAreCookies.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.cookies.sections.whatAreCookies.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.cookies.sections.howWeUse.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.cookies.sections.howWeUse.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.cookies.sections.types.title')}
        </h2>

        <div className="legal-subsection">
          <h3 className="legal-subheading">
            {t('Legal.cookies.sections.types.necessary.title')}
          </h3>
          <p className="legal-text">
            {t('Legal.cookies.sections.types.necessary.content')}
          </p>
        </div>

        <div className="legal-subsection">
          <h3 className="legal-subheading">
            {t('Legal.cookies.sections.types.analytics.title')}
          </h3>
          <p className="legal-text">
            {t('Legal.cookies.sections.types.analytics.content')}
          </p>
        </div>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.cookies.sections.thirdParty.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.cookies.sections.thirdParty.content')}
        </p>
        <ul className="legal-list">
          <li>
            <strong>Google Analytics:</strong>{' '}
            {t('Legal.cookies.sections.thirdParty.googleAnalytics')}
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.cookies.sections.manage.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.cookies.sections.manage.content')}
        </p>
        <div className="legal-cta">
          <Button
            onClick={() => setShowPreferences(true)}
            className="consent-actions__button consent-actions__button--primary"
          >
            {t('Legal.cookies.sections.manage.button')}
          </Button>
        </div>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.cookies.sections.browserSettings.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.cookies.sections.browserSettings.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.cookies.sections.changes.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.cookies.sections.changes.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.cookies.sections.contact.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.cookies.sections.contact.content')}
        </p>
      </section>
    </div>
  );
}
