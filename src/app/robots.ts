import type { MetadataRoute } from 'next';

import { env } from '@/env';

export default function robots(): MetadataRoute.Robots {
  if (env.NODE_ENV !== 'production') {
    return {
      rules: { userAgent: '*', disallow: '/' },
      sitemap: `${env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/private/'],
    },
    sitemap: `${env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
