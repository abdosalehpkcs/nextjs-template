'use client';

import { useTranslation } from 'react-i18next';

import type { LegalPageProps } from '../../lib/consent/types';

export function TermsOfServiceContent({ className = '' }: LegalPageProps) {
  const { t } = useTranslation();

  return (
    <div className={`legal-container ${className}`}>
      <h1 className="legal-title">{t('Legal.terms.title')}</h1>
      <p className="legal-meta">{t('Legal.terms.lastUpdated')}</p>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.terms.sections.acceptance.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.terms.sections.acceptance.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.terms.sections.useOfService.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.terms.sections.useOfService.content')}
        </p>
        <ul className="legal-list">
          <li>{t('Legal.terms.sections.useOfService.items.lawful')}</li>
          <li>{t('Legal.terms.sections.useOfService.items.noHarm')}</li>
          <li>{t('Legal.terms.sections.useOfService.items.noUnauthorized')}</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.terms.sections.intellectualProperty.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.terms.sections.intellectualProperty.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.terms.sections.disclaimer.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.terms.sections.disclaimer.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.terms.sections.limitation.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.terms.sections.limitation.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.terms.sections.changes.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.terms.sections.changes.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.terms.sections.contact.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.terms.sections.contact.content')}
        </p>
      </section>
    </div>
  );
}
