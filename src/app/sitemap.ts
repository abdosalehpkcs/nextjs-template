import type { MetadataRoute } from 'next';

import { env } from '@/env';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.APP_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];
}
