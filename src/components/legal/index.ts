/**
 * Legal Components Module
 * @module components/legal
 *
 * This module provides reusable legal and consent management components.
 * It includes cookie consent banners, preference modals, and legal page content.
 *
 * To reuse in another project:
 * 1. Copy `src/components/legal/` and `src/modules/cookie-consent/` folders
 * 2. Copy the legal styles from `globals.css` (or add to your own global styles)
 * 3. Add the i18n keys from messages/*.json to your translation files
 * 4. Import and use components in your layout
 */

// Consent Components (new module)
export {
  ConsentBanner,
  ConsentModal,
  ConsentProvider,
  useConsent,
} from '@/modules/cookie-consent';

// Legal Page Content
export { CookiePolicyContent } from './CookiePolicyContent';
export { PrivacyPolicyContent } from './PrivacyPolicyContent';
export { TermsOfServiceContent } from './TermsOfServiceContent';

// Legal Links
export { LegalLinks } from './LegalLinks';

// Re-export consent context and types
export type { LegalLinksProps, LegalPageProps } from './types';
