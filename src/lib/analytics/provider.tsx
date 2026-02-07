'use client';

/**
 * Analytics Provider Component
 * @module analytics/provider
 *
 * This component handles Google Analytics script loading and initialization.
 * It only loads GA when:
 * - Analytics consent is explicitly granted
 * - A valid GA ID is provided
 *
 * Usage:
 * ```tsx
 * <ConsentProvider>
 *   <AnalyticsProvider googleAnalyticsId={env.GOOGLE_SITE_ANALYTICS_ID}>
 *     {children}
 *   </AnalyticsProvider>
 * </ConsentProvider>
 * ```
 */

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { ReactNode, Suspense, useEffect, useRef } from 'react';

import { useConsent } from '../consent/context';
import {
  configureAnalytics,
  setAnalyticsInitialized,
  trackPageView,
} from './core';

// ============================================================================
// TYPES
// ============================================================================

export interface AnalyticsProviderProps {
  children: ReactNode;
  /** Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX) */
  googleAnalyticsId?: string;
  /** Enable debug mode (logs events to console) */
  debug?: boolean;
  /** Track page views automatically on route changes (default: true) */
  trackPageViews?: boolean;
}

// ============================================================================
// INTERNAL COMPONENTS
// ============================================================================

/**
 * Handles automatic page view tracking on route changes
 */
function PageViewTracker({ gaId }: { gaId: string }) {
  const { consent, isLoaded, hasConsent } = useConsent();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousUrlRef = useRef<string | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isLoaded || !hasConsent('analytics')) return;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Skip tracking on first render (GA config already sends initial page view)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousUrlRef.current = url;
      return;
    }

    // Skip if URL hasn't changed
    if (previousUrlRef.current === url) return;

    previousUrlRef.current = url;
    trackPageView(url);
  }, [pathname, searchParams, consent?.analytics, isLoaded, hasConsent, gaId]);

  return null;
}

/**
 * Wrapped in Suspense for useSearchParams compatibility
 */
function PageViewTrackerWrapper({ gaId }: { gaId: string }) {
  return (
    <Suspense fallback={null}>
      <PageViewTracker gaId={gaId} />
    </Suspense>
  );
}

/**
 * Handles GA script loading based on consent
 */
function GoogleAnalyticsScripts({
  gaId,
  debug,
}: {
  gaId: string;
  debug?: boolean;
}) {
  const { consent, isLoaded } = useConsent();
  const scriptsLoadedRef = useRef(false);
  const previousConsentRef = useRef<boolean | undefined>(undefined);

  // Handle consent state changes
  useEffect(() => {
    if (!isLoaded) return;

    const currentConsent = consent?.analytics ?? false;
    const previousConsent = previousConsentRef.current;

    // Update gtag consent mode when consent changes
    if (
      typeof window !== 'undefined' &&
      window.gtag &&
      previousConsent !== undefined
    ) {
      if (previousConsent === true && currentConsent === false) {
        // Consent revoked - disable analytics
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
        setAnalyticsInitialized(false);

        if (debug) {
          console.log('[Analytics] Consent revoked, analytics disabled');
        }
      } else if (previousConsent === false && currentConsent === true) {
        // Consent granted - enable analytics
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
        setAnalyticsInitialized(true);

        if (debug) {
          console.log('[Analytics] Consent granted, analytics enabled');
        }
      }
    }

    previousConsentRef.current = currentConsent;
  }, [consent?.analytics, isLoaded, debug]);

  // Don't render if not ready or consent not granted
  if (!isLoaded || consent?.analytics !== true || !gaId) {
    return null;
  }

  // Prevent multiple script loads
  if (scriptsLoadedRef.current) {
    return null;
  }

  scriptsLoadedRef.current = true;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        onLoad={() => {
          if (debug) {
            console.log('[Analytics] GA script loaded');
          }
        }}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Set consent mode to granted (user explicitly consented)
            gtag('consent', 'default', {
              'analytics_storage': 'granted'
            });
            
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              send_page_view: true,
              debug_mode: ${debug ? 'true' : 'false'}
            });
            
            window.__ga_initialized = true;
            ${debug ? "console.log('[Analytics] GA initialized');" : ''}
          `,
        }}
      />
    </>
  );
}

/**
 * Wrapped in Suspense for safety
 */
function GoogleAnalyticsScriptsWrapper({
  gaId,
  debug,
}: {
  gaId: string;
  debug?: boolean;
}) {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsScripts gaId={gaId} debug={debug} />
    </Suspense>
  );
}

// ============================================================================
// MAIN PROVIDER
// ============================================================================

/**
 * Analytics Provider Component
 *
 * Wrap your app with this component to enable Google Analytics tracking.
 * Must be used within a ConsentProvider.
 *
 * Features:
 * - Only loads GA scripts when consent is explicitly granted
 * - Automatic page view tracking on route changes
 * - Consent revocation handling via Google Consent Mode
 * - Debug mode for development
 *
 * @example
 * ```tsx
 * // In your root layout
 * <ConsentProvider>
 *   <AnalyticsProvider
 *     googleAnalyticsId={env.GOOGLE_SITE_ANALYTICS_ID}
 *     debug={process.env.NODE_ENV === 'development'}
 *   >
 *     {children}
 *   </AnalyticsProvider>
 * </ConsentProvider>
 * ```
 */
export function AnalyticsProvider({
  children,
  googleAnalyticsId,
  debug = false,
  trackPageViews = true,
}: AnalyticsProviderProps) {
  const gaId = googleAnalyticsId || process.env.GOOGLE_SITE_ANALYTICS_ID || '';

  // Configure the analytics module on mount
  useEffect(() => {
    configureAnalytics({
      googleAnalyticsId: gaId,
      debug,
    });
  }, [gaId, debug]);

  // Reset initialization state on unmount
  useEffect(() => {
    return () => {
      setAnalyticsInitialized(false);
    };
  }, []);

  return (
    <>
      {children}
      {gaId && (
        <>
          <GoogleAnalyticsScriptsWrapper gaId={gaId} debug={debug} />
          {trackPageViews && <PageViewTrackerWrapper gaId={gaId} />}
        </>
      )}
    </>
  );
}
