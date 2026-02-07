/**
 * Analytics Core Module
 * @module analytics/core
 *
 * This module provides the core analytics functionality.
 * All analytics operations go through this module to ensure:
 * - Consent is checked before any tracking
 * - Events are type-safe
 * - No direct window.gtag usage outside this module
 */

import { CONSENT_STORAGE_KEY } from '../consent/constants';
import type { AnalyticsEventMap, AnalyticsEventName } from './events';

// ============================================================================
// TYPES
// ============================================================================

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      targetId: string,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer: unknown[];
    __ga_initialized?: boolean;
    __analytics_debug?: boolean;
  }
}

export interface TrackEventResult {
  sent: boolean;
  reason?: 'no_consent' | 'ga_not_initialized' | 'ssr' | 'success';
}

export interface AnalyticsConfig {
  /** Google Analytics Measurement ID */
  googleAnalyticsId?: string;
  /** Enable debug mode (logs to console) */
  debug?: boolean;
  /** Custom data layer name (default: 'dataLayer') */
  dataLayerName?: string;
}

// ============================================================================
// INTERNAL STATE
// ============================================================================

let _config: AnalyticsConfig = {};

// ============================================================================
// CONSENT HELPERS
// ============================================================================

/**
 * Check if analytics consent is explicitly granted.
 * Returns false if:
 * - Running on server (SSR)
 * - No consent stored
 * - Consent is not explicitly true
 *
 * This is a standalone function that doesn't require React context,
 * making it safe to use in any JavaScript code.
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return false;

    const consent = JSON.parse(stored);
    return consent?.analytics === true;
  } catch {
    return false;
  }
}

/**
 * Check if GA is properly initialized and ready to receive events
 */
