'use client';

/**
 * Analytics React Hooks
 * @module analytics/hooks
 *
 * React hooks for analytics tracking.
 * These hooks provide a convenient way to track events in React components
 * while respecting consent state.
 */

import { useCallback, useEffect, useRef } from 'react';

import { useConsent } from '../consent/context';
import {
  hasAnalyticsConsent,
  isAnalyticsReady,
  trackEvent,
  trackPageView,
} from './core';
import type { AnalyticsEventMap, AnalyticsEventName } from './events';

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook to track events with automatic consent checking.
 *
 * Returns a stable tracking function that respects the current consent state.
 * The function is memoized and won't cause re-renders when used in dependencies.
 *
 * @example
 * ```tsx
 * function MyButton() {
 *   const track = useTrackEvent();
 *
 *   const handleClick = () => {
 *     track('button_click', {
 *       button_id: 'my-button',
 *       button_text: 'Click me'
 *     });
 *   };
 *
 *   return <button onClick={handleClick}>Click me</button>;
 * }
 * ```
 */
export function useTrackEvent() {
  const { hasConsent } = useConsent();

  const track = useCallback(
    <E extends AnalyticsEventName>(
      eventName: E,
      params?: AnalyticsEventMap[E],
    ) => {
      // Double-check consent at call time
      if (!hasConsent('analytics')) {
        return { sent: false, reason: 'no_consent' as const };
      }
      return trackEvent(eventName, params);
    },
    [hasConsent],
  );

  return track;
}

/**
 * Hook to track page views on route changes.
 * Use this in your root layout or a dedicated analytics component.
 *
 * @param pathname - Current pathname from usePathname()
 * @param searchParams - Current search params string
 *
 * @example
 * ```tsx
 * function AnalyticsPageTracker() {
 *   const pathname = usePathname();
 *   const searchParams = useSearchParams();
 *   useTrackPageView(pathname, searchParams?.toString());
 *   return null;
 * }
 * ```
 */
export function useTrackPageView(
  pathname: string | null,
  searchParams?: string | null,
): void {
  const { hasConsent, isLoaded } = useConsent();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !pathname) return;

    // Only track if consent is granted and GA is ready
    if (!hasConsent('analytics') || !isAnalyticsReady()) return;

    // Build full URL
    const url = pathname + (searchParams ? `?${searchParams}` : '');

    // Avoid duplicate tracking on initial load
    if (previousPathRef.current === url) return;

    previousPathRef.current = url;
    trackPageView(url);
  }, [pathname, searchParams, hasConsent, isLoaded]);
}

/**
 * Hook to get current consent status for analytics.
 * Useful for conditionally rendering analytics-related UI.
 *
 * @example
 * ```tsx
 * function AnalyticsStatus() {
 *   const { isEnabled, isReady } = useAnalyticsStatus();
 *
 *   if (!isEnabled) return <p>Analytics disabled</p>;
 *   if (!isReady) return <p>Analytics loading...</p>;
 *   return <p>Analytics active</p>;
 * }
 * ```
 */
export function useAnalyticsStatus() {
  const { hasConsent, isLoaded } = useConsent();

  return {
    /** Whether analytics consent is granted */
    isEnabled: isLoaded && hasConsent('analytics'),
    /** Whether GA is loaded and ready to receive events */
    isReady: isAnalyticsReady(),
    /** Whether consent state has been loaded from storage */
    isLoaded,
  };
}

/**
 * Hook to create a click handler that tracks an event.
 *
 * @param eventName - The event to track
 * @param params - Event parameters
 * @param originalHandler - Optional original click handler
 *
 * @example
 * ```tsx
 * function CTAButton() {
 *   const handleClick = useTrackClick('button_click', {
 *     button_id: 'cta-main',
 *     button_text: 'Get Started',
 *     section: 'hero'
 *   });
 *
 *   return <button onClick={handleClick}>Get Started</button>;
 * }
 * ```
 */
export function useTrackClick<E extends AnalyticsEventName>(
  eventName: E,
  params: AnalyticsEventMap[E],
  originalHandler?: (event: React.MouseEvent) => void,
) {
  const track = useTrackEvent();

  return useCallback(
    (event: React.MouseEvent) => {
      track(eventName, params);
      originalHandler?.(event);
    },
    [track, eventName, params, originalHandler],
  );
}

/**
 * Hook to track form interactions.
 *
 * @param formId - Unique identifier for the form
 * @param formName - Human-readable form name
 *
 * @example
 * ```tsx
 * function ContactForm() {
 *   const { trackStart, trackSubmit, trackFieldError } = useTrackForm(
 *     'contact-form',
 *     'Contact Form'
 *   );
 *
 *   const handleFocus = () => trackStart();
 *
 *   const handleSubmit = async (data) => {
 *     try {
 *       await submitForm(data);
 *       trackSubmit(true);
 *     } catch (error) {
 *       trackSubmit(false, error.message);
 *     }
 *   };
 *
 *   return <form onSubmit={handleSubmit}>...</form>;
 * }
 * ```
 */
export function useTrackForm(formId: string, formName?: string) {
  const track = useTrackEvent();
  const hasTrackedStart = useRef(false);

  const trackStart = useCallback(() => {
    // Only track form start once per form instance
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;

    track('form_start', {
      form_id: formId,
      form_name: formName,
    });
  }, [track, formId, formName]);

  const trackSubmit = useCallback(
    (success: boolean, errorMessage?: string) => {
      track('form_submit', {
        form_id: formId,
        form_name: formName,
        success,
        error_message: errorMessage,
      });
    },
    [track, formId, formName],
  );

  const trackFieldError = useCallback(
    (fieldName: string, errorMessage: string) => {
      track('form_field_error', {
        form_id: formId,
        field_name: fieldName,
        error_message: errorMessage,
      });
    },
    [track, formId],
  );

  const trackFieldFocus = useCallback(
    (fieldName: string, fieldType?: string) => {
      // Also trigger form start if not already tracked
      trackStart();

      track('form_field_focus', {
        form_id: formId,
        field_name: fieldName,
        field_type: fieldType,
      });
    },
    [track, formId, trackStart],
  );

  // Reset tracking state when form is unmounted or formId changes
  useEffect(() => {
    return () => {
      hasTrackedStart.current = false;
    };
  }, [formId]);

  return {
    trackStart,
    trackSubmit,
    trackFieldError,
    trackFieldFocus,
  };
}

/**
 * Hook to track scroll depth.
 * Automatically tracks when user scrolls past certain thresholds.
 *
 * @param pagePath - Current page path for tracking context
 * @param thresholds - Scroll depth thresholds to track (default: [25, 50, 75, 90])
 *
 * @example
 * ```tsx
 * function Article({ slug }) {
 *   useTrackScrollDepth(`/blog/${slug}`);
 *   return <article>...</article>;
 * }
 * ```
 */
export function useTrackScrollDepth(
  pagePath: string,
  thresholds: Array<25 | 50 | 75 | 90 | 100> = [25, 50, 75, 90],
) {
  const track = useTrackEvent();
  const trackedThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Reset tracked thresholds on page change
    trackedThresholds.current = new Set();

    const handleScroll = () => {
      if (!hasAnalyticsConsent()) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;

      const scrollPercent = Math.round(
        (scrollTop / (scrollHeight - clientHeight)) * 100,
      );

      for (const threshold of thresholds) {
        if (
          scrollPercent >= threshold &&
          !trackedThresholds.current.has(threshold)
        ) {
          trackedThresholds.current.add(threshold);
          track('scroll_depth', {
            percent_scrolled: threshold,
            page_path: pagePath,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pagePath, thresholds, track]);
}
