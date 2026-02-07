import type { Metadata } from 'next';

import { CookiePolicyContent } from '@/components/legal/CookiePolicyContent';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Learn about how we use cookies and how to manage your preferences.',
};

export default function CookiesPage() {
  return (
    <main className="legal-page">
      <CookiePolicyContent />
    </main>
  );
}