export function isAnalyticsReady(): boolean {
  if (typeof window === 'undefined') return false;
  return typeof window.gtag === 'function' && window.__ga_initialized === true;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Configure the analytics module.
 * Call this once during app initialization.
 */
export function configureAnalytics(config: AnalyticsConfig): void {
  _config = { ..._config, ...config };

  if (typeof window !== 'undefined' && config.debug) {
    window.__analytics_debug = true;
  }
}

/**
 * Get current analytics configuration
 */
export function getAnalyticsConfig(): Readonly<AnalyticsConfig> {
  return { ..._config };
}

/**
 * Mark analytics as initialized (called by AnalyticsProvider)
 */
export function setAnalyticsInitialized(initialized: boolean): void {
  if (typeof window !== 'undefined') {
    window.__ga_initialized = initialized;
  }
}

// ============================================================================
// TRACKING FUNCTIONS
// ============================================================================

/**
 * Internal logging helper for debug mode
 */
function debugLog(action: string, data?: unknown): void {
  if (typeof window !== 'undefined' && window.__analytics_debug) {
    console.log(`[Analytics] ${action}`, data ?? '');
  }
}

/**
 * Track a custom event with type-safe parameters.
 *
 * @param eventName - The event name (must be defined in events.ts)
 * @param params - Event parameters (type-checked based on event name)
 * @returns Result object indicating if event was sent
 *
 * @example
 * ```ts
 * // Type-safe: params are validated against ButtonClickParams
 * trackEvent('button_click', {
 *   button_id: 'cta-hero',
 *   button_text: 'Get Started',
 *   section: 'hero'
 * });
 * ```
 */
export function trackEvent<E extends AnalyticsEventName>(
  eventName: E,
  params?: AnalyticsEventMap[E],
): TrackEventResult {
  // SSR check
  if (typeof window === 'undefined') {
    return { sent: false, reason: 'ssr' };
  }

  // Consent check - CRITICAL: Never track without explicit consent
  if (!hasAnalyticsConsent()) {
    debugLog('Event blocked (no consent)', { eventName, params });
    return { sent: false, reason: 'no_consent' };
  }

  // GA initialization check
  if (!isAnalyticsReady()) {
    debugLog('Event blocked (GA not ready)', { eventName, params });
    return { sent: false, reason: 'ga_not_initialized' };
  }

  // Add timestamp if not provided
  const enrichedParams = {
    ...params,
    timestamp: params?.timestamp ?? Date.now(),
  };

  // Send to GA
  try {
    window.gtag('event', eventName, enrichedParams);
    debugLog('Event sent', { eventName, params: enrichedParams });
    return { sent: true, reason: 'success' };
  } catch (error) {
    debugLog('Event failed', { eventName, error });
    return { sent: false, reason: 'ga_not_initialized' };
  }
}

/**
 * Track a page view.
 * Typically called automatically by AnalyticsProvider on route changes.
 *
 * @param url - Optional URL to track (defaults to current location)
 */
export function trackPageView(url?: string): TrackEventResult {
  if (typeof window === 'undefined') {
    return { sent: false, reason: 'ssr' };
  }

  if (!hasAnalyticsConsent()) {
    debugLog('Page view blocked (no consent)', { url });
    return { sent: false, reason: 'no_consent' };
  }

  if (!isAnalyticsReady()) {
    debugLog('Page view blocked (GA not ready)', { url });
    return { sent: false, reason: 'ga_not_initialized' };
  }

  const pageUrl = url ?? window.location.pathname + window.location.search;
  const gaId = _config.googleAnalyticsId;

  if (!gaId) {
    debugLog('Page view blocked (no GA ID)');
    return { sent: false, reason: 'ga_not_initialized' };
  }

  try {
    window.gtag('config', gaId, {
      page_path: pageUrl,
    });
    debugLog('Page view sent', { url: pageUrl });
    return { sent: true, reason: 'success' };
  } catch (error) {
    debugLog('Page view failed', { error });
    return { sent: false, reason: 'ga_not_initialized' };
  }
}

/**
 * Set user properties for GA.
 * Only works if consent is granted.
 */
export function setUserProperties(
  properties: Record<string, string | number | boolean>,
): TrackEventResult {
  if (typeof window === 'undefined') {
    return { sent: false, reason: 'ssr' };
  }

  if (!hasAnalyticsConsent()) {
    debugLog('User properties blocked (no consent)', properties);
    return { sent: false, reason: 'no_consent' };
  }

  if (!isAnalyticsReady()) {
    return { sent: false, reason: 'ga_not_initialized' };
  }

  try {
    window.gtag('set', 'user_properties', properties);
    debugLog('User properties set', properties);
    return { sent: true, reason: 'success' };
  } catch {
    return { sent: false, reason: 'ga_not_initialized' };
  }
}

// ============================================================================
// CONVENIENCE HELPERS
// ============================================================================

/**
 * Create a click handler that tracks an event.
 * Useful for buttons and links.
 *
 * @example
 * ```tsx
 * <button onClick={trackClick('button_click', {
 *   button_id: 'submit-form',
 *   button_text: 'Submit'
 * })}>
 *   Submit
 * </button>
 * ```
 */
export function trackClick<E extends AnalyticsEventName>(
  eventName: E,
  params: AnalyticsEventMap[E],
  originalHandler?: (event: React.MouseEvent) => void,
): (event: React.MouseEvent) => void {
  return (event: React.MouseEvent) => {
    trackEvent(eventName, params);
    originalHandler?.(event);
  };
}

/**
 * Track an external link click with proper parameters.
 */
export function trackExternalLink(
  url: string,
  linkText?: string,
): TrackEventResult {
  return trackEvent('link_click', {
    link_url: url,
    link_text: linkText,
    is_external: true,
  });
}

/**
 * Track an error event.
 */
export function trackError(
  errorType: 'javascript' | 'api' | 'validation' | 'network' | 'unknown',
  errorMessage: string,
  details?: { error_code?: string; component?: string },
): TrackEventResult {
  return trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    ...details,
  });
}
