import { env } from '@/env';

export const siteConfig = {
  title: 'Next.js Starter',
  description:
    'Kickstart your Next.js project with this starter template, featuring TypeScript, Tailwind CSS, ESLint, testing utilities, and more — built for speed and style.',
  keywords: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  url: env.NEXT_PUBLIC_APP_URL,
  googleSiteVerificationId: env.GOOGLE_SITE_VERIFICATION_ID || '',
};
