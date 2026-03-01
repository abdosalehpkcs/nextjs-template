'use client';

import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  acceptAll as acceptAllController,
  createPreferences,
  isAllowed as isAllowedController,
  rejectAll as rejectAllController,
} from './controller';
import { load, save } from './storage';
import type {
  ConsentCategories,
  ConsentContextValue,
  CookiePreferenceInput,
  CookiePreferences,
} from './types';

export const ConsentContext = createContext<ConsentContextValue | null>(null);

type ConsentProviderProps = {
  children: ReactNode;
};

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [preferences, setPreferencesState] = useState<CookiePreferences | null>(
    null,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = load();
    setPreferencesState(stored);
    setIsLoaded(true);
  }, []);

  const setPreferences = useCallback((prefs: CookiePreferences) => {
    save(prefs);
    setPreferencesState(prefs);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    const next = acceptAllController();
    setPreferences(next);
    setIsModalOpen(false);
  }, [setPreferences]);

  const rejectAll = useCallback(() => {
    const next = rejectAllController();
    setPreferences(next);
    setIsModalOpen(false);
  }, [setPreferences]);

  const savePreferences = useCallback(
    (partial: CookiePreferenceInput) => {
      const next = createPreferences({
        functional: partial.functional ?? preferences?.functional ?? true,
        analytics: partial.analytics ?? preferences?.analytics ?? false,
        marketing: partial.marketing ?? preferences?.marketing ?? false,
      });
      setPreferences(next);
      setIsModalOpen(false);
    },
    [preferences, setPreferences],
  );

  const isAllowed = useCallback(
    (category: ConsentCategories) => {
      return isAllowedController(preferences, category);
    },
    [preferences],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      preferences,
      isLoaded,
      isModalOpen,
      setPreferences,
      openModal,
      closeModal,
      acceptAll,
      rejectAll,
      save: savePreferences,
      isAllowed,
    }),
    [
      acceptAll,
      closeModal,
      isAllowed,
      isLoaded,
      isModalOpen,
      openModal,
      preferences,
      rejectAll,
      savePreferences,
      setPreferences,
    ],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}
