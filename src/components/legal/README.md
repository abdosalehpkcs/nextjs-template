# Legal & Consent Management Module

A reusable, self-contained module for Terms, Privacy, Cookies pages and GDPR-compliant cookie consent with Google Analytics integration.

## Features

- 🍪 Cookie consent banner with Accept All / Reject / Manage options
- ⚙️ Granular cookie preferences modal
- 📄 Legal pages (Terms of Service, Privacy Policy, Cookie Policy)
- 📊 Conditional Google Analytics loading (only when consented)
- 🌍 Full i18n support (react-i18next)
- 🎨 Styling driven by global CSS (no hardcoded colors)
- ♿ Accessible (ARIA labels, focus trap, keyboard navigation)
- 💾 Persistent consent storage in localStorage

## Module Structure

```
src/
├── components/
│   └── legal/
│       ├── index.ts                    # Main exports
│       ├── AnalyticsProvider.tsx       # GA integration
│       ├── CookieConsentBanner.tsx     # Consent banner
│       ├── CookiePreferencesModal.tsx  # Preferences modal
│       ├── CookiePolicyContent.tsx     # Cookie policy content
│       ├── LegalLinks.tsx              # Footer legal links
│       ├── PrivacyPolicyContent.tsx    # Privacy policy content
│       └── TermsOfServiceContent.tsx   # Terms of service content
├── lib/
│   └── consent/
│       ├── index.ts                    # Consent module exports
│       ├── constants.ts                # Storage key, version
│       ├── context.tsx                 # React context & hooks
│       └── types.ts                    # TypeScript interfaces
└── app/
    ├── terms/page.tsx                  # /terms route
    ├── privacy/page.tsx                # /privacy route
    └── cookies/page.tsx                # /cookies route
```

## Environment Variables

| Variable                          | Description                                                          |
| --------------------------------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Your Google Analytics 4 Measurement ID (e.g., `G-XXXXXXXXXX`)        |
| `GOOGLE_SITE_ANALYTICS_ID`        | Alternative server-side GA ID (falls back if `NEXT_PUBLIC_` not set) |

## Consent Model

Consent is stored in `localStorage` with key `cookie_consent_v1`:

```typescript
interface ConsentState {
  necessary: boolean; // Always true, non-toggleable
  analytics: boolean; // User-controlled
  timestamp: number; // When consent was given
  version: string; // Consent schema version
}
```

## Public API

### Components

```typescript
import {
  // Consent UI
  CookieConsentBanner, // Bottom/top banner with accept/reject/manage
  CookiePreferencesModal, // Modal with granular toggles

  // Analytics
  AnalyticsProvider, // Wraps app, loads GA conditionally
  trackEvent, // Utility to emit custom GA events

  // Legal Content
  TermsOfServiceContent, // Terms page content
  PrivacyPolicyContent, // Privacy policy content
  CookiePolicyContent, // Cookie policy content
  LegalLinks, // Footer navigation links

  // Context
  ConsentProvider, // Context provider (wrap your app)
  useConsent, // Hook to access consent state/actions
} from '@/components/legal';
```

### Props

```typescript
// CookieConsentBanner
interface ConsentBannerProps {
  className?: string;
  position?: 'bottom' | 'top';
}

// LegalLinks
interface LegalLinksProps {
  className?: string;
  showCookiePreferences?: boolean; // Show "Cookie Preferences" button
  variant?: 'inline' | 'stacked'; // Layout direction
}

// AnalyticsProvider
interface AnalyticsProviderProps {
  children: React.ReactNode;
  googleAnalyticsId?: string; // Override env var
}
```

### useConsent Hook

```typescript
const {
  consent, // Current consent state or null
  isLoaded, // True when loaded from localStorage
  acceptAll, // Accept all cookies
  rejectNonEssential, // Reject non-essential cookies
  updateConsent, // Update single category
  savePreferences, // Save current preferences
  resetConsent, // Clear consent (re-shows banner)
  showBanner, // Banner visibility state
  setShowBanner, // Control banner visibility
  showPreferences, // Preferences modal visibility
  setShowPreferences, // Control modal visibility
} = useConsent();
```

## Integration Example

```tsx
// app/layout.tsx
import {
  AnalyticsProvider,
  CookieConsentBanner,
  CookiePreferencesModal,
  LegalLinks,
} from '@/components/legal';
import { ConsentProvider } from '@/lib/consent';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ConsentProvider>
          <AnalyticsProvider
            googleAnalyticsId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
          >
            {children}
            <footer>
              <LegalLinks />
            </footer>
            <CookieConsentBanner position="bottom" />
            <CookiePreferencesModal />
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
```

## Reusing in Another Project

1. **Copy files:**
   - `src/components/legal/` → Your project's components folder
   - `src/lib/consent/` → Your project's lib folder
   - `src/app/terms/`, `src/app/privacy/`, `src/app/cookies/` → Your app routes

2. **Copy styles from `globals.css`:**
   - Look for `/* Legal & Consent Management Styles */` section
   - Add to your global stylesheet
   - Customize using your CSS variables/theme

3. **Copy i18n keys:**
   - Copy `Consent` and `Legal` sections from `messages/en.json`
   - Translate as needed

4. **Set environment variable:**

   ```env
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

5. **Install dependencies (if not present):**
   - `react-i18next` / `i18next`
   - `@radix-ui/react-dialog` (for modal)
   - `next/script` (built-in Next.js)

## CSS Customization

All styles use semantic class names that reference global CSS variables:

```css
/* Example: customize banner colors */
.consent-banner {
  @apply bg-card border-border; /* Uses your theme */
}

.consent-actions__button--primary {
  @apply bg-primary text-primary-foreground;
}
```

No inline styles or hardcoded colors are used in components.

## i18n Keys Structure

```json
{
  "Consent": {
    "banner": { "title", "description", "learnMore" },
    "actions": { "accept", "reject", "manage" },
    "preferences": { "title", "description", "savePreferences" },
    "categories": {
      "necessary": { "title", "description" },
      "analytics": { "title", "description" }
    }
  },
  "Legal": {
    "links": { "terms", "privacy", "cookies", "cookiePreferences" },
    "terms": { "title", "sections": { ... } },
    "privacy": { "title", "sections": { ... } },
    "cookies": { "title", "sections": { ... } }
  }
}
```

## Accessibility

- Focus trap in consent banner and modal
- Keyboard navigation (Tab, Shift+Tab, Escape)
- ARIA labels on all interactive elements
- Role="dialog" and aria-modal on dialogs
- Screen reader announcements

## License

MIT
