'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  DEFAULT_CONSENT_STATE,
} from './constants';
import type {
  ConsentCategory,
  ConsentContextValue,
  ConsentState,
} from './types';

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}

interface ConsentProviderProps {
  children: ReactNode;
}

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ConsentState;
        // Validate version and structure
        if (
          parsed.version === CONSENT_VERSION &&
          typeof parsed.necessary === 'boolean'
        ) {
          setConsent(parsed);
          setShowBanner(false);
        } else {
          // Version mismatch or invalid structure, show banner
          setShowBanner(true);
        }
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
    setIsLoaded(true);
  }, []);

  const saveConsent = useCallback((newConsent: ConsentState) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
      setConsent(newConsent);
      setShowBanner(false);
    } catch (error) {
      console.error('Failed to save consent:', error);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: true,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    saveConsent(newConsent);
  }, [saveConsent]);

  const rejectNonEssential = useCallback(() => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: false,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    saveConsent(newConsent);
  }, [saveConsent]);

  const updateConsent = useCallback(
    (category: ConsentCategory, value: boolean) => {
      if (category === 'necessary') return; // Cannot toggle necessary
      setConsent(prev => ({
        ...(prev || DEFAULT_CONSENT_STATE),
        [category]: value,
        timestamp: Date.now(),
        version: CONSENT_VERSION,
      }));
    },
    [],
  );

  const savePreferences = useCallback(
    (preferences: Partial<ConsentState>) => {
      const newConsent: ConsentState = {
        necessary: true, // Always true
        analytics: preferences.analytics ?? consent?.analytics ?? false,
        timestamp: Date.now(),
        version: CONSENT_VERSION,
      };
      saveConsent(newConsent);
      setShowPreferences(false);
    },
    [consent, saveConsent],
  );

  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      setConsent(null);
      setShowBanner(true);
    } catch (error) {
      console.error('Failed to reset consent:', error);
    }
  }, []);

  /**
   * Check if a specific consent category is explicitly granted.
   * Returns false if:
   * - Consent hasn't been loaded yet
   * - No consent decision has been made (null)
   * - The specific category is not granted
   *
   * IMPORTANT: This enforces "privacy by default" - no consent = no permission
   */
  const hasConsent = useCallback(
    (category: ConsentCategory): boolean => {
      if (!isLoaded || !consent) return false;
      // Necessary is always true
      if (category === 'necessary') return true;
      // For all other categories, must be explicitly true
      return consent[category] === true;
    },
    [consent, isLoaded],
  );

  const value: ConsentContextValue = {
    consent,
    isLoaded,
    hasConsent,
    acceptAll,
    rejectNonEssential,
    updateConsent,
    savePreferences,
    resetConsent,
    showBanner,
    setShowBanner,
    showPreferences,
    setShowPreferences,
  };

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}
