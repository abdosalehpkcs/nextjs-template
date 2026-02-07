import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    GOOGLE_SITE_VERIFICATION_ID: z.string().optional(),
    GOOGLE_SITE_ANALYTICS_ID: z.string().optional(),
    APP_URL: z.string().url().default('http://localhost:3000'),
    APP_NAME: z.string().default('Next.js Template'),
  },

  client: {},

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_SITE_VERIFICATION_ID: process.env.GOOGLE_SITE_VERIFICATION_ID,
    GOOGLE_SITE_ANALYTICS_ID: process.env.GOOGLE_SITE_ANALYTICS_ID,
    APP_URL: process.env.APP_URL,
    APP_NAME: process.env.APP_NAME,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
