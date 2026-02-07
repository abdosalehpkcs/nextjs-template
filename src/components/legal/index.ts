/**
 * Legal Components Module
 * @module components/legal
 *
 * This module provides reusable legal and consent management components.
 * It includes cookie consent banners, preference modals, legal page content,
 * and analytics integration with Google Analytics.
 *
 * To reuse in another project:
 * 1. Copy `src/components/legal/` and `src/lib/consent/` folders
 * 2. Copy `src/lib/analytics/` folder for analytics integration
 * 3. Copy the legal styles from `globals.css` (or add to your own global styles)
 * 4. Add the i18n keys from messages/*.json to your translation files
 * 5. Set GOOGLE_SITE_ANALYTICS_ID in your environment
 * 6. Import and use components in your layout
 */

// Consent Components
export { CookieConsentBanner } from './CookieConsentBanner';
export { CookiePreferencesModal } from './CookiePreferencesModal';

// Analytics - Re-export from the new analytics module
export {
  AnalyticsProvider,
  hasAnalyticsConsent,
  trackEvent,
  useTrackEvent,
} from '../../lib/analytics';

// Legal Page Content
export { CookiePolicyContent } from './CookiePolicyContent';
export { PrivacyPolicyContent } from './PrivacyPolicyContent';
export { TermsOfServiceContent } from './TermsOfServiceContent';

// Legal Links
export { LegalLinks } from './LegalLinks';

// Re-export consent context and types
export type {
  AnalyticsProviderProps,
  ConsentBannerProps,
  ConsentCategory,
  ConsentContextValue,
  ConsentPreferencesModalProps,
  ConsentState,
  LegalLinksProps,
  LegalPageProps,
} from '../../lib/consent';
export {
  CONSENT_CATEGORIES,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  ConsentProvider,
  useConsent,
} from '../../lib/consent';
