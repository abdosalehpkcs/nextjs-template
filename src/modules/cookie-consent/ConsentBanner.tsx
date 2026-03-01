'use client';

import { shouldShowBanner } from './controller';
import styles from './styles.module.css';
import type { ConsentBannerProps, ConsentLabels } from './types';
import { useConsent } from './useConsent';

const defaultLabels: ConsentLabels = {
  bannerTitle: 'Your privacy choices',
  bannerDescription:
    'We use functional cookies to keep this site running and optional cookies to improve your experience.',
  bannerManage: 'Manage',
  bannerAcceptAll: 'Accept all',
  bannerRejectAll: 'Reject all',
  modalTitle: 'Cookie preferences',
  modalDescription:
    'Select which cookies you want to allow. You can change these settings at any time.',
  modalSave: 'Save preferences',
  modalAcceptAll: 'Accept all',
  modalRejectAll: 'Reject all',
  functionalTitle: 'Functional',
  functionalDescription: 'Always on. Needed for core site functionality.',
  analyticsTitle: 'Analytics',
  analyticsDescription:
    'Helps us understand site usage to improve performance.',
  marketingTitle: 'Marketing',
  marketingDescription: 'Used to deliver more relevant content and ads.',
  alwaysOnLabel: 'Always on',
  privacyPolicyLink: 'Privacy policy',
};

export function ConsentBanner({
  className = '',
  style,
  labels,
  privacyPolicyUrl,
}: ConsentBannerProps) {
  const {
    preferences,
    isLoaded,
    isModalOpen,
    acceptAll,
    rejectAll,
    openModal,
  } = useConsent();
  const copy = { ...defaultLabels, ...labels };

  if (!isLoaded || isModalOpen || !shouldShowBanner(preferences)) {
    return null;
  }

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className={`${styles.bannerCard} ${className}`} style={style}>
        <div className={styles.bannerText}>
          <div id="cookie-consent-title" className={styles.bannerTitle}>
            {copy.bannerTitle}
          </div>
          <div
            id="cookie-consent-description"
            className={styles.bannerDescription}
          >
            {copy.bannerDescription}
            {privacyPolicyUrl ? (
              <>
                {' '}
                <a href={privacyPolicyUrl} className={styles.bannerLink}>
                  {copy.privacyPolicyLink}
                </a>
              </>
            ) : null}
          </div>
        </div>
        <div className={styles.bannerActions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={openModal}
          >
            {copy.bannerManage}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={rejectAll}
          >
            {copy.bannerRejectAll}
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={acceptAll}
          >
            {copy.bannerAcceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
