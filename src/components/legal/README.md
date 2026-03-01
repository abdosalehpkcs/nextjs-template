# Legal & Consent Management Module

A reusable module for Terms, Privacy, Cookies pages and GDPR-compliant cookie consent.

## Features

- Cookie consent banner with accept/reject/manage options
- Granular preferences modal
- Legal pages (Terms of Service, Privacy Policy, Cookie Policy)
- Full i18n support (react-i18next)
- Styling driven by global CSS (no hardcoded colors)
- Accessible (ARIA labels, focus trap, keyboard navigation)
- Persistent consent storage in cookie + localStorage

## Module Structure

```
src/
├── components/
│   └── legal/
│       ├── index.ts
│       ├── CookiePolicyContent.tsx
│       ├── LegalLinks.tsx
│       ├── PrivacyPolicyContent.tsx
│       └── TermsOfServiceContent.tsx
└── modules/
    └── cookie-consent/
        ├── ConsentBanner.tsx
        ├── ConsentModal.tsx
        ├── ConsentProvider.tsx
        └── ...
```

## Public API

```typescript
import {
  ConsentBanner,
  ConsentModal,
  ConsentProvider,
  LegalLinks,
  TermsOfServiceContent,
  PrivacyPolicyContent,
  CookiePolicyContent,
} from '@/components/legal';
```

## Integration Example

```tsx
// app/layout.tsx
import { ConsentBanner, ConsentModal, LegalLinks } from '@/components/legal';
import { ConsentProvider } from '@/modules/cookie-consent';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ConsentProvider>
          {children}
          <footer>
            <LegalLinks />
          </footer>
          <ConsentBanner privacyPolicyUrl="/cookies" />
          <ConsentModal privacyPolicyUrl="/cookies" />
        </ConsentProvider>
      </body>
    </html>
  );
}
```

## Reusing in Another Project

1. Copy `src/components/legal/` and `src/modules/cookie-consent/`.
2. Copy the legal styles from `globals.css` (or add to your own global styles).
3. Copy `Consent` and `Legal` i18n keys from `messages/en.json`.

## Accessibility

- Focus trap in banner and modal
- Keyboard navigation (Tab, Shift+Tab, Escape)
- ARIA labels on all interactive elements
- Role="dialog" and aria-modal on dialogs

## License

MIT
