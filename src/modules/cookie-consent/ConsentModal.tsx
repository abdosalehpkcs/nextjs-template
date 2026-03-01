'use client';

import type { MouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import styles from './styles.module.css';
import type { ConsentLabels, ConsentModalProps } from './types';
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

type DraftPreferences = {
  analytics: boolean;
  marketing: boolean;
};

export function ConsentModal({
  className = '',
  style,
  labels,
  privacyPolicyUrl,
}: ConsentModalProps) {
  const {
    preferences,
    isLoaded,
    isModalOpen,
    closeModal,
    save,
    acceptAll,
    rejectAll,
  } = useConsent();
  const copy = useMemo(() => ({ ...defaultLabels, ...labels }), [labels]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<DraftPreferences>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (!isModalOpen) return;

    setDraft({
      analytics: preferences?.analytics ?? false,
      marketing: preferences?.marketing ?? false,
    });
  }, [isModalOpen, preferences?.analytics, preferences?.marketing]);

  useEffect(() => {
    if (!isModalOpen) return;
    const modal = modalRef.current;
    if (!modal) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(
      modal.querySelectorAll<HTMLElement>(focusableSelectors),
    );
    const first = focusable[0] ?? modal;
    const last = focusable[focusable.length - 1] ?? modal;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== 'Tab') return;
      if (focusable.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    modal.addEventListener('keydown', handleKeyDown);
    first.focus();

    return () => {
      modal.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal, isModalOpen]);

  if (!isLoaded || !isModalOpen) {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className={`${styles.modalCard} ${className}`}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
        aria-describedby="cookie-preferences-description"
        tabIndex={-1}
      >
        <div className={styles.modalHeader}>
          <div id="cookie-preferences-title" className={styles.modalTitle}>
            {copy.modalTitle}
          </div>
          <div
            id="cookie-preferences-description"
            className={styles.modalDescription}
          >
            {copy.modalDescription}
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

        <div className={styles.modalBody}>
          <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
              <div className={styles.toggleTitleRow}>
                <span className={styles.toggleTitle}>
                  {copy.functionalTitle}
                </span>
                <span className={styles.toggleTag}>{copy.alwaysOnLabel}</span>
              </div>
              <p className={styles.toggleDescription}>
                {copy.functionalDescription}
              </p>
            </div>
            <div className={styles.toggleControl}>
              <input
                type="checkbox"
                className={styles.toggleInput}
                checked
                disabled
                aria-label={copy.alwaysOnLabel}
              />
              <span className={styles.toggleTrack} aria-hidden="true">
                <span className={styles.toggleThumb} />
              </span>
            </div>
          </div>

          <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
              <div className={styles.toggleTitleRow}>
                <span className={styles.toggleTitle}>
                  {copy.analyticsTitle}
                </span>
              </div>
              <p className={styles.toggleDescription}>
                {copy.analyticsDescription}
              </p>
            </div>
            <div className={styles.toggleControl}>
              <input
                type="checkbox"
                className={styles.toggleInput}
                checked={draft.analytics}
                onChange={event =>
                  setDraft(current => ({
                    ...current,
                    analytics: event.target.checked,
                  }))
                }
                aria-label={copy.analyticsTitle}
              />
              <span className={styles.toggleTrack} aria-hidden="true">
                <span className={styles.toggleThumb} />
              </span>
            </div>
          </div>

          <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
              <div className={styles.toggleTitleRow}>
                <span className={styles.toggleTitle}>
                  {copy.marketingTitle}
                </span>
              </div>
              <p className={styles.toggleDescription}>
                {copy.marketingDescription}
              </p>
            </div>
            <div className={styles.toggleControl}>
              <input
                type="checkbox"
                className={styles.toggleInput}
                checked={draft.marketing}
                onChange={event =>
                  setDraft(current => ({
                    ...current,
                    marketing: event.target.checked,
                  }))
                }
                aria-label={copy.marketingTitle}
              />
              <span className={styles.toggleTrack} aria-hidden="true">
                <span className={styles.toggleThumb} />
              </span>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() =>
              save({
                functional: true,
                analytics: draft.analytics,
                marketing: draft.marketing,
              })
            }
          >
            {copy.modalSave}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={rejectAll}
          >
            {copy.modalRejectAll}
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={acceptAll}
          >
            {copy.modalAcceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
