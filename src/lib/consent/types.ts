/**
 * Consent Management Types
 * @module consent/types
 */

export type ConsentCategory = 'necessary' | 'analytics';

export interface ConsentState {
  necessary: boolean; // Always true, non-toggleable
  analytics: boolean;
  timestamp: number;
  version: string;
}

export interface ConsentContextValue {
  consent: ConsentState | null;
  isLoaded: boolean;
  /** Check if a specific consent category is explicitly granted */
  hasConsent: (category: ConsentCategory) => boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  updateConsent: (category: ConsentCategory, value: boolean) => void;
  savePreferences: (preferences: Partial<ConsentState>) => void;
  resetConsent: () => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
  showPreferences: boolean;
  setShowPreferences: (show: boolean) => void;
}

export interface ConsentBannerProps {
  className?: string;
  position?: 'bottom' | 'top';
}

export interface ConsentPreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export interface AnalyticsProviderProps {
  children: React.ReactNode;
  googleAnalyticsId?: string;
}

export interface LegalLinksProps {
  className?: string;
  showCookiePreferences?: boolean;
  variant?: 'inline' | 'stacked';
}

export interface LegalPageProps {
  className?: string;
}
