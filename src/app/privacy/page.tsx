import type { Metadata } from 'next';

import { PrivacyPolicyContent } from '@/components/legal/PrivacyPolicyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read our privacy policy to understand how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <PrivacyPolicyContent />
    </main>
  );
}
