import type { CSSProperties } from 'react';

export type ConsentCategories = 'functional' | 'analytics' | 'marketing';

export type CookiePreferences = {
  version: 1;
  updatedAt: string;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type CookiePreferenceInput = Partial<
  Omit<CookiePreferences, 'version' | 'updatedAt'>
>;

export type ConsentLabels = {
  bannerTitle: string;
  bannerDescription: string;
  bannerManage: string;
  bannerAcceptAll: string;
  bannerRejectAll: string;
  modalTitle: string;
  modalDescription: string;
  modalSave: string;
  modalAcceptAll: string;
  modalRejectAll: string;
  functionalTitle: string;
  functionalDescription: string;
  analyticsTitle: string;
  analyticsDescription: string;
  marketingTitle: string;
  marketingDescription: string;
  alwaysOnLabel: string;
  privacyPolicyLink: string;
};

export type ConsentBannerProps = {
  className?: string;
  style?: CSSProperties;
  labels?: Partial<ConsentLabels>;
  privacyPolicyUrl?: string;
};

export type ConsentModalProps = {
  className?: string;
  style?: CSSProperties;
  labels?: Partial<ConsentLabels>;
  privacyPolicyUrl?: string;
};

export type ConsentContextValue = {
  preferences: CookiePreferences | null;
  isLoaded: boolean;
  isModalOpen: boolean;
  setPreferences: (prefs: CookiePreferences) => void;
  openModal: () => void;
  closeModal: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (partial: CookiePreferenceInput) => void;
  isAllowed: (category: ConsentCategories) => boolean;
};
