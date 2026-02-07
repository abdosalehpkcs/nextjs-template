import type { Metadata } from 'next';

import { TermsOfServiceContent } from '@/components/legal/TermsOfServiceContent';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read our terms of service and conditions of use.',
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <TermsOfServiceContent />
    </main>
  );
}
