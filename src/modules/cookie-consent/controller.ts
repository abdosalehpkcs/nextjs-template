import type {
  ConsentCategories,
  CookiePreferenceInput,
  CookiePreferences,
} from './types';

const DEFAULT_PREFERENCES: CookiePreferenceInput = {
  functional: true,
  analytics: false,
  marketing: false,
};

export const createPreferences = (
  partial: CookiePreferenceInput = {},
): CookiePreferences => {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    functional: partial.functional ?? DEFAULT_PREFERENCES.functional ?? true,
    analytics: partial.analytics ?? DEFAULT_PREFERENCES.analytics ?? false,
    marketing: partial.marketing ?? DEFAULT_PREFERENCES.marketing ?? false,
  };
};

export const acceptAll = (): CookiePreferences =>
  createPreferences({
    functional: true,
    analytics: true,
    marketing: true,
  });

export const rejectAll = (): CookiePreferences =>
  createPreferences({
    functional: true,
    analytics: false,
    marketing: false,
  });

export const shouldShowBanner = (prefs: CookiePreferences | null): boolean => {
  return prefs === null;
};

export const isAllowed = (
  prefs: CookiePreferences | null,
  category: ConsentCategories,
): boolean => {
  if (category === 'functional') {
    return prefs?.functional ?? true;
  }

  if (category === 'analytics') {
    return prefs?.analytics ?? false;
  }

  return prefs?.marketing ?? false;
};
