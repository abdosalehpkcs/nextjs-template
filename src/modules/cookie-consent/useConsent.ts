'use client';

import { useContext } from 'react';

import { ConsentContext } from './ConsentProvider';
import type { ConsentCategories, ConsentContextValue } from './types';

const noop = () => {};

const fallbackContext: ConsentContextValue = {
  preferences: null,
  isLoaded: false,
  isModalOpen: false,
  setPreferences: noop,
  openModal: noop,
  closeModal: noop,
  acceptAll: noop,
  rejectAll: noop,
  save: noop,
  isAllowed: (category: ConsentCategories) => category === 'functional',
};

export const useConsent = (): ConsentContextValue => {
  const context = useContext(ConsentContext);

  if (!context) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('useConsent must be used within a ConsentProvider');
    }
    return fallbackContext;
  }

  return context;
};
