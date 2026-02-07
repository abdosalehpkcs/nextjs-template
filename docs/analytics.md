# Analytics & Consent Management Documentation

This document describes the analytics and consent management system implemented in this Next.js template. The system is designed to be:

- **GDPR/CCPA compliant** – No tracking without explicit user consent
- **Type-safe** – Full TypeScript support with event registries
- **Reusable** – Easy to configure and extend for any project
- **Developer-friendly** – Clear APIs, hooks, and patterns

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Setup & Configuration](#setup--configuration)
3. [Consent Management](#consent-management)
4. [Event Registry](#event-registry)
5. [Tracking Events](#tracking-events)
6. [React Hooks](#react-hooks)
7. [Adding New Events](#adding-new-events)
8. [Testing & Verification](#testing--verification)
9. [Best Practices](#best-practices)

---

## Architecture Overview

```
src/
├── lib/
│   ├── analytics/
│   │   ├── events.ts      # Type-safe event definitions
│   │   ├── core.ts        # Core tracking functions
│   │   ├── hooks.ts       # React hooks for tracking
│   │   ├── provider.tsx   # AnalyticsProvider component
│   │   └── index.ts       # Public exports
│   └── consent/
│       ├── types.ts       # Consent type definitions
│       ├── constants.ts   # Storage keys, version
│       ├── context.tsx    # ConsentProvider & hooks
│       └── index.ts       # Public exports
└── components/
    └── legal/
        ├── CookieConsentBanner.tsx
        ├── CookiePreferencesModal.tsx
        └── ...
```

### Data Flow

```
User Action → Consent Check → Track Event → Google Analytics
                  ↓
            No Consent?
                  ↓
            Event Blocked (silent no-op)
```

---

## Setup & Configuration

### 1. Environment Variables

Add your Google Analytics Measurement ID to `.env.local`:

```bash
# Required for analytics
GOOGLE_SITE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 2. Provider Setup

The providers are already configured in `src/app/layout.tsx`:

```tsx
import { ConsentProvider } from '@/lib/consent';
import { AnalyticsProvider } from '@/lib/analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ConsentProvider>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
```

**Important:** `ConsentProvider` must wrap `AnalyticsProvider`.

### 3. Cookie Banner

Add the cookie consent banner to your layout:

```tsx
import { CookieConsentBanner } from '@/components/legal';

// Inside your layout
<CookieConsentBanner />;
```

---

## Consent Management

### Consent Categories

The system supports four consent categories:

| Category      | Description                        | Default       |
| ------------- | ---------------------------------- | ------------- |
| `necessary`   | Essential cookies (auth, security) | Always `true` |
| `analytics`   | Google Analytics, usage tracking   | `false`       |
| `marketing`   | Advertising, retargeting           | `false`       |
| `preferences` | Language, theme settings           | `false`       |

### Using Consent Context

```tsx
import { useConsent } from '@/lib/consent';

function MyComponent() {
  const {
    consent, // Current consent state
    hasConsent, // Check specific category
    acceptAll, // Accept all categories
    rejectNonEssential, // Reject all except necessary
    updateConsent, // Update specific categories
    resetConsent, // Clear and show banner again
  } = useConsent();

  // Check if analytics is allowed
  if (hasConsent('analytics')) {
    // Track something
  }
}
```

### Consent State Shape

```typescript
interface ConsentState {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number; // When consent was given
  version: string; // Consent version for invalidation
}
```

### "Reject All" Enforcement

When a user clicks "Reject All":

1. ✅ Only `necessary` cookies are allowed
2. ✅ Google Analytics script is NOT loaded
3. ✅ All tracking functions become no-ops
4. ✅ No data is sent to external services
5. ✅ Consent state is stored locally only

---

## Event Registry

### Predefined Events

The system includes commonly used events in `src/lib/analytics/events.ts`:

```typescript
// Button/UI interactions
'button_click'; // Any button click
'link_click'; // External/internal link clicks
'cta_click'; // Call-to-action buttons

// Forms
'form_start'; // User begins filling form
'form_submit'; // Form submission
'form_error'; // Form validation error

// Navigation
'page_view'; // Page visits (automatic)
'scroll_depth'; // Scroll tracking (25%, 50%, 75%, 100%)
'search'; // Search queries

// Engagement
'video_play'; // Video started
'video_complete'; // Video finished
'download'; // File downloads

// E-commerce (if needed)
'purchase'; // Completed purchase
'add_to_cart'; // Added item to cart

// Errors
'error'; // JavaScript errors
'api_error'; // API call failures
```

### Event Parameters

Each event has typed parameters:

```typescript
// Button click parameters
interface ButtonClickParams {
  button_id?: string;
  button_text?: string;
  button_location?: string;
  destination_url?: string;
}

// Form submit parameters
interface FormSubmitParams {
  form_id: string;
  form_name?: string;
  form_type?: string;
  success: boolean;
}

// Scroll depth parameters
interface ScrollDepthParams {
  depth_percentage: 25 | 50 | 75 | 100;
  page_path?: string;
}
```

---

## Tracking Events

### Basic Usage

```typescript
import {
  trackEvent,
  trackPageView,
  trackClick,
  trackError,
} from '@/lib/analytics';

// Track a custom event
trackEvent('button_click', {
  button_id: 'signup-cta',
  button_text: 'Sign Up Now',
  button_location: 'hero',
});

// Track page view (usually automatic)
trackPageView('/dashboard');

// Track a click
trackClick('download-pdf', 'Download Whitepaper');

// Track an error
trackError(new Error('API failed'), 'UserService.fetch');
```

### Consent-Safe Tracking

All tracking functions automatically check consent:

```typescript
// This is safe to call anywhere
trackEvent('button_click', { button_id: 'test' });

// If user hasn't consented to analytics:
// - No data is sent
// - No errors are thrown
// - Function returns silently
```

### Manual Consent Check

```typescript
import { hasAnalyticsConsent } from '@/lib/analytics';

if (hasAnalyticsConsent()) {
  // Analytics is allowed and initialized
  // Perform tracking-dependent logic
}
```

---

## React Hooks

### `useTrackEvent`

Track events from React components:

```tsx
import { useTrackEvent } from '@/lib/analytics';

function SignupButton() {
  const trackEvent = useTrackEvent();

  const handleClick = () => {
    trackEvent('cta_click', {
      button_id: 'signup',
      button_text: 'Get Started',
      button_location: 'navbar',
    });
    // Continue with signup logic
  };

  return <button onClick={handleClick}>Get Started</button>;
}
```

### `useTrackPageView`

Track page views (optional – automatic tracking is included):

```tsx
import { useTrackPageView } from '@/lib/analytics';

function DashboardPage() {
  useTrackPageView('/dashboard');

  return <div>Dashboard content</div>;
}
```

### `useTrackForm`

Complete form tracking lifecycle:

```tsx
import { useTrackForm } from '@/lib/analytics';

function ContactForm() {
  const { trackStart, trackSubmit, trackError } = useTrackForm(
    'contact-form',
    'Contact Form',
  );

  const handleFocus = () => {
    trackStart(); // User started filling form
  };

  const handleSubmit = async data => {
    try {
      await submitForm(data);
      trackSubmit(true);
    } catch (error) {
      trackError(error.message);
      trackSubmit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onFocus={handleFocus} />
      <button type="submit">Send</button>
    </form>
  );
}
```

### `useTrackScrollDepth`

Automatic scroll depth tracking:

```tsx
import { useTrackScrollDepth } from '@/lib/analytics';

function LongArticle() {
  useTrackScrollDepth(); // Tracks 25%, 50%, 75%, 100%

  return <article>Long content...</article>;
}
```

### `useTrackClick`

Add click tracking to any element:

```tsx
import { useTrackClick } from '@/lib/analytics';

function DownloadButton() {
  const handleClick = useTrackClick('download', 'Download PDF', 'resources');

  return (
    <a href="/file.pdf" onClick={handleClick}>
      Download PDF
    </a>
  );
}
```

---

## Adding New Events

### Step 1: Define the Event Type

Edit `src/lib/analytics/events.ts`:

```typescript
// Add to AnalyticsEventName union
export type AnalyticsEventName =
  | 'button_click'
  | 'form_submit'
  // ... existing events
  | 'my_custom_event'; // Add your event

// Define parameters interface
export interface MyCustomEventParams {
  custom_field: string;
  optional_field?: number;
}

// Add to AnalyticsEventMap
export interface AnalyticsEventMap {
  // ... existing mappings
  my_custom_event: MyCustomEventParams;
}
```

### Step 2: Use the Event

```typescript
import { trackEvent } from '@/lib/analytics';

// TypeScript will enforce correct parameters
trackEvent('my_custom_event', {
  custom_field: 'value', // Required
  optional_field: 42, // Optional
});

// ❌ TypeScript error: missing required field
trackEvent('my_custom_event', {});

// ❌ TypeScript error: unknown event name
trackEvent('unknown_event', {});
```

### Step 3: Create a Custom Hook (Optional)

```typescript
// src/lib/analytics/hooks.ts

export function useTrackMyCustomEvent() {
  return useCallback((customField: string, optionalField?: number) => {
    trackEvent('my_custom_event', {
      custom_field: customField,
      optional_field: optionalField,
    });
  }, []);
}
```

---

## Testing & Verification

### 1. Verify Consent Flow

```bash
# Open browser DevTools → Application → Local Storage
# Look for key: cookie_consent_v1
```

Expected states:

- **No consent**: Key doesn't exist, banner is visible
- **Accepted all**: All categories are `true`
- **Rejected**: Only `necessary` is `true`

### 2. Verify Analytics Loading

```javascript
// In browser console
window.gtag; // Should be a function if loaded
window.__ga_initialized; // Should be true if initialized
window.dataLayer; // Should exist with events
```

### 3. Verify Events in GA4

1. Open Google Analytics 4 dashboard
2. Go to **Realtime** → **Events**
3. Trigger events in your app
4. Confirm events appear with correct parameters

### 4. Verify Consent Enforcement

```javascript
// 1. Clear localStorage
localStorage.clear();

// 2. Refresh page - banner should appear

// 3. Click "Reject All"

// 4. Check that gtag is not loaded
console.log(window.gtag); // Should be undefined or no-op

// 5. Try tracking - should be silent no-op
window.gtag?.('event', 'test'); // No network request
```

### 5. Debug Mode

Enable GA4 debug mode:

```typescript
// In provider.tsx, add debug_mode
gtag('config', measurementId, {
  debug_mode: process.env.NODE_ENV === 'development',
});
```

Then use **GA4 DebugView** in Google Analytics.

---

## Best Practices

### 1. Always Use Type-Safe Events

```typescript
// ✅ Good - type-safe
trackEvent('button_click', { button_id: 'cta' });

// ❌ Bad - bypasses type safety
(window as any).gtag('event', 'random_event');
```

### 2. Track Meaningful Actions

```typescript
// ✅ Good - meaningful user action
trackEvent('cta_click', {
  button_id: 'pricing-signup',
  button_text: 'Start Free Trial',
  button_location: 'pricing_page',
});

// ❌ Bad - too granular
trackEvent('button_click', { button_id: 'btn-1' });
```

### 3. Use Consistent Naming

Follow these conventions:

- Event names: `snake_case` (e.g., `button_click`)
- Parameter names: `snake_case` (e.g., `button_id`)
- IDs: `kebab-case` (e.g., `signup-cta`)

### 4. Don't Track PII

```typescript
// ✅ Good
trackEvent('form_submit', { form_id: 'contact', success: true });

// ❌ Bad - never track personal data
trackEvent('form_submit', { email: 'user@example.com' });
```

### 5. Respect Consent Always

```typescript
// ✅ Good - use the provided functions
import { trackEvent } from '@/lib/analytics';
trackEvent('button_click', { button_id: 'test' });

// ❌ Bad - bypasses consent check
window.gtag('event', 'button_click', { button_id: 'test' });
```

### 6. Test Both Consent States

Always test your tracking with:

1. Consent granted
2. Consent denied
3. No consent decision yet

---

## Troubleshooting

### Events not showing in GA4

1. Check `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` is set
2. Verify consent is granted (`hasConsent('analytics')`)
3. Check browser console for errors
4. Use GA4 DebugView for realtime debugging

### TypeScript errors with events

1. Ensure event name is in `AnalyticsEventName` type
2. Ensure parameters match the interface in `AnalyticsEventMap`
3. Run `npm run type-check` to see detailed errors

### Consent banner keeps appearing

1. Check localStorage isn't being cleared
2. Verify `CONSENT_VERSION` matches stored consent
3. Check for JavaScript errors preventing save

### Analytics loads despite "Reject All"

1. Verify `ConsentProvider` wraps `AnalyticsProvider`
2. Check `hasConsent('analytics')` returns `false`
3. Verify no direct `gtag` calls bypass consent check

---

## API Reference

### Core Functions

| Function                         | Description                  |
| -------------------------------- | ---------------------------- |
| `trackEvent(name, params)`       | Track a custom event         |
| `trackPageView(path, title)`     | Track page view              |
| `trackClick(id, text, location)` | Track element click          |
| `trackError(error, context)`     | Track JavaScript error       |
| `hasAnalyticsConsent()`          | Check if tracking is allowed |
| `isAnalyticsReady()`             | Check if GA is initialized   |

### React Hooks

| Hook                      | Description                   |
| ------------------------- | ----------------------------- |
| `useTrackEvent()`         | Returns `trackEvent` function |
| `useTrackPageView(path)`  | Track page view on mount      |
| `useTrackForm(id, name)`  | Form tracking utilities       |
| `useTrackScrollDepth()`   | Auto scroll depth tracking    |
| `useTrackClick(id, text)` | Returns click handler         |

### Consent Hooks

| Hook                   | Description             |
| ---------------------- | ----------------------- |
| `useConsent()`         | Access consent context  |
| `hasConsent(category)` | Check specific category |
| `acceptAll()`          | Grant all consent       |
| `rejectNonEssential()` | Reject non-essential    |

---

## License

This analytics implementation is part of the Next.js Template and is available under the MIT License.
