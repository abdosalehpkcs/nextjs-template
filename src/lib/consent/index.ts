/**
 * Consent Management Module
 * @module lib/consent
 *
 * This module provides consent management functionality for cookie consent
 * and GDPR compliance. It handles storing user preferences in localStorage
 * and provides hooks for components to access consent state.
 */

export * from './constants';
export { ConsentProvider, useConsent } from './context';
export * from './types';
