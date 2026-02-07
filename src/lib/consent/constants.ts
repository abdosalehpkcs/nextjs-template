/**
 * Consent Management Constants
 * @module consent/constants
 */

export const CONSENT_STORAGE_KEY = 'cookie_consent_v1';
export const CONSENT_VERSION = '1.0.0';

export const DEFAULT_CONSENT_STATE = {
  necessary: true, // Always true
  analytics: false,
  timestamp: 0,
  version: CONSENT_VERSION,
};

export const CONSENT_CATEGORIES = {
  necessary: {
    id: 'necessary',
    required: true,
    i18nKey: 'Consent.categories.necessary',
  },
  analytics: {
    id: 'analytics',
    required: false,
    i18nKey: 'Consent.categories.analytics',
  },
} as const;
