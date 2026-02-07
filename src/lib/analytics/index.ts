/**
 * Analytics Module
 * @module analytics
 *
 * A comprehensive, type-safe analytics module for Next.js applications.
 * Provides Google Analytics integration with consent management.
 *
 * ## Quick Start
 *
 * 1. Set up environment variable:
 *    ```env
 *    GOOGLE_SITE_ANALYTICS_ID=G-XXXXXXXXXX
 *    ```
 *
 * 2. Wrap your app with providers:
 *    ```tsx
 *    <ConsentProvider>
 *      <AnalyticsProvider googleAnalyticsId={env.GOOGLE_SITE_ANALYTICS_ID}>
 *        {children}
 *      </AnalyticsProvider>
 *    </ConsentProvider>
 *    ```
 *
 * 3. Track events in your components:
 *    ```tsx
 *    import { useTrackEvent } from '@/lib/analytics';
 *
 *    function MyButton() {
 *      const track = useTrackEvent();
 *
 *      return (
 *        <button onClick={() => track('button_click', {
 *          button_id: 'my-button',
 *          button_text: 'Click me'
 *        })}>
 *          Click me
 *        </button>
 *      );
 *    }
 *    ```
 *
 * ## Documentation
 * See docs/analytics.md for complete documentation.
 */

// Core tracking functions
export {
  configureAnalytics,
  getAnalyticsConfig,
  hasAnalyticsConsent,
  isAnalyticsReady,
  setUserProperties,
  trackClick,
  trackError,
  trackEvent,
  trackExternalLink,
  trackPageView,
} from './core';

// React hooks
export {
  useAnalyticsStatus,
  useTrackClick,
  useTrackEvent,
  useTrackForm,
  useTrackPageView,
  useTrackScrollDepth,
} from './hooks';

// Provider component
export { AnalyticsProvider } from './provider';

// Event types and registry
export type {
  AddToCartParams,
  AnalyticsEventMap,
  AnalyticsEventName,
  BaseEventParams,
  ButtonClickParams,
  ContactSubmitParams,
  ErrorParams,
  FormFieldParams,
  FormStartParams,
  FormSubmitParams,
  LinkClickParams,
  NavigationParams,
  PurchaseParams,
  ScrollDepthParams,
  SearchParams,
  ShareParams,
  SignupParams,
  ViewItemParams,
} from './events';
export { ANALYTICS_EVENTS, isValidEventName } from './events';

// Provider props type
export type { AnalyticsProviderProps } from './provider';

// Core types
export type { AnalyticsConfig, TrackEventResult } from './core';
