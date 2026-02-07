'use client';

import { useTranslation } from 'react-i18next';

import type { LegalPageProps } from '../../lib/consent/types';

export function PrivacyPolicyContent({ className = '' }: LegalPageProps) {
  const { t } = useTranslation();

  return (
    <div className={`legal-container ${className}`}>
      <h1 className="legal-title">{t('Legal.privacy.title')}</h1>
      <p className="legal-meta">{t('Legal.privacy.lastUpdated')}</p>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.privacy.sections.introduction.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.privacy.sections.introduction.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.privacy.sections.dataCollection.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.privacy.sections.dataCollection.content')}
        </p>
        <ul className="legal-list">
          <li>{t('Legal.privacy.sections.dataCollection.items.usage')}</li>
          <li>{t('Legal.privacy.sections.dataCollection.items.device')}</li>
          <li>{t('Legal.privacy.sections.dataCollection.items.cookies')}</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.privacy.sections.dataUse.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.privacy.sections.dataUse.content')}
        </p>
        <ul className="legal-list">
          <li>{t('Legal.privacy.sections.dataUse.items.provide')}</li>
          <li>{t('Legal.privacy.sections.dataUse.items.improve')}</li>
          <li>{t('Legal.privacy.sections.dataUse.items.communicate')}</li>
          <li>{t('Legal.privacy.sections.dataUse.items.analytics')}</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.privacy.sections.dataSharing.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.privacy.sections.dataSharing.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.privacy.sections.dataSecurity.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.privacy.sections.dataSecurity.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.privacy.sections.yourRights.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.privacy.sections.yourRights.content')}
        </p>
        <ul className="legal-list">
          <li>{t('Legal.privacy.sections.yourRights.items.access')}</li>
          <li>{t('Legal.privacy.sections.yourRights.items.correction')}</li>
          <li>{t('Legal.privacy.sections.yourRights.items.deletion')}</li>
          <li>{t('Legal.privacy.sections.yourRights.items.optOut')}</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.privacy.sections.changes.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.privacy.sections.changes.content')}
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          {t('Legal.privacy.sections.contact.title')}
        </h2>
        <p className="legal-text">
          {t('Legal.privacy.sections.contact.content')}
        </p>
      </section>
    </div>
  );
}
